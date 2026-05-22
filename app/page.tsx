import type { Metadata } from 'next'
import HeroBanner, { type HeroSlide } from '@/components/home/HeroBanner'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import TrustBadges from '@/components/home/TrustBadges'
import StarOfTheWeek from '@/components/home/StarOfTheWeek'
import BrandShowcase from '@/components/home/BrandShowcase'
import FeaturedBrandSections from '@/components/home/FeaturedBrandSections'
import PacksSection from '@/components/home/PacksSection'
import Testimonials from '@/components/home/Testimonials'
import {
  getFeaturedProducts as getDbFeatured,
  getNewArrivalProducts as getDbNewArrivals,
  getSaleProducts as getDbSale,
  getProductsByBrandSlug,
} from '@/lib/storefront-products'
import { buildSiteMetadata, localBusinessJsonLd } from '@/lib/seo'
import type { Product } from '@/types'

export const metadata: Metadata = {
  ...buildSiteMetadata(),
  title: "Aussie Vapes — Australia's #1 Online Vape Store | Disposables, Pods, E-Liquid",
  description:
    "Aussie Vapes is Australia's #1 online vape store. Shop authentic disposable vapes, pod systems, nicotine salts and e-liquids from IGET, Alfakher, HQD, Gunnpod, Lost Mary and 35+ brands. Same-day Sydney dispatch, free shipping over $300.",
  alternates: { canonical: '/' },
}

function pickHeroProducts(candidates: Product[], count = 5): Product[] {
  // Prefer products with an image, then a brand match
  return candidates.filter((p) => p.images?.[0]).slice(0, count)
}

export default async function HomePage() {
  const [bestsellers, newArrivals, saleProducts, igetProducts, alfakherProducts, lostMaryProducts] = await Promise.all([
    getDbFeatured(10),
    getDbNewArrivals(10),
    getDbSale(10),
    getProductsByBrandSlug('iget'),
    getProductsByBrandSlug('alfakher'),
    getProductsByBrandSlug('lost-mary'),
  ])

  const slides: HeroSlide[] = [
    {
      eyebrow: 'Featured Disposable',
      heading: 'IGET Bar Plus 6000',
      subheading:
        'Premium 6,000-puff rechargeable disposable. Mesh coil flavour, 20mg salt nic, fast Australia-wide shipping from Aussie Vapes.',
      cta: { label: 'Shop IGET', href: '/brand/iget' },
      ctaSecondary: { label: 'All Disposables', href: '/category/disposable-vapes' },
      badge: 'From $32.95',
      bg: 'linear-gradient(135deg, #fef3f3 0%, #ffffff 60%)',
      accent: '#ff0000',
      products: pickHeroProducts(igetProducts.length ? igetProducts : bestsellers),
    },
    {
      eyebrow: 'Best Seller',
      heading: 'Alfakher Crown Bar 15,000',
      subheading:
        'The ultimate big-puff disposable. Adjustable airflow, mega capacity, 15+ flavour options always in stock at Aussie Vapes.',
      cta: { label: 'Shop Alfakher', href: '/brand/alfakher' },
      ctaSecondary: { label: 'See Pack Deals', href: '/packs/bundle-deals' },
      badge: 'Save 20% on 3-Packs',
      bg: 'linear-gradient(135deg, #f4f8ff 0%, #ffffff 60%)',
      accent: '#2fb5d2',
      products: pickHeroProducts(alfakherProducts.length ? alfakherProducts : bestsellers),
    },
    {
      eyebrow: 'New Arrival',
      heading: 'Lost Mary — Just Landed',
      subheading:
        'Sleek pocket-friendly design with USB-C charging. Fresh fruit & menthol profiles, exclusive to Aussie Vapes.',
      cta: { label: 'Discover Lost Mary', href: '/brand/lost-mary' },
      ctaSecondary: { label: 'All New Arrivals', href: '/new-arrivals' },
      badge: 'Just Landed',
      bg: 'linear-gradient(135deg, #f5fbf3 0%, #ffffff 60%)',
      accent: '#4cbb6c',
      products: pickHeroProducts(
        lostMaryProducts.length
          ? lostMaryProducts
          : newArrivals.length
          ? newArrivals
          : bestsellers,
      ),
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <HeroBanner slides={slides} />
      <TrustBadges />
      <CategoryGrid />
      <PacksSection />
      <StarOfTheWeek star={bestsellers[0] ?? null} />
      <FeaturedBrandSections />
      <FeaturedProducts
        bestsellers={bestsellers}
        newArrivals={newArrivals}
        saleProducts={saleProducts}
      />

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
              Why do Australians choose Aussie Vapes? Free shipping on orders over $300, express options to every state and territory, real Australian customer support Mon–Fri 9am–5pm AEST, and the deepest in-stock selection of any AU vape retailer. Same-day Sydney dispatch on weekday orders before 2pm AEST.
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
