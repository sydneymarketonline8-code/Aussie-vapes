/**
 * Targeted import: pushes ONE brand and its products from lib/brands.ts +
 * lib/products.ts into Supabase, leaving every other product untouched.
 *
 * Use this instead of `npm run seed:products` when adding a new range —
 * the full seed rewrites images/related edges for all ~2000 products and
 * would clobber edits made in the admin panel.
 *
 * Required env vars (read from .env.local):
 *   • NEXT_PUBLIC_SUPABASE_URL
 *   • SUPABASE_SERVICE_ROLE_KEY      (NOT the anon key — bypasses RLS)
 *
 * Run:
 *   npm run seed:brand -- tomoro
 */

import { config as loadEnv } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { getBrandBySlug, getProductsByBrand } from '../lib/brands'

loadEnv({ path: '.env.local', override: true })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const brandSlug = process.argv[2]

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const brand = brandSlug ? getBrandBySlug(brandSlug) : undefined
if (!brand) {
  console.error(`Usage: npm run seed:brand -- <brand-slug>   (unknown brand: "${brandSlug ?? ''}")`)
  process.exit(1)
}

const products = getProductsByBrand(brand.slug)
if (!products.length) {
  console.error(`No products in lib/products.ts resolve to brand "${brand.slug}".`)
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

async function main() {
  console.log(`Seeding brand "${brand!.displayName}" (${products.length} products) into ${SUPABASE_URL}\n`)

  const { data: dbBrand, error: brandError } = await supabase
    .from('brands')
    .upsert(
      {
        slug: brand!.slug,
        name: brand!.name,
        display_name: brand!.displayName,
        description: brand!.shortDescription,
        accent_color: brand!.accentColor ?? null,
        country: brand!.origin ?? null,
        seo_title: brand!.seoTitle ?? null,
        seo_description: brand!.seoDescription ?? null,
        is_featured: false,
      },
      { onConflict: 'slug' },
    )
    .select('id')
    .single()
  if (brandError || !dbBrand) throw new Error(`brand upsert failed: ${brandError?.message}`)
  console.log(`  ✓ brand`)

  const { data: cats } = await supabase.from('categories').select('id, slug')
  const catId = new Map((cats ?? []).map((c) => [c.slug as string, c.id as string]))
  const { data: subs } = await supabase.from('subcategories').select('id, slug, category_id')
  const subId = new Map((subs ?? []).map((s) => [`${s.category_id}|${s.slug}`, s.id as string]))

  const rows = products.map((p) => {
    const categoryId = catId.get(p.category) ?? null
    if (!categoryId) throw new Error(`category "${p.category}" not in db (product ${p.slug})`)
    return {
      slug: p.slug,
      name: p.name,
      sku: p.sku,
      brand_id: dbBrand.id,
      category_id: categoryId,
      subcategory_id: p.subcategory ? subId.get(`${categoryId}|${p.subcategory}`) ?? null : null,
      status: 'active' as const,
      price: p.price,
      compare_price: p.comparePrice ?? null,
      short_description: p.shortDescription,
      description: p.description,
      features: p.features ?? [],
      specifications: p.specifications ?? {},
      tags: p.tags ?? [],
      flavours: p.flavours ?? [],
      nicotine_strengths: p.nicotineStrengths ?? [],
      in_stock: p.inStock,
      stock_count: p.stockCount ?? null,
      rating: p.rating ?? 0,
      review_count: p.reviewCount ?? 0,
      is_new: !!p.isNew,
      is_best_seller: !!p.isBestSeller,
      is_sale: !!p.isSale,
      seo_title: p.seoTitle,
      seo_description: p.seoDescription,
    }
  })

  const { data: dbProducts, error: productError } = await supabase
    .from('products')
    .upsert(rows, { onConflict: 'slug' })
    .select('id, slug')
  if (productError || !dbProducts) throw new Error(`products upsert failed: ${productError?.message}`)
  const slugToId = new Map(dbProducts.map((p) => [p.slug as string, p.id as string]))
  const ids = Array.from(slugToId.values())
  console.log(`  ✓ ${dbProducts.length} products`)

  const { error: imgDelError } = await supabase.from('product_images').delete().in('product_id', ids)
  if (imgDelError) throw new Error(`product_images delete failed: ${imgDelError.message}`)
  const imageRows = products.flatMap((p) =>
    (p.images ?? []).map((url, i) => ({ product_id: slugToId.get(p.slug)!, url, position: i, alt: p.name })),
  )
  if (imageRows.length) {
    const { error } = await supabase.from('product_images').insert(imageRows)
    if (error) throw new Error(`product_images insert failed: ${error.message}`)
  }
  console.log(`  ✓ ${imageRows.length} images`)

  const { error: relDelError } = await supabase.from('product_related').delete().in('product_id', ids)
  if (relDelError) throw new Error(`product_related delete failed: ${relDelError.message}`)
  const edges = products.flatMap((p) =>
    (p.relatedProductSlugs ?? [])
      .map((slug, i) => ({ product_id: slugToId.get(p.slug)!, related_product_id: slugToId.get(slug), position: i }))
      .filter((e): e is { product_id: string; related_product_id: string; position: number } => !!e.related_product_id),
  )
  if (edges.length) {
    const { error } = await supabase.from('product_related').upsert(edges, { onConflict: 'product_id,related_product_id' })
    if (error) throw new Error(`product_related upsert failed: ${error.message}`)
  }
  console.log(`  ✓ ${edges.length} related-product edges\n\nDone.`)
}

main().catch((err) => {
  console.error('\nSeed failed:', err)
  process.exit(1)
})
