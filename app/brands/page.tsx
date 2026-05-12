import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { BRANDS, getProductsByBrand } from '@/lib/brands'

export const metadata: Metadata = {
  title: 'Vape Brands Australia — Shop By Brand | AussieVapes',
  description:
    'Browse every vape brand stocked at AussieVapes. IGET, Alfakher, HQD, Gunnpod, Lost Mary, Vozol, RELX and more — authentic AU stock with same-day Sydney shipping.',
  alternates: { canonical: '/brands' },
  openGraph: {
    title: 'Vape Brands Australia — Shop By Brand | AussieVapes',
    description:
      'Browse every vape brand stocked at AussieVapes. Authentic AU stock with same-day Sydney shipping.',
  },
}

export default function BrandsIndexPage() {
  const withCounts = BRANDS.map((b) => ({ ...b, count: getProductsByBrand(b.slug).length }))
    .sort((a, b) => b.count - a.count)

  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Brands' }]} />
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-4 mb-3 lowercase">shop by brand</h1>
          <p className="text-body max-w-2xl leading-relaxed">
            AussieVapes is the largest authorised stockist of the world&apos;s leading disposable vape brands in
            Australia. Browse every brand we carry — all authentic, all in stock, all dispatched same-day from Sydney.
          </p>
        </div>
      </section>

      <section className="container-site py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {withCounts.map((b) => (
            <Link
              key={b.slug}
              href={`/brand/${b.slug}`}
              className="group bg-white border border-line rounded-sm p-6 hover:shadow-md hover:border-ink transition-all flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-display text-2xl font-bold uppercase tracking-wide"
                  style={{ color: b.accentColor }}
                >
                  {b.displayName}
                </span>
                <span className="font-display text-xs uppercase tracking-wider text-mute font-bold">
                  {b.count} products
                </span>
              </div>
              <p className="font-display text-sm font-semibold text-body mb-3" style={{ color: b.accentColor }}>
                {b.tagline}
              </p>
              <p className="text-body text-sm leading-relaxed flex-1 line-clamp-3">{b.shortDescription}</p>
              <div className="mt-4 pt-3 border-t border-line font-display text-xs uppercase tracking-widest font-bold text-ink group-hover:text-price transition-colors">
                Shop {b.displayName} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-soft-100 border-t border-line py-12">
        <div className="container-site max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">australia&apos;s most trusted vape brand stockist</h2>
          <p className="text-body text-sm leading-relaxed">
            Every brand sold at AussieVapes is sourced through authorised Australian distribution channels. We verify
            every batch, scan every authenticity code, and stand behind every product with a 30-day return guarantee.
            If you receive a counterfeit, damaged or non-working device, we replace it free of charge.
          </p>
        </div>
      </section>
    </>
  )
}
