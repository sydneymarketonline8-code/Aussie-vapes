/**
 * Server-side product reads from Supabase, shaped to match the existing
 * `Product` type from `@/types` so consumer components don't need to change.
 *
 * Use these from server components / generateStaticParams / generateMetadata.
 * For client components, fetch on the server side and pass results as props.
 */

import { getSupabasePublicClient } from '@/lib/supabase/public'
import type { Product } from '@/types'

interface ProductRow {
  id: string
  slug: string
  name: string
  sku: string
  price: number
  compare_price: number | null
  short_description: string | null
  description: string | null
  features: string[] | null
  specifications: Record<string, string> | null
  tags: string[] | null
  flavours: string[] | null
  nicotine_strengths: string[] | null
  in_stock: boolean
  stock_count: number | null
  rating: number
  review_count: number
  is_new: boolean
  is_best_seller: boolean
  is_sale: boolean
  seo_title: string | null
  seo_description: string | null
  brand: { display_name: string } | { display_name: string }[] | null
  category: { slug: string } | { slug: string }[] | null
  subcategory: { slug: string } | { slug: string }[] | null
  product_images: { url: string; position: number }[] | null
}

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

function pickOne<T>(v: T | T[] | null | undefined): T | null {
  if (!v) return null
  return Array.isArray(v) ? v[0] ?? null : v
}

function rowToProduct(row: ProductRow, relatedSlugs: string[] = []): Product {
  const brand = pickOne(row.brand)
  const category = pickOne(row.category)
  const subcategory = pickOne(row.subcategory)
  const images = (row.product_images ?? [])
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((i) => i.url)

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: brand?.display_name ?? '',
    sku: row.sku,
    price: Number(row.price),
    comparePrice: row.compare_price != null ? Number(row.compare_price) : undefined,
    images: images.length ? images : ['/products/placeholder.webp'],
    category: category?.slug ?? '',
    subcategory: subcategory?.slug,
    tags: row.tags ?? [],
    description: row.description ?? '',
    shortDescription: row.short_description ?? '',
    features: row.features ?? [],
    specifications: row.specifications ?? {},
    inStock: row.in_stock,
    stockCount: row.stock_count ?? undefined,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    isNew: row.is_new || undefined,
    isBestSeller: row.is_best_seller || undefined,
    isSale: row.is_sale || undefined,
    relatedProductSlugs: relatedSlugs,
    seoTitle: row.seo_title ?? row.name,
    seoDescription: row.seo_description ?? row.short_description ?? '',
    flavours: row.flavours?.length ? row.flavours : undefined,
    nicotineStrengths: row.nicotine_strengths?.length ? row.nicotine_strengths : undefined,
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabasePublicClient()
  const { data, error } = await supabase
    .from('products')
    .select(SELECT_COLUMNS)
    .eq('slug', slug)
    .eq('status', 'active')
    .is('deleted_at', null)
    .maybeSingle()

  if (error) {
    console.error('[getProductBySlug] query failed', error)
    return null
  }
  if (!data) return null

  // Fetch related slugs in a second query (avoids the recursive join complexity).
  const { data: rels } = await supabase
    .from('product_related')
    .select('related_product_id, position, related:related_product_id ( slug )')
    .eq('product_id', (data as unknown as ProductRow).id)
    .order('position', { ascending: true })

  const relatedSlugs = ((rels as unknown as Array<{ related: { slug: string } | { slug: string }[] | null }> | null) ?? [])
    .map((r) => pickOne(r.related)?.slug)
    .filter((s): s is string => !!s)

  return rowToProduct(data as unknown as ProductRow, relatedSlugs)
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  if (!slugs.length) return []
  const supabase = getSupabasePublicClient()
  const { data, error } = await supabase
    .from('products')
    .select(SELECT_COLUMNS)
    .in('slug', slugs)
    .eq('status', 'active')
    .is('deleted_at', null)

  if (error) {
    console.error('[getProductsBySlugs] query failed', error)
    return []
  }

  // Preserve the order the caller passed in.
  const bySlug = new Map<string, Product>()
  for (const row of (data ?? []) as unknown as ProductRow[]) {
    bySlug.set(row.slug, rowToProduct(row))
  }
  return slugs.map((s) => bySlug.get(s)).filter((p): p is Product => !!p)
}

export async function getAllActiveProductSlugs(): Promise<string[]> {
  const supabase = getSupabasePublicClient()
  const { data, error } = await supabase
    .from('products')
    .select('slug')
    .eq('status', 'active')
    .is('deleted_at', null)

  if (error) {
    console.error('[getAllActiveProductSlugs] query failed', error)
    return []
  }
  return (data ?? []).map((p) => p.slug)
}
