import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import type { Product } from '@/types'

interface ProductSectionProps {
  title: string
  products: Product[]
  viewAllHref?: string
  bg?: 'white' | 'soft'
}

function ProductSection({ title, products, viewAllHref, bg = 'white' }: ProductSectionProps) {
  if (!products.length) return null
  return (
    <section className={bg === 'soft' ? 'bg-soft-100 py-14' : 'bg-white py-14'}>
      <div className="container-site">
        <div className="section-heading-wrap">
          <h2 className="section-heading">{title}</h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="font-display text-xs uppercase tracking-widest font-bold text-mute hover:text-price transition-colors"
            >
              View All →
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FeaturedProductsProps {
  bestsellers: Product[]
  newArrivals: Product[]
  saleProducts: Product[]
}

export default function FeaturedProducts({ bestsellers, newArrivals, saleProducts }: FeaturedProductsProps) {
  return (
    <>
      <ProductSection
        title="best sellers"
        products={bestsellers}
        viewAllHref="/category/disposable-vapes"
        bg="white"
      />
      {newArrivals.length > 0 && (
        <ProductSection
          title="new arrivals"
          products={newArrivals}
          viewAllHref="/new-arrivals"
          bg="soft"
        />
      )}
      {saleProducts.length > 0 && (
        <ProductSection
          title="on sale"
          products={saleProducts}
          viewAllHref="/sale"
          bg="white"
        />
      )}
    </>
  )
}
