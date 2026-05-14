import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductGrid from '@/components/product/ProductGrid'
import { getNewArrivals, PRODUCTS } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Aussie Vapes New Arrivals — Latest Disposables & Pod Systems',
  description:
    "The newest products at Aussie Vapes. Fresh disposable vapes, pod systems and e-liquids landing weekly in our Sydney warehouse. Same-day AU dispatch.",
  keywords: [
    'aussie vapes new arrivals',
    'new vapes australia',
    'latest disposable vapes australia',
    'aussie vapes new products',
    'newest vapes australia',
  ],
  alternates: { canonical: '/new-arrivals' },
}

export default function NewArrivalsPage() {
  // Treat isNew + first 40 products as "new arrivals" — fall back to top 40 if not enough flagged
  let products = getNewArrivals()
  if (products.length < 20) {
    products = PRODUCTS.slice(0, 40)
  }

  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Aussie Vapes', href: '/' }, { label: 'New Arrivals' }]} />
          <p className="font-display text-xs uppercase tracking-[0.3em] text-success font-bold mt-4 mb-2">
            Just Landed At Aussie Vapes
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-1 mb-3 lowercase">
            aussie vapes new arrivals
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">
            New disposable vapes, pod systems and e-liquids land in the Aussie Vapes warehouse every week. Be first to
            try the latest IGET, Alfakher, HQD, Lost Mary and Vozol releases — fresh stock, same-day Sydney dispatch.
          </p>
        </div>
      </section>

      <section className="container-site py-14">
        <div className="section-heading-wrap">
          <h2 className="section-heading">{products.length.toLocaleString()} new products</h2>
          <span className="font-display text-xs uppercase tracking-widest font-bold text-success">
            Refreshed weekly
          </span>
        </div>
        <ProductGrid products={products} />
      </section>
    </>
  )
}
