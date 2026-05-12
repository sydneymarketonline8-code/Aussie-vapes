import type { Metadata } from 'next'
import HeroBanner from '@/components/home/HeroBanner'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import TrustBadges from '@/components/home/TrustBadges'
import StarOfTheWeek from '@/components/home/StarOfTheWeek'
import BrandShowcase from '@/components/home/BrandShowcase'
import Testimonials from '@/components/home/Testimonials'
import { buildSiteMetadata } from '@/lib/seo'

export const metadata: Metadata = buildSiteMetadata()

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrustBadges />
      <CategoryGrid />
      <StarOfTheWeek />
      <FeaturedProducts />
      <BrandShowcase />
      <Testimonials />

      {/* SEO content block */}
      <section className="py-14 bg-soft-100 border-t border-line">
        <div className="container-site max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-ink mb-4 lowercase">australia&apos;s premium vaping destination</h2>
          <div className="space-y-4 text-body text-sm leading-relaxed">
            <p>
              AussieVapes is Australia&apos;s trusted online vape store — stocking the widest range of{' '}
              <a href="/category/disposable-vapes" className="text-price font-semibold hover:underline">disposable vapes</a>,{' '}
              <a href="/category/pod-systems" className="text-price font-semibold hover:underline">pod systems</a>,{' '}
              <a href="/category/nicotine-salts" className="text-price font-semibold hover:underline">nicotine salts</a>, and{' '}
              <a href="/category/e-liquids" className="text-price font-semibold hover:underline">e-liquids</a> with fast, discreet shipping from Australian stock.
            </p>
            <p>
              Every product on AussieVapes is sourced from reputable brands, age-verified at purchase, and dispatched same business day on orders placed before 2pm AEST. We offer free shipping on all orders over $100, a 30-day return policy, and Australian-based customer support.
            </p>
            <p>
              Whether you&apos;re looking for the best disposable vape in Australia, a refillable pod kit to replace smoking, or stocking up on your favourite nicotine salt flavours — AussieVapes has you covered with genuine products and competitive pricing.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
