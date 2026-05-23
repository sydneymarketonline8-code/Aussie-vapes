/**
 * Reports image-coverage per category. Use this to see whether a specific
 * category (e-liquids / pod-systems / nicotine-salts etc.) is missing more
 * images than the global average.
 */

import 'dotenv/config'
import { config as loadEnv } from 'dotenv'
import { readdirSync } from 'fs'
import { basename, extname, join } from 'path'
import { createClient } from '@supabase/supabase-js'

loadEnv({ path: '.env.local', override: true })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const PRODUCTS_DIR = join(process.cwd(), 'public', 'products')

async function main() {
  const onDiskFiles = new Set(readdirSync(PRODUCTS_DIR))

  // Fetch products with their category + first image url
  const products: { id: string; slug: string; category_slug: string | null; url: string | null }[] = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from('products')
      .select('id, slug, category:category_id(slug), product_images(url, position)')
      .order('id')
      .range(from, from + 999)
    if (error) throw error
    if (!data?.length) break
    for (const r of data as any[]) {
      const cat = Array.isArray(r.category) ? r.category[0] : r.category
      const imgs = (r.product_images ?? []) as { url: string; position: number }[]
      imgs.sort((a, b) => a.position - b.position)
      products.push({
        id: r.id,
        slug: r.slug,
        category_slug: cat?.slug ?? null,
        url: imgs[0]?.url ?? null,
      })
    }
    if (data.length < 1000) break
    from += 1000
  }

  // Bucket by category
  const buckets = new Map<string, { total: number; withUrl: number; urlExists: number; missingSlugs: string[] }>()
  for (const p of products) {
    const cat = p.category_slug ?? '(uncategorised)'
    const b = buckets.get(cat) ?? { total: 0, withUrl: 0, urlExists: 0, missingSlugs: [] }
    b.total++
    if (p.url) b.withUrl++
    // Local URL? Check disk
    let exists = false
    if (p.url) {
      if (p.url.startsWith('/products/')) {
        exists = onDiskFiles.has(p.url.slice('/products/'.length))
      } else if (/^https?:/.test(p.url)) {
        // We treat external URLs as "probably renders" — can't verify here
        exists = true
      }
    }
    if (exists) b.urlExists++
    else b.missingSlugs.push(p.slug)
    buckets.set(cat, b)
  }

  console.log('Coverage by category:\n')
  console.log('category'.padEnd(30) + 'total'.padStart(8) + 'withUrl'.padStart(10) + 'urlExists'.padStart(12) + 'missing'.padStart(10))
  console.log('-'.repeat(70))
  for (const [cat, b] of Array.from(buckets).sort((a, b) => b[1].total - a[1].total)) {
    const pct = b.total > 0 ? Math.round((b.urlExists / b.total) * 100) : 0
    console.log(
      cat.padEnd(30) +
      String(b.total).padStart(8) +
      String(b.withUrl).padStart(10) +
      `${b.urlExists} (${pct}%)`.padStart(12) +
      String(b.missingSlugs.length).padStart(10),
    )
  }

  for (const target of ['e-liquids', 'nicotine-salts', 'pod-systems']) {
    const b = buckets.get(target)
    if (!b || !b.missingSlugs.length) continue
    console.log()
    console.log(`Missing in ${target} (${b.missingSlugs.length} products):`)
    for (const s of b.missingSlugs.slice(0, 25)) console.log(`  ${s}`)
    if (b.missingSlugs.length > 25) console.log(`  …and ${b.missingSlugs.length - 25} more`)
  }
}

main().catch((err) => { console.error(err); process.exit(1) })
