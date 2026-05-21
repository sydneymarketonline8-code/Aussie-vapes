/**
 * One-shot bulk import: pushes lib/brands.ts, lib/categories.ts, and
 * lib/products.ts into the live Supabase database. Idempotent — upserts on
 * slug/code so re-running just updates existing rows.
 *
 * Required env vars (read from .env.local):
 *   • NEXT_PUBLIC_SUPABASE_URL
 *   • SUPABASE_SERVICE_ROLE_KEY      (NOT the anon key — bypasses RLS)
 *
 * Run:
 *   npm run seed:products
 */

import 'dotenv/config'
import { config as loadEnv } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { BRANDS } from '../lib/brands'
import { CATEGORIES } from '../lib/categories'
import { PRODUCTS } from '../lib/products'

// .env.local takes precedence over .env
loadEnv({ path: '.env.local', override: true })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    'Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local',
  )
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const BATCH = 200

function chunks<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

function titleCase(s: string): string {
  return s
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

async function seedBrands() {
  console.log(`Brands: upserting ${BRANDS.length}…`)
  const rows = BRANDS.map((b) => ({
    slug: b.slug,
    name: b.name,
    display_name: b.displayName,
    description: b.shortDescription,
    accent_color: b.accentColor ?? null,
    country: b.origin ?? null,
    seo_title: b.seoTitle ?? null,
    seo_description: b.seoDescription ?? null,
    is_featured: false,
  }))

  const { error } = await supabase.from('brands').upsert(rows, { onConflict: 'slug' })
  if (error) throw new Error(`brands upsert failed: ${error.message}`)

  // Map slug → id AND (lowercase) display_name → id, since products reference
  // brand by display name not slug.
  const { data: dbBrands } = await supabase.from('brands').select('id, slug, name, display_name')
  const slugToId = new Map<string, string>()
  const nameToId = new Map<string, string>()
  for (const b of dbBrands ?? []) {
    slugToId.set(b.slug, b.id)
    nameToId.set(b.display_name.toLowerCase(), b.id)
    nameToId.set(b.name.toLowerCase(), b.id)
  }
  console.log(`  ✓ ${dbBrands?.length ?? 0} brands in db`)
  return { slugToId, nameToId }
}

async function seedCategories() {
  console.log(`Categories: upserting ${CATEGORIES.length}…`)
  const rows = CATEGORIES.map((c, i) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    long_description: c.longDescription,
    intro: c.intro ?? null,
    image_url: c.image,
    seo_title: c.seoTitle,
    seo_description: c.seoDescription,
    keywords: c.keywords ?? [],
    highlights: c.highlights ?? [],
    position: i,
  }))

  const { error } = await supabase.from('categories').upsert(rows, { onConflict: 'slug' })
  if (error) throw new Error(`categories upsert failed: ${error.message}`)

  const { data: dbCats } = await supabase.from('categories').select('id, slug')
  const map = new Map<string, string>()
  for (const c of dbCats ?? []) map.set(c.slug, c.id)
  console.log(`  ✓ ${dbCats?.length ?? 0} categories in db`)
  return map
}

async function seedSubcategories(categorySlugToId: Map<string, string>) {
  // Build a (category_slug, sub_slug) → name map from both CATEGORIES and
  // PRODUCTS (products may reference subcategories that aren't in
  // categories.ts). Auto-name unknown subs from their slug.
  const pairs = new Map<string, { categorySlug: string; subSlug: string; name: string }>()

  for (const c of CATEGORIES) {
    for (const sub of c.subcategories ?? []) {
      const key = `${c.slug}|${sub.slug}`
      pairs.set(key, { categorySlug: c.slug, subSlug: sub.slug, name: sub.name })
    }
  }
  for (const p of PRODUCTS) {
    if (!p.subcategory) continue
    const key = `${p.category}|${p.subcategory}`
    if (!pairs.has(key)) {
      pairs.set(key, {
        categorySlug: p.category,
        subSlug: p.subcategory,
        name: titleCase(p.subcategory),
      })
    }
  }

  console.log(`Subcategories: upserting ${pairs.size}…`)
  const rows = Array.from(pairs.values())
    .map((s, i) => ({
      category_id: categorySlugToId.get(s.categorySlug),
      slug: s.subSlug,
      name: s.name,
      position: i,
    }))
    .filter((r): r is { category_id: string; slug: string; name: string; position: number } => !!r.category_id)

  const { error } = await supabase
    .from('subcategories')
    .upsert(rows, { onConflict: 'category_id,slug' })
  if (error) throw new Error(`subcategories upsert failed: ${error.message}`)

  const { data: dbSubs } = await supabase
    .from('subcategories')
    .select('id, slug, category_id')
  const map = new Map<string, string>() // `${category_id}|${sub_slug}` → id
  for (const s of dbSubs ?? []) map.set(`${s.category_id}|${s.slug}`, s.id)
  console.log(`  ✓ ${dbSubs?.length ?? 0} subcategories in db`)
  return map
}

async function seedProducts(
  brandNameToId: Map<string, string>,
  categorySlugToId: Map<string, string>,
  subKeyToId: Map<string, string>,
) {
  console.log(`Products: upserting ${PRODUCTS.length} in batches of ${BATCH}…`)

  const productRows = PRODUCTS.map((p) => {
    const categoryId = categorySlugToId.get(p.category) ?? null
    const subKey = categoryId && p.subcategory ? `${categoryId}|${p.subcategory}` : null
    const subcategoryId = subKey ? subKeyToId.get(subKey) ?? null : null
    const brandId = brandNameToId.get((p.brand ?? '').toLowerCase()) ?? null

    return {
      slug: p.slug,
      name: p.name,
      sku: p.sku,
      brand_id: brandId,
      category_id: categoryId,
      subcategory_id: subcategoryId,
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

  let done = 0
  for (const batch of chunks(productRows, BATCH)) {
    const { error } = await supabase.from('products').upsert(batch, { onConflict: 'slug' })
    if (error) throw new Error(`products upsert failed at row ${done}: ${error.message}`)
    done += batch.length
    process.stdout.write(`\r  upserted ${done}/${productRows.length}`)
  }
  process.stdout.write('\n')

  const { data: dbProducts } = await supabase.from('products').select('id, slug')
  const slugToId = new Map<string, string>()
  for (const p of dbProducts ?? []) slugToId.set(p.slug, p.id)
  console.log(`  ✓ ${dbProducts?.length ?? 0} products in db`)
  return slugToId
}

async function seedProductImages(slugToId: Map<string, string>) {
  // Replace all product_images for the products we just imported. The
  // batched delete + insert keeps it idempotent without an awkward unique
  // constraint on (product_id, url).
  const productIds = Array.from(slugToId.values())
  console.log(`Product images: replacing for ${productIds.length} products…`)

  for (const batchIds of chunks(productIds, 500)) {
    const { error: delError } = await supabase
      .from('product_images')
      .delete()
      .in('product_id', batchIds)
    if (delError) throw new Error(`product_images delete failed: ${delError.message}`)
  }

  const imageRows: { product_id: string; url: string; position: number; alt: string }[] = []
  for (const p of PRODUCTS) {
    const productId = slugToId.get(p.slug)
    if (!productId) continue
    const urls = p.images ?? []
    urls.forEach((url, i) => {
      imageRows.push({ product_id: productId, url, position: i, alt: p.name })
    })
  }

  let done = 0
  for (const batch of chunks(imageRows, BATCH)) {
    const { error } = await supabase.from('product_images').insert(batch)
    if (error) throw new Error(`product_images insert failed at row ${done}: ${error.message}`)
    done += batch.length
    process.stdout.write(`\r  inserted ${done}/${imageRows.length}`)
  }
  process.stdout.write('\n')
  console.log(`  ✓ ${imageRows.length} images inserted`)
}

async function seedProductRelated(slugToId: Map<string, string>) {
  console.log(`Related products: building edges…`)
  // Wipe all existing edges for the products we own, then re-insert.
  const productIds = Array.from(slugToId.values())
  for (const batchIds of chunks(productIds, 500)) {
    const { error } = await supabase
      .from('product_related')
      .delete()
      .in('product_id', batchIds)
    if (error) throw new Error(`product_related delete failed: ${error.message}`)
  }

  const edges: { product_id: string; related_product_id: string; position: number }[] = []
  for (const p of PRODUCTS) {
    const fromId = slugToId.get(p.slug)
    if (!fromId) continue
    (p.relatedProductSlugs ?? []).forEach((slug, i) => {
      const toId = slugToId.get(slug)
      if (toId && toId !== fromId) {
        edges.push({ product_id: fromId, related_product_id: toId, position: i })
      }
    })
  }

  let done = 0
  for (const batch of chunks(edges, BATCH)) {
    const { error } = await supabase
      .from('product_related')
      .upsert(batch, { onConflict: 'product_id,related_product_id' })
    if (error) throw new Error(`product_related upsert failed at row ${done}: ${error.message}`)
    done += batch.length
    process.stdout.write(`\r  inserted ${done}/${edges.length}`)
  }
  process.stdout.write('\n')
  console.log(`  ✓ ${edges.length} related-product edges`)
}

async function main() {
  console.log(`Seeding ${SUPABASE_URL}\n`)
  const t0 = Date.now()

  const { nameToId: brandNameToId } = await seedBrands()
  const categorySlugToId = await seedCategories()
  const subKeyToId = await seedSubcategories(categorySlugToId)
  const productSlugToId = await seedProducts(brandNameToId, categorySlugToId, subKeyToId)
  await seedProductImages(productSlugToId)
  await seedProductRelated(productSlugToId)

  const seconds = ((Date.now() - t0) / 1000).toFixed(1)
  console.log(`\nDone in ${seconds}s`)
}

main().catch((err) => {
  console.error('\nSeed failed:', err)
  process.exit(1)
})
