export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  sku: string
  price: number
  comparePrice?: number
  images: string[]
  category: string
  subcategory?: string
  tags: string[]
  description: string
  shortDescription: string
  features: string[]
  specifications: Record<string, string>
  inStock: boolean
  stockCount?: number
  rating: number
  reviewCount: number
  isNew?: boolean
  isBestSeller?: boolean
  isSale?: boolean
  relatedProductSlugs: string[]
  seoTitle: string
  seoDescription: string
  flavours?: string[]
  nicotineStrengths?: string[]
}

export interface CategoryFaq {
  question: string
  answer: string
}

export interface CategoryBuyerGuide {
  title: string
  body: string
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  longDescription: string
  intro?: string
  subcategories: Subcategory[]
  productCount: number
  image: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
  faqs?: CategoryFaq[]
  buyerGuide?: CategoryBuyerGuide[]
  highlights?: string[]
}

export interface Subcategory {
  id: string
  slug: string
  name: string
  parentSlug: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedFlavour?: string
  selectedNicotine?: string
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}

export interface Review {
  id: string
  author: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
}

export interface FilterState {
  priceMin: number
  priceMax: number
  brands: string[]
  inStockOnly: boolean
  tags: string[]
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'
