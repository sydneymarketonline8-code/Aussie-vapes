import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { PACK_GROUPS, getAllPacks, getPackGroupCounts, getFeaturedPacks } from '@/lib/packs'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import HeroCollage from '@/components/ui/HeroCollage'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vapehubvapesaustralia.com.au'

export const metadata: Metadata = {
  title: 'Vape Packs — Disposable Vape Packs & Bundle Deals Australia',
  description:
    "Buy Aussie vape packs online — disposable vape packs, multi-buy bundles, bulk cartons & brand pack deals. 2-pack, 5-pack, 10-pack and bulk discounts. Same-day Sydney dispatch.",
  keywords: [
    'vape packs',
    'aussie vape hub packs',
    'disposable vape packs australia',
    'vape bundle deals australia',
    'buy vape packs online australia',
    'vape packs australia',
    'multi pack aussie vape hub',
    'bulk vape packs australia',
    'iget pack australia',
    'alfakher pack australia',
  ],
  alternates: { canonical: '/packs' },
  openGraph: {
    title: 'Vape Packs — Disposable Vape Packs & Bundle Deals Australia',
    description:
      'Disposable vape packs, multi-buy bundles, bulk cartons & brand pack deals. Same-day Sydney dispatch.',
  },
}

const FAQS = [
  {
    question: 'What are Aussie vape packs?',
    answer:
      'Aussie vape packs are multi-device pack-format disposable vapes — typically 2-pack, 3-pack, 5-pack, 10-pack or larger. Each pack contains multiple identical or mixed-flavour devices at a per-unit price lower than buying single devices.',
  },
  {
    question: 'How much can I save with Aussie Vape Hub pack pricing?',
    answer:
      'Pack savings at Aussie Vape Hub typically scale with pack size: 2-3 packs save 8-12% per device, 5-packs save 12-18%, 10-packs save 18-25%, and 20+ pack cartons can save 25-30%+ per unit vs single-device pricing.',
  },
  {
    question: 'Are the products in a pack all the same flavour?',
    answer:
      'Most Aussie Vape Hub packs are single-flavour (e.g. an Alfakher Crown Bar 15000 5-pack is all the same flavour). Some bundles and bulk packs offer mixed-flavour assortments — flavour selection is shown on each individual product page.',
  },
  {
    question: 'Do Aussie Vape Hub packs qualify for free shipping?',
    answer:
      "Yes — Aussie Vape Hub offers free standard shipping on all Australian orders over $300. Almost every pack on Aussie Vape Hub is over the threshold, so you'll get free shipping automatically.",
  },
  {
    question: 'Can I buy vape packs for a business or event?',
    answer:
      'Yes — Aussie Vape Hub Bulk Vape Packs (10-pack, 20-pack, 50-pack, 100-pack) are the easiest way to buy in volume. For dedicated wholesale accounts with net-30 terms, see our /bulk page.',
  },
  {
    question: 'Are packs from Aussie Vape Hub authentic?',
    answer:
      "Yes — every product in every Aussie Vape Hub pack is sourced through authorised distribution channels and carries the brand's authenticity verification code. We never sell grey-market or counterfeit stock.",
  },
]

export default function PacksLandingPage() {
  const allPacks = getAllPacks()
  const counts = getPackGroupCounts()
  const featured = getFeaturedPacks(10)

  const crumbs = [
    { name: 'Aussie Vape Hub', url: `${SITE_URL}/` },
    { name: 'Vape Packs', url: `${SITE_URL}/packs` },
  ]

  const itemListJson = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vape Packs',
    description: 'Disposable vape packs, multi-buy bundles, bulk cartons and brand pack deals from Aussie Vape Hub.',
    url: `${SITE_URL}/packs`,
    numberOfItems: allPacks.length,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }} />

      {/* Hero */}
      <section className="bg-ink text-white border-b border-line">
        <div className="container-site py-14">
          <Breadcrumb crumbs={[{ label: 'Aussie Vape Hub', href: '/' }, { label: 'Vape Packs' }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-5">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-3">
                {allPacks.length.toLocaleString()} Pack-Format Products
              </p>
              <h1 className="font-display text-4xl lg:text-6xl font-bold leading-[1.05] uppercase mb-4">
                Vape Packs
              </h1>
              <p className="text-white/80 leading-relaxed text-lg">
                Save more, vape longer. The complete Aussie Vape Hub pack collection — disposable vape packs, multi-buy
                bundles, bulk cartons and brand pack deals. Save up to{' '}
                <strong className="text-price">25% per device</strong> vs single-unit pricing with same-day Sydney
                dispatch.
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                <Link href="/packs/disposable-vape-packs" className="btn-sale">Shop Disposable Vape Packs</Link>
                <Link href="/packs/bulk-vape-packs" className="btn-secondary bg-white border-white text-ink hover:bg-price hover:border-price hover:text-white">
                  Bulk Cartons →
                </Link>
              </div>
            </div>

            {/* Pack collage */}
            <div className="w-full">
              <HeroCollage products={featured.slice(0, 5)} accentColor="#ff0000" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-white border-b border-line">
        <div className="container-site py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Save up to 25% per device',
            'Free shipping on every pack',
            'Authentic AU stock only',
            'Same-day Sydney dispatch',
          ].map((t) => (
            <div key={t} className="flex items-center gap-2 text-sm text-body">
              <CheckCircleIcon className="h-5 w-5 text-success flex-shrink-0" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pack group cards */}
      <section className="container-site py-14">
        <div className="section-heading-wrap">
          <h2 className="section-heading">shop packs by type</h2>
          <span className="font-display text-xs uppercase tracking-widest font-bold text-mute">
            5 pack collections
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PACK_GROUPS.map((g) => {
            const count = counts.find((c) => c.slug === g.slug)?.count ?? 0
            return (
              <Link
                key={g.slug}
                href={`/packs/${g.slug}`}
                className="group bg-white border border-line rounded-sm p-6 hover:shadow-md hover:border-ink transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <g.icon className="h-10 w-10 text-ink" />
                  <span className="font-display text-xs uppercase tracking-wider text-mute font-bold">
                    {count} products
                  </span>
                </div>
                <h3
                  className="font-display text-xl font-bold uppercase tracking-wide mb-2 group-hover:text-price transition-colors"
                  style={{ color: g.accentColor }}
                >
                  {g.name}
                </h3>
                <p className="text-body text-sm leading-relaxed flex-1">{g.shortDescription}</p>
                <span className="mt-4 pt-3 border-t border-line font-display text-xs uppercase tracking-widest font-bold text-ink group-hover:text-price transition-colors">
                  Shop {g.name} →
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured packs */}
      {featured.length > 0 && (
        <section className="bg-soft-100 border-y border-line py-14">
          <div className="container-site">
            <div className="section-heading-wrap">
              <h2 className="section-heading">featured aussie vape hub packs</h2>
              <Link href="/packs/bundle-deals" className="font-display text-xs uppercase tracking-widest font-bold text-price hover:underline">
                View All Bundle Deals →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Long-form SEO content */}
      <section className="container-site py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-display text-2xl font-bold text-ink lowercase">why buy vape packs from aussie vape hub</h2>
          <p className="text-body leading-relaxed">
            <strong>Aussie Vape Hub</strong> stocks the largest range of pack-format disposable vapes in Australia. With
            {' '}{allPacks.length.toLocaleString()} pack products across 5 organised collections, Vape Packs make
            it easy to compare per-device pricing across {' '}<Link href="/brand/iget" className="text-price font-semibold hover:underline">IGET</Link>,
            {' '}<Link href="/brand/alfakher" className="text-price font-semibold hover:underline">Alfakher Crown Bar</Link>,
            {' '}<Link href="/brand/hqd" className="text-price font-semibold hover:underline">HQD</Link>,
            {' '}<Link href="/brand/gunnpod" className="text-price font-semibold hover:underline">Gunnpod</Link>,
            {' '}<Link href="/brand/lost-mary" className="text-price font-semibold hover:underline">Lost Mary</Link>,
            {' '}<Link href="/brand/vozol" className="text-price font-semibold hover:underline">Vozol</Link>
            {' '}and 35+ more authentic Aussie vape brands.
          </p>
          <p className="text-body leading-relaxed">
            Pack pricing at Aussie Vape Hub scales with quantity. A 2-pack typically saves 8-12% per unit vs single-device
            pricing. A 5-pack saves 12-18%. A 10-pack saves 18-25%. Bulk 20-pack, 50-pack and 100-pack cartons unlock
            wholesale-style pricing tiers for heavy users, event organisers and B2B resellers. Every Aussie Vape Hub pack
            is dispatched same-day from our Sydney warehouse on weekday orders before 2pm AEST.
          </p>

          <h3 className="font-display text-xl font-bold text-ink lowercase mt-6">vape packs popular searches</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { l: 'Aussie vape packs', h: '/packs' },
              { l: 'Disposable vape packs Australia', h: '/packs/disposable-vape-packs' },
              { l: 'Vape bundle deals Australia', h: '/packs/bundle-deals' },
              { l: 'Buy vape packs online Australia', h: '/packs' },
              { l: 'IGET pack Australia', h: '/packs/brand-packs' },
              { l: 'Alfakher Crown Bar pack', h: '/packs/brand-packs' },
              { l: '5 pack vape Australia', h: '/packs/disposable-vape-packs' },
              { l: '10 pack vape Australia', h: '/packs/bulk-vape-packs' },
              { l: 'Bulk vape packs', h: '/packs/bulk-vape-packs' },
              { l: 'Multi buy vapes Australia', h: '/packs/multi-buy-packs' },
            ].map(({ l, h }) => (
              <Link key={l} href={h} className="px-3 py-1.5 text-xs bg-white text-body rounded-sm border border-line hover:border-ink hover:bg-ink hover:text-white transition-colors font-display">
                {l}
              </Link>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="bg-soft-100 border border-line rounded-sm p-6">
            <h3 className="font-display text-base font-bold text-ink uppercase tracking-wider mb-4 pb-3 border-b border-line">
              Aussie Vape Hub Pack Stats
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-body">Total Pack Products</dt><dd className="font-display font-bold text-ink">{allPacks.length}</dd></div>
              {counts.map((c) => {
                const g = PACK_GROUPS.find((p) => p.slug === c.slug)
                return (
                  <div key={c.slug} className="flex justify-between">
                    <dt><Link href={`/packs/${c.slug}`} className="text-body hover:text-price">{g?.name}</Link></dt>
                    <dd className="font-display font-bold text-ink">{c.count}</dd>
                  </div>
                )
              })}
            </dl>
          </div>
        </aside>
      </section>

      {/* FAQ */}
      <section className="bg-soft-100 border-t border-line py-14">
        <div className="container-site max-w-3xl">
          <div className="text-center mb-10">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-2">
              Vape Packs FAQ
            </p>
            <h2 className="font-display text-3xl font-bold text-ink lowercase">
              vape pack questions answered
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group bg-white border border-line rounded-sm overflow-hidden">
                <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4 font-display font-bold text-ink hover:bg-soft-100 transition-colors">
                  <span>{faq.question}</span>
                  <span className="font-display text-price text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                </summary>
                <div className="p-5 pt-0 text-body leading-relaxed text-sm">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
