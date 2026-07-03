import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import { PACK_GROUPS, getFeaturedPacks, getPackGroupCounts } from '@/lib/packs'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

export default function PacksSection() {
  const featured = getFeaturedPacks(5)
  const counts = getPackGroupCounts()
  const totalPacks = counts.reduce((acc, c) => Math.max(acc, c.count), 0)

  return (
    <section className="bg-ink text-white border-y border-line">
      <div className="container-site py-14">
        {/* Heading row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 items-end">
          <div className="lg:col-span-2">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-3">
              Buy More · Save More
            </p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold uppercase leading-[1.05] mb-3">
              Aussie Vape Packs
            </h2>
            <p className="text-white/80 leading-relaxed max-w-2xl">
              The complete Vapes Australia pack collection — disposable vape packs, multi-buy bundles, bulk cartons and
              brand pack deals. Save up to <strong className="text-price">25% per device</strong> when you buy in packs.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Link href="/packs" className="btn-sale">Shop All Aussie Vape Packs</Link>
            <Link href="/packs/bundle-deals" className="font-display text-xs uppercase tracking-widest font-bold text-white/70 hover:text-price">
              Bundle Deals →
            </Link>
          </div>
        </div>

        {/* Pack group quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {PACK_GROUPS.map((g) => {
            const count = counts.find((c) => c.slug === g.slug)?.count ?? 0
            return (
              <Link
                key={g.slug}
                href={`/packs/${g.slug}`}
                className="bg-white/5 hover:bg-white border border-white/10 hover:border-white rounded-sm p-4 transition-all flex flex-col items-center text-center group"
              >
                <g.icon className="h-8 w-8 mb-2 text-white" />
                <p className="font-display text-xs font-bold uppercase tracking-wider text-white group-hover:text-ink transition-colors">
                  {g.name}
                </p>
                <p className="font-display text-[10px] uppercase tracking-wider text-white/60 group-hover:text-mute transition-colors mt-1">
                  {count} products
                </p>
                <span className="font-display text-xs uppercase tracking-wider font-bold text-price mt-2 flex items-center gap-1">
                  Shop <ArrowRightIcon className="h-3 w-3" />
                </span>
              </Link>
            )
          })}
        </div>

        {/* Featured pack products on white bg for product card legibility */}
        {featured.length > 0 && (
          <div className="bg-white rounded-sm border border-line p-6">
            <div className="flex items-end justify-between border-b border-line pb-3 mb-6">
              <h3 className="font-display text-xl font-bold text-ink uppercase tracking-wide">
                Featured Aussie Vape Packs
              </h3>
              <Link href="/packs" className="font-display text-xs uppercase tracking-widest font-bold text-price hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* SEO inline links */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-white/60 font-bold mb-3 text-center">
            Popular Aussie Vape Pack Searches
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {[
              { l: 'Disposable Vape Packs Australia', h: '/packs/disposable-vape-packs' },
              { l: 'Vape Bundle Deals Australia', h: '/packs/bundle-deals' },
              { l: 'Buy Vape Packs Online Australia', h: '/packs' },
              { l: 'Bulk Vape Packs Australia', h: '/packs/bulk-vape-packs' },
              { l: 'IGET Packs', h: '/packs/brand-packs' },
              { l: 'Alfakher Packs', h: '/packs/brand-packs' },
              { l: 'Multi-Buy Vapes', h: '/packs/multi-buy-packs' },
            ].map(({ l, h }) => (
              <Link key={l} href={h} className="font-display font-semibold text-white/80 hover:text-price transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
