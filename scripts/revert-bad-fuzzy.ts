/**
 * Reverses fuzzy-matched product_images that paired a product with the
 * wrong file. Triggered by the report of gunnpod-blackberry-ice using a
 * blueberry-ice file.
 *
 * Heuristic: an image URL is "wrong" if the file's basename (lowercase,
 * tokenised) and the product slug differ on a "flavour" or "colour"
 * token. We strip puff-count and pack-size tokens before comparison so
 * those don't trigger false positives.
 *
 * Removes wrong rows so the storefront falls back to the placeholder
 * icon (which is honest) instead of a misleading image.
 */

import 'dotenv/config'
import { config as loadEnv } from 'dotenv'
import { basename, extname } from 'path'
import { createClient } from '@supabase/supabase-js'

loadEnv({ path: '.env.local', override: true })
const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
)

// Tokens that REALLY identify a product (flavour, colour, format, brand
// variants). If product slug has X but matched file doesn't (or vice
// versa), the match is suspect.
const DISCRIMINATING_TOKENS = new Set([
  // colours / berries / fruit
  'blackberry', 'blueberry', 'cherry', 'strawberry', 'raspberry', 'cranberry',
  'mango', 'pineapple', 'peach', 'apple', 'grape', 'banana', 'kiwi',
  'watermelon', 'melon', 'orange', 'lemon', 'lime', 'passionfruit',
  'guava', 'lychee', 'coconut', 'pomegranate', 'apricot',
  'mint', 'menthol', 'ice', 'icy',
  'tobacco', 'vanilla', 'caramel', 'chocolate', 'coffee',
  'pink', 'purple', 'red', 'blue', 'green', 'black', 'white', 'gold', 'silver',
  // formats
  'disposable', 'rechargeable', 'pod', 'kit', 'coil', 'tank', 'mod',
])

const NOISE_TOKENS = new Set([
  'australia', 'iget', 'puffs', 'pack', 'puff', 'aussie', 'vape', 'vapes',
])

function tokens(s: string): string[] {
  return s.toLowerCase().split(/[-_]+/g)
    .filter((t) => t.length >= 3 && !/^\d+$/.test(t) && !NOISE_TOKENS.has(t))
}

interface Row {
  id: string
  product_id: string
  url: string
}

async function main() {
  console.log('Fetching all product_images + their product slug…')

  // pageful by id ordering
  const imgs: Row[] = []
  const slugs = new Map<string, string>()
  let from = 0
  while (true) {
    const { data, error } = await s
      .from('product_images')
      .select('id, url, product_id, products!inner(slug)')
      .order('id')
      .range(from, from + 999)
    if (error) throw error
    if (!data?.length) break
    for (const r of data as any[]) {
      imgs.push({ id: r.id, product_id: r.product_id, url: r.url })
      slugs.set(r.product_id, r.products.slug)
    }
    if (data.length < 1000) break
    from += 1000
  }
  console.log(`  ${imgs.length} image rows\n`)

  // Identify wrong matches
  const wrong: { id: string; slug: string; url: string; productToks: string[]; fileToks: string[] }[] = []
  for (const img of imgs) {
    if (!img.url.includes('/products/')) continue
    const filename = img.url.split('/products/')[1]
    const stem = basename(filename, extname(filename))
    const slug = slugs.get(img.product_id) ?? ''
    if (stem.toLowerCase() === slug.toLowerCase()) continue  // exact match — fine

    const prodToks = new Set(tokens(slug).filter((t) => DISCRIMINATING_TOKENS.has(t)))
    const fileToks = new Set(tokens(stem).filter((t) => DISCRIMINATING_TOKENS.has(t)))

    // If the product has discriminating tokens that the file lacks → wrong
    const missing = Array.from(prodToks).filter((t) => !fileToks.has(t))
    const extra = Array.from(fileToks).filter((t) => !prodToks.has(t))
    if (missing.length > 0 || extra.length > 0) {
      wrong.push({
        id: img.id,
        slug,
        url: img.url,
        productToks: Array.from(prodToks),
        fileToks: Array.from(fileToks),
      })
    }
  }

  console.log(`Found ${wrong.length} image rows where flavour/colour/format tokens disagree`)
  if (wrong.length === 0) return

  console.log('\nFirst 15 examples:')
  for (const w of wrong.slice(0, 15)) {
    console.log(`  product: ${w.slug}`)
    console.log(`    url:    ${w.url.split('/').pop()}`)
    console.log(`    diff:   product=[${w.productToks.join(',')}] file=[${w.fileToks.join(',')}]`)
  }

  console.log(`\nDeleting ${wrong.length} mismatched image rows…`)
  let done = 0
  for (let i = 0; i < wrong.length; i += 200) {
    const batch = wrong.slice(i, i + 200).map((w) => w.id)
    const { error } = await s.from('product_images').delete().in('id', batch)
    if (error) throw error
    done += batch.length
    process.stdout.write(`\r  deleted ${done}/${wrong.length}`)
  }
  process.stdout.write('\n')
  console.log('Done. Affected products will now render the placeholder icon (honest signal).')
}

main().catch((err) => { console.error(err); process.exit(1) })
