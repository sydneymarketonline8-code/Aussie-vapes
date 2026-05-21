export interface AdminProductRow {
  id: string
  slug: string
  name: string
  sku: string
  price: number
  brand: string
  category: string
  status: 'draft' | 'active' | 'archived'
  inStock: boolean
  stockCount: number | null
  rating: number
  reviewCount: number
  imageUrl: string | null
}
