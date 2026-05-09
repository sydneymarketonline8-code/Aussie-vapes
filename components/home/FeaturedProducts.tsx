import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { getFeaturedProducts, getNewArrivals, getSaleProducts } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'

interface FeaturedProductsProps {
  title: string
  subtitle?: string
  products: ReturnType<typeof getFeaturedProducts>
  viewAllHref?: string
  viewAllLabel?: string
}

function ProductSection({ title, subtitle, products, viewAllHref, viewAllLabel }: FeaturedProductsProps) {
  if (!products.length) return null
  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="section-heading">{title}</h2>
          {subtitle && <p className="section-subheading">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="hidden sm:flex items-center gap-1.5 text-sm text-brand hover:text-brand-light transition-colors font-medium"
          >
            {viewAllLabel ?? 'View all'} <ArrowRightIcon className="h-4 w-4" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="sm:hidden mt-4 flex items-center justify-center gap-1.5 text-sm text-brand hover:text-brand-light transition-colors font-medium"
        >
          {viewAllLabel ?? 'View all'} <ArrowRightIcon className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

export default function FeaturedProducts() {
  const bestsellers = getFeaturedProducts()
  const newArrivals = getNewArrivals()
  const saleProducts = getSaleProducts()

  return (
    <div className="py-14 space-y-16">
      <div className="container-site space-y-16">
        <ProductSection
          title="Best Sellers"
          subtitle="The vapes Australians keep coming back to."
          products={bestsellers}
          viewAllHref="/category/disposable-vapes"
          viewAllLabel="View all best sellers"
        />
        {newArrivals.length > 0 && (
          <ProductSection
            title="New Arrivals"
            subtitle="Fresh drops — be the first to try them."
            products={newArrivals}
            viewAllHref="/new-arrivals"
          />
        )}
        {saleProducts.length > 0 && (
          <ProductSection
            title="On Sale"
            subtitle="Limited-time deals on top Australian vaping products."
            products={saleProducts}
            viewAllHref="/sale"
            viewAllLabel="View all sale products"
          />
        )}
      </div>
    </div>
  )
}
