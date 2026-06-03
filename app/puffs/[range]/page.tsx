import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductGrid from '@/components/product/ProductGrid'
import Pagination, { PAGE_SIZE, paginate, parsePage } from '@/components/ui/Pagination'
import HeroCollage from '@/components/ui/HeroCollage'
import { PUFF_RANGES, getPuffRangeBySlug, getProductsByPuffRange } from '@/lib/puff-ranges'
import { breadcrumbJsonLd } from '@/lib/seo'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.aussievapes.com.au'

export async function generateStaticParams() {
  return PUFF_RANGES.map((r) => ({ range: r.slug }))
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ range: string }>
  searchParams: Promise<{ page?: string }>
}): Promise<Metadata> {
  const { range } = await params
  const sp = await searchParams
  const page = parsePage(sp.page)
  const r = getPuffRangeBySlug(range)
  if (!r) return {}
  const suffix = page > 1 ? ` — Page ${page}` : ''
  return {
    title: `${r.seoTitle}${suffix}`,
    description: r.seoDescription,
    keywords: r.keywords,
    alternates: { canonical: page > 1 ? `/puffs/${r.slug}?page=${page}` : `/puffs/${r.slug}` },
  }
}

export default async function PuffRangePage({
  params,
  searchParams,
}: {
  params: Promise<{ range: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { range } = await params
  const sp = await searchParams
  const currentPage = parsePage(sp.page)
  const r = getPuffRangeBySlug(range)
  if (!r) notFound()

  const allProducts = getProductsByPuffRange(range)
  const products = paginate(allProducts, currentPage, PAGE_SIZE)

  const crumbs = [
    { name: 'Aussie Vapes', url: `${SITE_URL}/` },
    { name: 'Shop by Puff Count', url: `${SITE_URL}/puffs` },
    { name: r.name, url: `${SITE_URL}/puffs/${r.slug}` },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb
            crumbs={[
              { label: 'Aussie Vapes', href: '/' },
              { label: 'Shop by Puff Count', href: '/puffs' },
              { label: r.shortName },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-5">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-2">
                {allProducts.length.toLocaleString()} Aussie Vapes In This Range
              </p>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink leading-[1.05] mb-3 flex items-center gap-3">
                <r.icon className="h-10 w-10 text-price" />
                {r.name}
              </h1>
              <p className="text-body leading-relaxed">{r.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {PUFF_RANGES.filter((other) => other.slug !== r.slug).map((other) => (
                  <Link
                    key={other.slug}
                    href={`/puffs/${other.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-display font-bold uppercase tracking-wider border border-line text-body bg-white hover:border-ink transition-colors"
                  >
                    <other.icon className="h-4 w-4" />
                    {other.shortName}
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-full">
              <HeroCollage products={allProducts.slice(0, 5)} accentColor="#ff0000" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-12">
        {allProducts.length === 0 ? (
          <p className="text-mute text-center py-20">
            No Aussie Vapes products currently in the {r.shortName.toLowerCase()} puff range. Try a different range above.
          </p>
        ) : (
          <>
            <div className="section-heading-wrap">
              <h2 className="section-heading">{allProducts.length.toLocaleString()} products</h2>
            </div>
            <ProductGrid products={products} />
            <Pagination currentPage={currentPage} totalItems={allProducts.length} basePath={`/puffs/${r.slug}`} />
          </>
        )}
      </section>

      <section className="bg-soft-100 border-t border-line py-12">
        <div className="container-site max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-ink mb-4 lowercase">
            about {r.shortName.toLowerCase()} puff vapes at aussie vapes
          </h2>
          <p className="text-body leading-relaxed text-sm">{r.longDescription}</p>

          <div className="mt-6 flex items-start gap-2 text-xs text-body">
            <CheckCircleIcon className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
            All Aussie Vapes products in this range are authentic AU stock, same-day Sydney dispatch on weekday orders before 2pm AEST.
          </div>
        </div>
      </section>
    </>
  )
}
