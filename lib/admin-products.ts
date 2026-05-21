import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { AdminProductRow } from './admin-products-types'

export * from './admin-products-types'

interface SbRow {
  id: string
  slug: string
  name: string
  sku: string
  price: number
  status: 'draft' | 'active' | 'archived'
  in_stock: boolean
  stock_count: number | null
  rating: number
  review_count: number
  brand: { display_name: string } | { display_name: string }[] | null
  category: { slug: string } | { slug: string }[] | null
  product_images: { url: string; position: number }[] | null
}

function pickOne<T>(v: T | T[] | null | undefined): T | null {
  if (!v) return null
  return Array.isArray(v) ? v[0] ?? null : v
}

function mapRow(row: SbRow): AdminProductRow {
  const brand = pickOne(row.brand)
  const category = pickOne(row.category)
  const primaryImage = (row.product_images ?? [])
    .slice()
    .sort((a, b) => a.position - b.position)[0]?.url ?? null

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    sku: row.sku,
    price: Number(row.price),
    brand: brand?.display_name ?? '',
    category: category?.slug ?? '',
    status: row.status,
    inStock: row.in_stock,
    stockCount: row.stock_count,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    imageUrl: primaryImage,
  }
}

const SELECT = `
  id, slug, name, sku, price, status, in_stock, stock_count, rating, review_count,
  brand:brand_id ( display_name ),
  category:category_id ( slug ),
  product_images ( url, position )
`

export interface InventoryStats {
  totalSkus: number
  inStock: number
  outOfStock: number
  lowStock: number
  totalUnits: number
  totalValue: number
}

export async function getInventoryStats(products: AdminProductRow[]): Promise<InventoryStats> {
  let inStock = 0, outOfStock = 0, lowStock = 0, totalUnits = 0, totalValue = 0
  for (const p of products) {
    if (p.inStock) inStock++
    else outOfStock++
    if (p.stockCount != null && p.stockCount < 20) lowStock++
    if (p.stockCount != null) {
      totalUnits += p.stockCount
      totalValue += p.price * p.stockCount
    }
  }
  return {
    totalSkus: products.length,
    inStock,
    outOfStock,
    lowStock,
    totalUnits,
    totalValue,
  }
}

export async function listAdminProducts(): Promise<AdminProductRow[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('products')
    .select(SELECT)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(3000)

  if (error) {
    console.error('[listAdminProducts] query failed', error)
    return []
  }
  return ((data ?? []) as unknown as SbRow[]).map(mapRow)
}
