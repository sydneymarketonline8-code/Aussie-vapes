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

function buildIndex(): Map<string, string> {
  // basename-without-extension (lowercase) → actual filename on disk
  const files = readdirSync(PRODUCTS_DIR)
  const idx = new Map<string, string>()
  for (const f of files) {
    const stem = basename(f, extname(f)).toLowerCase()
    if (!idx.has(stem)) idx.set(stem, f)
  }
  return idx
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
  const onDisk = buildIndex()
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
      fixes.push({ id: row.id, from: row.url, to: `/products/${onDiskName}` })
      extensionFixed++
    } else {
      stillBroken.push(row.url)
      stillMissing++
    }
  }

  // ─── Step 2: backfill image rows for products that have none
  const productsWithImage = new Set(imageRows.map((r) => r.product_id))
  const productsWithoutImage = products.filter((p) => !productsWithImage.has(p.id))

  const inserts: { product_id: string; url: string; position: number }[] = []
  let backfilled = 0
  let noFileForProduct = 0
  for (const p of productsWithoutImage) {
    const onDiskName = onDisk.get(p.slug.toLowerCase())
    if (onDiskName) {
      inserts.push({ product_id: p.id, url: `/products/${onDiskName}`, position: 0 })
      backfilled++
    } else {
      noFileForProduct++
    }
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

  if (stillBroken.length || noFileForProduct) {
    console.log()
    console.log(`Still missing imagery (placeholder will render for these):`)
    console.log(`  ${stillBroken.length} existing rows point at files not on disk`)
    console.log(`  ${noFileForProduct} products have no image row and no slug-matched file`)
    if (stillBroken.length) {
      console.log()
      console.log('First 10 broken-row URLs:')
      for (const url of stillBroken.slice(0, 10)) console.log(`  ${url}`)
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
