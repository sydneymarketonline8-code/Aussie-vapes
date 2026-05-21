import Link from 'next/link'
import { getProductsBySlugs } from '@/lib/storefront-products'
import ProductCard from './ProductCard'

interface RelatedProductsProps {
  slugs: string[]
  currentSlug: string
}

export default async function RelatedProducts({ slugs, currentSlug }: RelatedProductsProps) {
  const products = (await getProductsBySlugs(slugs)).filter((p) => p.slug !== currentSlug).slice(0, 5)
  if (!products.length) return null

  return (
    <section className="mt-16 pt-12 border-t border-line">
      <div className="section-heading-wrap">
        <h2 className="section-heading">you may also like</h2>
        <Link href="/category/disposable-vapes" className="font-display text-xs uppercase tracking-widest font-bold text-mute hover:text-price">
          Browse All →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
