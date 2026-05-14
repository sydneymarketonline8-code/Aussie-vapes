import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { PACK_GROUPS, getPackGroupBySlug, getPacksByGroup, extractPackSize } from '@/lib/packs'
import { breadcrumbJsonLd } from '@/lib/seo'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aussievapes.com.au'

export async function generateStaticParams() {
  return PACK_GROUPS.map((g) => ({ group: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string }>
}): Promise<Metadata> {
  const { group } = await params
  const g = getPackGroupBySlug(group)
  if (!g) return {}
  return {
    title: g.seoTitle,
    description: g.seoDescription,
    keywords: g.keywords,
    alternates: { canonical: `/packs/${g.slug}` },
    openGraph: {
      title: g.seoTitle,
      description: g.seoDescription,
    },
  }
}

export default async function PackGroupPage({
  params,
}: {
  params: Promise<{ group: string }>
}) {
  const { group } = await params
  const g = getPackGroupBySlug(group)
  if (!g) notFound()

  const products = getPacksByGroup(group).sort((a, b) => extractPackSize(a.name) - extractPackSize(b.name))

  // Group by pack size for nicer presentation
  const bySize = new Map<number, typeof products>()
  for (const p of products) {
    const size = extractPackSize(p.name)
    if (!bySize.has(size)) bySize.set(size, [])
    bySize.get(size)!.push(p)
  }
  const sizeKeys = Array.from(bySize.keys()).sort((a, b) => a - b)

  const crumbs = [
    { name: 'Aussie Vapes', url: `${SITE_URL}/` },
    { name: 'Vape Packs', url: `${SITE_URL}/packs` },
    { name: g.name, url: `${SITE_URL}/packs/${g.slug}` },
  ]

  const itemListJson = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: g.name,
    description: g.description,
    url: `${SITE_URL}/packs/${g.slug}`,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${SITE_URL}/product/${p.slug}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJson) }} />

      {/* Hero */}
      <section
        className="border-b border-line"
        style={{ background: `linear-gradient(135deg, ${g.accentColor}15 0%, #ffffff 60%)` }}
      >
        <div className="container-site py-12">
          <Breadcrumb
            crumbs={[
              { label: 'Aussie Vapes', href: '/' },
              { label: 'Vape Packs', href: '/packs' },
              { label: g.name },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end mt-6">
            <div className="lg:col-span-2">
              <p
                className="font-display text-xs uppercase tracking-[0.3em] font-bold mb-3"
                style={{ color: g.accentColor }}
              >
                {products.length.toLocaleString()} Aussie Vape Packs In Stock
              </p>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink-dark leading-[1.05] mb-3 lowercase">
                {g.name.toLowerCase()}
              </h1>
              <p className="text-body text-base leading-relaxed max-w-2xl">{g.shortDescription}</p>
            </div>

            <div className="bg-white border border-line rounded-sm p-6 shadow-sm">
              <p className="font-display text-xs uppercase tracking-wider text-mute font-bold mb-3">In This Collection</p>
              <p className="font-display text-3xl font-bold text-ink mb-1">{products.length}</p>
              <p className="text-xs text-body mb-5">pack-format products</p>
              <ul className="space-y-2 text-xs text-body border-t border-line pt-4">
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-success" />Authentic AU stock</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-success" />Same-day Sydney dispatch</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-success" />Free shipping over $100</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-success" />30-day return guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-group filter pills by pack size */}
      {sizeKeys.length > 1 && (
        <section className="bg-white border-b border-line">
          <div className="container-site py-6">
            <p className="font-display text-[11px] uppercase tracking-[0.3em] text-mute font-bold mb-3">
              Filter by Pack Size
            </p>
            <div className="flex flex-wrap gap-2">
              {sizeKeys.map((size) => (
                <a
                  key={size}
                  href={`#size-${size}`}
                  className="px-4 py-2 rounded-sm text-xs font-display font-bold uppercase tracking-wider border border-line text-body bg-white hover:border-ink hover:bg-ink hover:text-white transition-colors"
                >
                  {size}-Pack <span className="opacity-70 ml-1">({bySize.get(size)?.length ?? 0})</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products grouped by pack size */}
      <section className="container-site py-10">
        {products.length === 0 ? (
          <p className="text-mute text-center py-20">
            No {g.name} currently in stock. Check back soon, or browse the{' '}
            <Link href="/packs" className="text-price font-semibold hover:underline">full Aussie Vape Packs range</Link>.
          </p>
        ) : (
          sizeKeys.map((size) => (
            <div key={size} id={`size-${size}`} className="mb-12 scroll-mt-24">
              <div className="section-heading-wrap">
                <h2 className="section-heading">{size}-pack aussie vapes</h2>
                <span className="font-display text-xs uppercase tracking-widest font-bold text-mute">
                  {bySize.get(size)?.length ?? 0} products
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
                {bySize.get(size)!.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Long-form SEO */}
      <section className="bg-soft-100 border-t border-line py-14">
        <div className="container-site grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 lowercase">
              about {g.name.toLowerCase()} at aussie vapes
            </h2>
            <p className="text-body leading-relaxed">{g.longDescription}</p>

            <div className="mt-6">
              <h3 className="font-display text-base font-bold text-ink uppercase tracking-wider mb-3">
                Explore Other Aussie Vape Packs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PACK_GROUPS.filter((other) => other.slug !== g.slug).map((other) => (
                  <Link
                    key={other.slug}
                    href={`/packs/${other.slug}`}
                    className="bg-white border border-line rounded-sm p-4 hover:border-ink transition-all flex items-center gap-3"
                  >
                    <span className="text-2xl">{other.icon}</span>
                    <div>
                      <p className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                        {other.name}
                      </p>
                      <p className="text-xs text-mute">{other.shortDescription.slice(0, 60)}…</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div className="bg-white border border-line rounded-sm p-6">
              <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3 pb-2 border-b border-line">
                Related Aussie Vapes Pages
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/packs" className="text-body hover:text-price">All Aussie Vape Packs</Link></li>
                <li><Link href="/category/disposable-vapes" className="text-body hover:text-price">Single Disposable Vapes</Link></li>
                <li><Link href="/brands" className="text-body hover:text-price">All Aussie Vapes Brands</Link></li>
                <li><Link href="/sale" className="text-body hover:text-price">Aussie Vapes Sale</Link></li>
                <li><Link href="/bulk" className="text-body hover:text-price">Bulk &amp; Wholesale</Link></li>
                <li><Link href="/shipping" className="text-body hover:text-price">Shipping Policy</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
