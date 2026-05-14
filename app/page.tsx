import type { Metadata } from 'next'
import HeroBanner from '@/components/home/HeroBanner'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import TrustBadges from '@/components/home/TrustBadges'
import StarOfTheWeek from '@/components/home/StarOfTheWeek'
import BrandShowcase from '@/components/home/BrandShowcase'
import Testimonials from '@/components/home/Testimonials'
import { buildSiteMetadata, localBusinessJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  ...buildSiteMetadata(),
  title: "Aussie Vapes — Australia's #1 Online Vape Store | Disposables, Pods, E-Liquid",
  description:
    "Aussie Vapes is Australia's #1 online vape store. Shop authentic disposable vapes, pod systems, nicotine salts and e-liquids from IGET, Alfakher, HQD, Gunnpod, Lost Mary and 35+ brands. Same-day Sydney dispatch, free shipping over $100.",
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <HeroBanner />
      <TrustBadges />
      <CategoryGrid />
      <StarOfTheWeek />
      <FeaturedProducts />
      <BrandShowcase />
      <Testimonials />

      {/* SEO content block — Aussie Vapes topical authority */}
      <section className="py-14 bg-soft-100 border-t border-line">
        <div className="container-site max-w-3xl">
          {/* SEO H1 for the home page — sits below the styled hero */}
          <h1 className="font-display text-3xl font-bold text-ink mb-4 lowercase">
            aussie vapes — australia&apos;s #1 online vape store
          </h1>
          <div className="space-y-4 text-body text-sm leading-relaxed">
            <p>
              <strong>Aussie Vapes</strong> is the largest online vape store in Australia, stocking 2,000+ authentic products
              across 40+ leading brands. Whether you&apos;re after the latest{' '}
              <a href="/category/disposable-vapes" className="text-price font-semibold hover:underline">disposable vapes</a>,{' '}
              a refillable{' '}
              <a href="/category/pod-systems" className="text-price font-semibold hover:underline">pod system</a>,{' '}
              premium{' '}
              <a href="/category/nicotine-salts" className="text-price font-semibold hover:underline">nicotine salts</a>{' '}
              or cloud-friendly{' '}
              <a href="/category/e-liquids" className="text-price font-semibold hover:underline">freebase e-liquids</a>, Aussie Vapes has the deepest in-stock range on the Australian market — all dispatched same-day from our Sydney warehouse.
            </p>
            <p>
              The Aussie Vapes catalogue covers every major brand Australian vapers actually buy:{' '}
              <a href="/brand/iget" className="text-price font-semibold hover:underline">IGET</a>,{' '}
              <a href="/brand/alfakher" className="text-price font-semibold hover:underline">Alfakher Crown Bar</a>,{' '}
              <a href="/brand/hqd" className="text-price font-semibold hover:underline">HQD</a>,{' '}
              <a href="/brand/gunnpod" className="text-price font-semibold hover:underline">Gunnpod</a>,{' '}
              <a href="/brand/lost-mary" className="text-price font-semibold hover:underline">Lost Mary</a>,{' '}
              <a href="/brand/vozol" className="text-price font-semibold hover:underline">Vozol</a>,{' '}
              <a href="/brand/relx" className="text-price font-semibold hover:underline">RELX</a>,{' '}
              <a href="/brand/elux" className="text-price font-semibold hover:underline">Elux</a>{' '}
              and dozens more. Every device is age-verified at purchase, sourced through authorised AU channels, and backed by a 30-day return policy.
            </p>
            <p>
              Why do Australians choose Aussie Vapes? Free shipping on orders over $100, express options to every state and territory, real Australian customer support Mon–Fri 9am–5pm AEST, and the deepest in-stock selection of any AU vape retailer. Same-day Sydney dispatch on weekday orders before 2pm AEST.
            </p>
            <p>
              Browse the full{' '}
              <a href="/brands" className="text-price font-semibold hover:underline">Aussie Vapes brand directory</a>{' '}
              to shop by manufacturer, or jump straight into our category pages above. New arrivals land every week — bookmark Aussie Vapes to stay across the latest drops.
            </p>
          </div>

          {/* Topic clusters / internal links — strengthens semantic relevance */}
          <div className="mt-8 pt-8 border-t border-line">
            <h2 className="font-display text-base font-bold text-ink mb-3 uppercase tracking-wider">
              Popular Aussie Vapes searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Aussie vapes online', href: '/category/disposable-vapes' },
                { label: 'Aussie vape store', href: '/brands' },
                { label: 'Aussie disposable vapes', href: '/category/disposable-vapes' },
                { label: 'Aussie pod systems', href: '/category/pod-systems' },
                { label: 'Aussie vapes Sydney', href: '/category/disposable-vapes' },
                { label: 'Cheap Aussie vapes', href: '/sale' },
                { label: 'IGET Aussie Vapes', href: '/brand/iget' },
                { label: 'HQD Aussie Vapes', href: '/brand/hqd' },
                { label: 'Alfakher Aussie Vapes', href: '/brand/alfakher' },
                { label: 'Aussie vapes free shipping', href: '/' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="px-3 py-1.5 text-xs bg-white text-body rounded-sm border border-line hover:border-ink hover:bg-ink hover:text-white transition-colors font-display"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
