import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { getRelatedProducts } from '@/lib/products'
import ProductCard from './ProductCard'

interface RelatedProductsProps {
  slugs: string[]
  currentSlug: string
}

export default function RelatedProducts({ slugs, currentSlug }: RelatedProductsProps) {
  const products = getRelatedProducts(slugs).filter((p) => p.slug !== currentSlug).slice(0, 4)
  if (!products.length) return null

  return (
    <section className="mt-16 pt-12 border-t border-surface-600">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="section-heading">You May Also Like</h2>
          <p className="section-subheading">Customers who viewed this also loved these.</p>
        </div>
        <Link
          href="/category/disposable-vapes"
          className="hidden sm:flex items-center gap-1.5 text-sm text-brand hover:text-brand-light transition-colors font-medium"
        >
          Browse all <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
