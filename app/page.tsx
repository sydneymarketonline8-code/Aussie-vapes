import type { Metadata } from 'next'
import HeroBanner from '@/components/home/HeroBanner'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import TrustBadges from '@/components/home/TrustBadges'
import { buildSiteMetadata } from '@/lib/seo'

export const metadata: Metadata = buildSiteMetadata()

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrustBadges />
      <CategoryGrid />
      <FeaturedProducts />

      {/* SEO content block */}
      <section className="py-14 border-t border-surface-600">
        <div className="container-site max-w-3xl">
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Australia&apos;s Premium Vaping Destination</h2>
          <div className="prose prose-sm prose-invert max-w-none space-y-4 text-zinc-400 leading-relaxed">
            <p>
              VapeVault AU is Australia&apos;s trusted online vape store — stocking the widest range of{' '}
              <a href="/category/disposable-vapes" className="text-brand hover:underline">disposable vapes</a>,{' '}
              <a href="/category/pod-systems" className="text-brand hover:underline">pod systems</a>,{' '}
              <a href="/category/nicotine-salts" className="text-brand hover:underline">nicotine salts</a>, and{' '}
              <a href="/category/e-liquids" className="text-brand hover:underline">e-liquids</a> with fast, discreet shipping from Australian stock.
            </p>
            <p>
              Every product on VapeVault AU is sourced from reputable brands, age-verified at purchase, and dispatched same business day on orders placed before 2pm AEST. We offer free shipping on all orders over $100, a 30-day return policy, and Australian-based customer support.
            </p>
            <p>
              Whether you&apos;re looking for the best disposable vape in Australia, a refillable pod kit to replace smoking, or stocking up on your favourite nicotine salt flavours — VapeVault AU has you covered with genuine products and competitive pricing.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
