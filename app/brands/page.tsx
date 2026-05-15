import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import HeroCollage from '@/components/ui/HeroCollage'
import { BRANDS, getProductsByBrand } from '@/lib/brands'
import { getFeaturedProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Aussie Vapes Brands — Shop By Brand In Australia | Aussie Vapes',
  description:
    'Browse every vape brand stocked at Aussie Vapes — Australia\'s #1 online vape store. IGET, Alfakher, HQD, Gunnpod, Lost Mary, Vozol, RELX and 35+ more. Authentic AU stock with same-day Sydney shipping.',
  keywords: [
    'aussie vapes brands',
    'aussie vapes shop by brand',
    'aussie vape brands',
    'vape brands australia',
    'best vape brands australia',
    'iget aussie vapes',
    'hqd aussie vapes',
    'alfakher aussie vapes',
    'gunnpod aussie vapes',
  ],
  alternates: { canonical: '/brands' },
  openGraph: {
    title: 'Aussie Vapes Brands — Shop By Brand In Australia | Aussie Vapes',
    description:
      'Browse every vape brand stocked at Aussie Vapes. Authentic AU stock with same-day Sydney shipping.',
  },
}

export default function BrandsIndexPage() {
  const withCounts = BRANDS.map((b) => ({ ...b, count: getProductsByBrand(b.slug).length }))
    .sort((a, b) => b.count - a.count)
  const featured = getFeaturedProducts().slice(0, 5)

  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Brands' }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-4">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-2">
                {BRANDS.length}+ Vape Brands At Aussie Vapes
              </p>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-1 mb-3 lowercase">aussie vapes — shop by brand</h1>
              <p className="text-body leading-relaxed">
                <strong>Aussie Vapes</strong> is Australia&apos;s largest authorised stockist of the world&apos;s leading vape brands.
                Browse every brand carried at Aussie Vapes — IGET, Alfakher, HQD, Gunnpod, Lost Mary, Vozol and 35+ more —
                all authentic, all in stock, all dispatched same-day from Sydney.
              </p>
            </div>
            <div className="w-full">
              <HeroCollage products={featured} accentColor="#ff0000" />
            </div>
          </div>
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
            Every brand sold at Aussie Vapes is sourced through authorised Australian distribution channels. We verify
            every batch, scan every authenticity code, and stand behind every product with a 30-day return guarantee.
            If you receive a counterfeit, damaged or non-working device, we replace it free of charge.
          </p>
        </div>
      </section>
    </>
  )
}
