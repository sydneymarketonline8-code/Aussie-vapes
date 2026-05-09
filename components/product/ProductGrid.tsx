import type { Product } from '@/types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  emptyMessage?: string
}

export default function ProductGrid({ products, emptyMessage = 'No products found.' }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-2xl mb-2">🔍</p>
        <p className="text-zinc-400 font-medium">{emptyMessage}</p>
        <p className="text-zinc-600 text-sm mt-1">Try adjusting your filters or search query.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
