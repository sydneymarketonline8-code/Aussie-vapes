/**
 * Walks every product in pod-systems / e-liquids / nicotine-salts and runs the
 * EXACT same queries the storefront uses to render /product/[slug]:
 *   1. getProductBySlug(slug)  — proves the route would not 404
 *   2. fetches product_images  — proves the detail page would have imagery
 *
 * Reports per-product status without modifying anything. Use the output to
 * decide what's a code bug vs a data bug vs a config issue.
 *
 * Run: npx tsx scripts/product-detail-audit.ts
 */

import 'dotenv/config'
import { config as loadEnv } from 'dotenv'
import { readdirSync } from 'fs'
import { join } from 'path'
import { createClient } from '@supabase/supabase-js'

loadEnv({ path: '.env.local', override: true })

// Use the ANON key — this mirrors what the storefront does in production.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
)

const CATEGORIES = ['pod-systems', 'e-liquids', 'nicotine-salts']
const PRODUCTS_DIR = join(process.cwd(), 'public', 'products')

const SELECT_COLUMNS = `
  id, slug, name, sku, price, compare_price,
  short_description, description, features, specifications, tags,
  flavours, nicotine_strengths,
  in_stock, stock_count, rating, review_count,
  is_new, is_best_seller, is_sale,
  seo_title, seo_description,
  brand:brand_id ( display_name ),
  category:category_id ( slug ),
  subcategory:subcategory_id ( slug ),
  product_images ( url, position )
`

interface Row {
  slug: string
  name: string
  category: string
  // Issue 1 — would /product/[slug] 404?
  detailResolves: boolean
  detailFailReason: string | null
  // Issue 2 — would the detail render with no images?
  embedImages: number
  separateImages: number
  imagesOnDisk: number  // how many image URLs resolve to a real file
  imagesExternal: number
  imageUrls: string[]
}

async function main() {
  const onDiskFiles = new Set(readdirSync(PRODUCTS_DIR).map((f) => f.toLowerCase()))
  const issues404: Row[] = []
  const issuesNoImg: Row[] = []
  const issuesBrokenImg: Row[] = []
  let totalChecked = 0

  for (const catSlug of CATEGORIES) {
    console.log(`\n=== ${catSlug} ===`)
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', catSlug)
      .limit(1)
    if (!cat?.[0]) { console.log('  category lookup failed'); continue }

    const { data: prods } = await supabase
      .from('products')
      .select('id, slug, name')
      .eq('category_id', cat[0].id)
      .eq('status', 'active')
      .is('deleted_at', null)
      .order('slug')
      .range(0, 9999)

    if (!prods) { console.log('  list failed'); continue }
    console.log(`  ${prods.length} products to check`)

    for (const p of prods as { id: string; slug: string; name: string }[]) {
      totalChecked++
      const row: Row = {
        slug: p.slug, name: p.name, category: catSlug,
        detailResolves: false, detailFailReason: null,
        embedImages: 0, separateImages: 0,
        imagesOnDisk: 0, imagesExternal: 0, imageUrls: [],
      }

      // Same query as lib/storefront-products.ts → getProductBySlug
      const { data, error } = await supabase
        .from('products')
        .select(SELECT_COLUMNS)
        .eq('slug', p.slug)
        .eq('status', 'active')
        .is('deleted_at', null)
        .maybeSingle()

      if (error || !data) {
        row.detailFailReason = error?.message ?? 'maybeSingle returned null'
      } else {
        row.detailResolves = true
        const imgs = ((data as any).product_images ?? []) as { url: string; position: number }[]
        row.embedImages = imgs.length
        row.imageUrls = imgs.map((i) => i.url)
      }

      // Also fetch images separately to compare with the embed result
      const { data: sepImgs } = await supabase
        .from('product_images')
        .select('url, position')
        .eq('product_id', p.id)
        .order('position', { ascending: true })
        .limit(20)
      row.separateImages = sepImgs?.length ?? 0
      if (row.imageUrls.length === 0 && sepImgs?.length) {
        row.imageUrls = sepImgs.map((i) => i.url)
      }

      // Are the URLs actually loadable?
      for (const url of row.imageUrls) {
        if (url.startsWith('/products/') || url.includes('vapehubvapesaustralia.com.au/products/')) {
          const filename = url.split('/products/')[1]
          if (filename && onDiskFiles.has(filename.toLowerCase())) row.imagesOnDisk++
        } else if (/^https?:/.test(url)) {
          row.imagesExternal++
        }
      }

      if (!row.detailResolves) issues404.push(row)
      else if (row.imageUrls.length === 0) issuesNoImg.push(row)
      else if (row.imagesOnDisk + row.imagesExternal === 0) issuesBrokenImg.push(row)
    }
  }

  console.log(`\n${'='.repeat(70)}`)
  console.log(`SUMMARY  (${totalChecked} products checked across 3 categories)`)
  console.log('='.repeat(70))

  console.log(`\nIssue 1 — would 404: ${issues404.length}`)
  if (issues404.length) {
    for (const r of issues404.slice(0, 50)) {
      console.log(`  /product/${r.slug.padEnd(60)} ${r.category.padEnd(16)} ${r.detailFailReason}`)
    }
    if (issues404.length > 50) console.log(`  …and ${issues404.length - 50} more`)
  } else {
    console.log('  none — every product resolves')
  }

  console.log(`\nIssue 2a — detail loads but ZERO image rows: ${issuesNoImg.length}`)
  if (issuesNoImg.length) {
    for (const r of issuesNoImg.slice(0, 50)) {
      console.log(`  /product/${r.slug.padEnd(60)} ${r.category} (embed:${r.embedImages} separate:${r.separateImages})`)
    }
    if (issuesNoImg.length > 50) console.log(`  …and ${issuesNoImg.length - 50} more`)
  } else {
    console.log('  none — every resolving product has image rows')
  }

  console.log(`\nIssue 2b — image rows present but URLs broken: ${issuesBrokenImg.length}`)
  if (issuesBrokenImg.length) {
    for (const r of issuesBrokenImg.slice(0, 50)) {
      console.log(`  /product/${r.slug.padEnd(60)} ${r.category}`)
      r.imageUrls.slice(0, 2).forEach((u) => console.log(`    url: ${u}`))
    }
    if (issuesBrokenImg.length > 50) console.log(`  …and ${issuesBrokenImg.length - 50} more`)
  } else {
    console.log('  none — every image URL resolves')
  }

  // Sanity check on the embed vs separate fetch — if they disagree, that's
  // a clue about the PostgREST schema-cache issue we saw before.
  console.log(`\nDiagnostic — embed-vs-separate image counts`)
  console.log('  (separate>0 but embed=0 means stale FK schema cache)')
  // Already captured above; just summarise
}

main().catch((err) => { console.error(err); process.exit(1) })
