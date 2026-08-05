/**
 * One-off cleanup for product imagery:
 *   1. For every existing product_images row, verify the URL points at a
 *      real file in public/products/. If only the file extension differs
 *      (e.g. DB says .webp, disk has .jpg) swap the extension.
 *   2. For every product with NO image row, look for a file in
 *      public/products/ whose basename matches the product slug. If found,
 *      insert a new product_images row pointing at it.
 *
 * Idempotent. Run any time after bulk imports.
 *
 * Run: npm run fix:images
 * Requires: SUPABASE_SERVICE_ROLE_KEY in .env.local (bypasses RLS).
 */

import 'dotenv/config'
import { config as loadEnv } from 'dotenv'
import { readdirSync } from 'fs'
import { basename, extname, join } from 'path'
import { createClient } from '@supabase/supabase-js'

loadEnv({ path: '.env.local', override: true })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const PRODUCTS_DIR = join(process.cwd(), 'public', 'products')

function buildIndex(): {
  exact: Map<string, string>
  partial: Map<string, string[]>
} {
  // exact: basename-without-extension (lowercase) → actual filename on disk
  // partial: word prefix bucket → all filenames containing that prefix.
  //   Used by fuzzy match to find files that share most of the same words.
  const files = readdirSync(PRODUCTS_DIR)
  const exact = new Map<string, string>()
  const partial = new Map<string, string[]>()
  for (const f of files) {
    const stem = basename(f, extname(f)).toLowerCase()
    if (!exact.has(stem)) exact.set(stem, f)

    // Bucket by every 3+ char token in the basename
    for (const token of stem.split(/[-_]/g)) {
      if (token.length < 3) continue
      const list = partial.get(token) ?? []
      list.push(f)
      partial.set(token, list)
    }
  }
  return { exact, partial }
}

// Tokens that genuinely distinguish one product from another. If the target
// slug contains any of these and the candidate file doesn't (or vice versa),
// the two products are different even though they share many other tokens.
// (Previously the matcher would happily pair blackberry → blueberry images.)
const DISCRIMINATING_TOKENS = new Set([
  'blackberry', 'blueberry', 'cherry', 'strawberry', 'raspberry', 'cranberry',
  'mango', 'pineapple', 'peach', 'apple', 'grape', 'banana', 'kiwi',
  'watermelon', 'melon', 'orange', 'lemon', 'lime', 'passionfruit',
  'guava', 'lychee', 'coconut', 'pomegranate', 'apricot',
  'mint', 'menthol', 'ice', 'icy', 'cola', 'aloe', 'vera',
  'tobacco', 'vanilla', 'caramel', 'chocolate', 'coffee',
  'pink', 'purple', 'red', 'blue', 'green', 'black', 'white', 'gold', 'silver',
  'disposable', 'rechargeable', 'pod', 'kit', 'coil', 'tank', 'mod',
])

/**
 * Try a sequence of slug transformations and partial matches to find a
 * file on disk that probably represents the same product as `target`.
 * Returns the actual filename (with extension) or null if nothing close.
 */
function fuzzyMatch(target: string, idx: ReturnType<typeof buildIndex>): string | null {
  const stem = basename(target, extname(target)).toLowerCase()

  // 1. Try a battery of known-good suffix strips
  const stripPatterns = [
    /-iget-australia$/,
    /-iget$/,
    /-australia$/,
    /-\d+-?pack$/,         // -3-pack, -5-pack, -10pack
    /-pack-\d+-items?$/,   // -pack-10-items
    /-pack$/,
    /-no-battery-base$/,
    /-pod-only.*$/,
    /-base$/,
    /-bundle$/,
  ]
  for (const re of stripPatterns) {
    const stripped = stem.replace(re, '')
    if (stripped !== stem) {
      const hit = idx.exact.get(stripped)
      if (hit && tokensCompatible(stripped, basename(hit, extname(hit)).toLowerCase())) {
        return hit
      }
    }
  }

  // 2. Best-effort partial match: pick the file that shares the most tokens
  const targetTokens = new Set(stem.split(/[-_]/g).filter((t) => t.length >= 3))
  if (targetTokens.size === 0) return null

  const seen = new Map<string, number>() // filename → overlap count
  Array.from(targetTokens).forEach((tok) => {
    const candidates = idx.partial.get(tok)
    if (!candidates) return
    for (const f of candidates) {
      seen.set(f, (seen.get(f) ?? 0) + 1)
    }
  })

  // Pick the highest-overlap file. Two-stage filter:
  //   • at least 70% of the target's tokens must match (raised from 60%)
  //   • discriminating tokens (flavour/colour/format) must match
  let bestFile: string | null = null
  let bestScore = 0
  const minScore = Math.max(2, Math.ceil(targetTokens.size * 0.7))
  Array.from(seen).forEach(([file, score]) => {
    if (score <= bestScore) return
    const fileStem = basename(file, extname(file)).toLowerCase()
    if (!tokensCompatible(stem, fileStem)) return
    bestScore = score
    bestFile = file
  })
  if (bestFile && bestScore >= minScore) return bestFile
  return null
}

/**
 * Two filename stems are "compatible" if their discriminating-token sets
 * (flavour, colour, format) are equal. Prevents pairing visually similar
 * but semantically distinct products like blackberry vs blueberry.
 */
function tokensCompatible(a: string, b: string): boolean {
  const aSet = new Set(a.split(/[-_]+/g).filter((t) => DISCRIMINATING_TOKENS.has(t)))
  const bSet = new Set(b.split(/[-_]+/g).filter((t) => DISCRIMINATING_TOKENS.has(t)))
  if (aSet.size !== bSet.size) return false
  for (const t of Array.from(aSet)) if (!bSet.has(t)) return false
  return true
}

async function pagedSelect<T>(
  table: string,
  cols: string,
  pageSize = 1000,
): Promise<T[]> {
  const rows: T[] = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select(cols)
      .order('id')
      .range(from, from + pageSize - 1)
    if (error) throw new Error(`${table} fetch failed at ${from}: ${error.message}`)
    if (!data?.length) break
    rows.push(...(data as T[]))
    if (data.length < pageSize) break
    from += pageSize
  }
  return rows
}

interface ImageRow {
  id: string
  url: string
  product_id: string
}
interface ProductRow {
  id: string
  slug: string
}

async function main() {
  console.log(`Scanning ${PRODUCTS_DIR}`)
  const idx = buildIndex()
  const onDisk = idx.exact
  console.log(`  ${onDisk.size} unique image basenames available\n`)

  console.log('Fetching all product_images rows…')
  const imageRows = await pagedSelect<ImageRow>('product_images', 'id, url, product_id')
  console.log(`  ${imageRows.length} image rows in db`)

  console.log('Fetching all products…')
  const products = await pagedSelect<ProductRow>('products', 'id, slug')
  console.log(`  ${products.length} products in db\n`)

  // ─── Step 1: fix existing rows whose URL points at a non-existent file
  let alreadyOK = 0
  let extensionFixed = 0
  let stillMissing = 0
  const fixes: { id: string; from: string; to: string }[] = []
  const stillBroken: string[] = []

  for (const row of imageRows) {
    if (!row.url.startsWith('/products/')) {
      alreadyOK++
      continue
    }
    const filename = row.url.slice('/products/'.length)
    const stem = basename(filename, extname(filename)).toLowerCase()
    if (filename === onDisk.get(stem)) {
      alreadyOK++
      continue
    }
    const onDiskName = onDisk.get(stem)
    if (onDiskName) {
      fixes.push({ id: row.id, from: row.url, to: `https://www.vapehubvapesaustralia.com.au/products/${onDiskName}` })
      extensionFixed++
      continue
    }
    // Fuzzy fallback — try suffix strips + token overlap
    const fuzzy = fuzzyMatch(filename, idx)
    if (fuzzy) {
      fixes.push({ id: row.id, from: row.url, to: `https://www.vapehubvapesaustralia.com.au/products/${fuzzy}` })
      extensionFixed++
      continue
    }
    stillBroken.push(row.url)
    stillMissing++
  }

  // ─── Step 2: backfill image rows for products that have none
  const productsWithImage = new Set(imageRows.map((r) => r.product_id))
  const productsWithoutImage = products.filter((p) => !productsWithImage.has(p.id))

  const inserts: { product_id: string; url: string; position: number }[] = []
  const stillNoProduct: string[] = []
  let backfilled = 0
  let noFileForProduct = 0
  for (const p of productsWithoutImage) {
    const onDiskName = onDisk.get(p.slug.toLowerCase())
    if (onDiskName) {
      inserts.push({ product_id: p.id, url: `https://www.vapehubvapesaustralia.com.au/products/${onDiskName}`, position: 0 })
      backfilled++
      continue
    }
    const fuzzy = fuzzyMatch(p.slug, idx)
    if (fuzzy) {
      inserts.push({ product_id: p.id, url: `https://www.vapehubvapesaustralia.com.au/products/${fuzzy}`, position: 0 })
      backfilled++
      continue
    }
    stillNoProduct.push(p.slug)
    noFileForProduct++
  }

  console.log('Existing image rows:')
  console.log(`  ✓ already pointing at a real file:   ${alreadyOK}`)
  console.log(`  ⟳ extension fix queued:               ${extensionFixed}`)
  console.log(`  ✗ no matching file on disk:           ${stillMissing}`)
  console.log()
  console.log('Products with no image row:')
  console.log(`  ⟳ backfill row from slug-matched file: ${backfilled}`)
  console.log(`  ✗ no file matches the product slug:    ${noFileForProduct}`)
  console.log()

  // Apply extension fixes
  if (fixes.length) {
    console.log(`Updating ${fixes.length} image URLs…`)
    let done = 0
    for (let i = 0; i < fixes.length; i += 200) {
      const batch = fixes.slice(i, i + 200)
      await Promise.all(
        batch.map((f) => supabase.from('product_images').update({ url: f.to }).eq('id', f.id)),
      )
      done += batch.length
      process.stdout.write(`\r  updated ${done}/${fixes.length}`)
    }
    process.stdout.write('\n')
  }

  // Insert backfilled rows
  if (inserts.length) {
    console.log(`Inserting ${inserts.length} new product_images rows…`)
    let done = 0
    for (let i = 0; i < inserts.length; i += 200) {
      const batch = inserts.slice(i, i + 200)
      const { error } = await supabase.from('product_images').insert(batch)
      if (error) throw new Error(`insert failed at ${i}: ${error.message}`)
      done += batch.length
      process.stdout.write(`\r  inserted ${done}/${inserts.length}`)
    }
    process.stdout.write('\n')
  }

  if (stillBroken.length || stillNoProduct.length) {
    console.log()
    console.log('Still missing imagery (placeholder will render for these):')
    console.log(`  ${stillBroken.length} existing rows point at files not on disk`)
    console.log(`  ${stillNoProduct.length} products have no image row and nothing close on disk`)
    if (stillNoProduct.length) {
      console.log()
      console.log('Product slugs without imagery (drop a file named <slug>.jpg in public/products/ then re-run):')
      for (const s of stillNoProduct.slice(0, 30)) console.log(`  ${s}`)
      if (stillNoProduct.length > 30) console.log(`  …and ${stillNoProduct.length - 30} more`)
    }
  } else {
    console.log()
    console.log('Every product now has an image row pointing at a real file. 🎉')
  }
}

main().catch((err) => {
  console.error('\nfix-product-images failed:', err)
  process.exit(1)
})
