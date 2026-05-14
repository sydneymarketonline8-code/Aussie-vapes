import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductGrid from '@/components/product/ProductGrid'
import { getSaleProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Aussie Vapes Sale — Discounted Disposables & Pod Systems',
  description:
    "Save big on authentic Australian vapes. Aussie Vapes Sale features discounted disposables, pod systems, nicotine salts and e-liquids — same-day Sydney dispatch.",
  keywords: [
    'aussie vapes sale',
    'cheap aussie vapes',
    'discount vapes australia',
    'vape sale australia',
    'aussie vapes discount',
    'vape clearance australia',
  ],
  alternates: { canonical: '/sale' },
}

export default function SalePage() {
  const products = getSaleProducts()

  return (
    <>
      <section className="bg-price text-white border-b border-line">
        <div className="container-site py-12 text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] font-bold mb-2 text-white/80">
            Limited Time Offers
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold leading-[1.05] mb-3 uppercase">
            Aussie Vapes Sale
          </h1>
          <p className="max-w-2xl mx-auto text-white/90 leading-relaxed">
            {products.length.toLocaleString()} products currently discounted at Aussie Vapes — IGET, Alfakher, HQD,
            Gunnpod and more at the lowest prices in Australia. Same-day Sydney dispatch on every order.
          </p>
        </div>
      </section>

      <div className="container-site py-4">
        <Breadcrumb crumbs={[{ label: 'Aussie Vapes', href: '/' }, { label: 'Sale' }]} />
      </div>

      <section className="container-site pb-14">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-xl font-bold text-ink uppercase tracking-wider mb-3">
              No Aussie Vapes sale items right now
            </p>
            <p className="text-mute mb-6">Check back soon — Aussie Vapes runs flash sales weekly.</p>
            <Link href="/category/disposable-vapes" className="btn-primary">
              Browse All Disposables
            </Link>
          </div>
        ) : (
          <>
            <div className="section-heading-wrap">
              <h2 className="section-heading">{products.length.toLocaleString()} items on sale</h2>
              <span className="font-display text-xs uppercase tracking-widest font-bold text-mute">
                Updated daily
              </span>
            </div>
            <ProductGrid products={products} />
          </>
        )}
      </section>

      <section className="bg-soft-100 border-t border-line py-12">
        <div className="container-site max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">
            why aussie vapes sale prices beat the competition
          </h2>
          <p className="text-body text-sm leading-relaxed">
            Aussie Vapes buys direct from authorised distributors in bulk, which means we pass deep discounts to
            customers. Every sale item is the same authentic product as the full-price version — never grey-market,
            never expired stock. Same 30-day return guarantee, same same-day Sydney dispatch.
          </p>
        </div>
      </section>
    </>
  )
}
