import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BrandProductGrid from '@/components/brand/BrandProductGrid'
import HeroCollage from '@/components/ui/HeroCollage'
import { BRANDS, getBrandBySlug, computeBrandSublines } from '@/lib/brands'
import { getProductsByBrandSlug } from '@/lib/storefront-products'
import {
  buildBrandMetadata,
  brandItemListJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from '@/lib/seo'
import { CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vapesaustralia.com.au'

// ISR — see comment in /product/[slug]/page.tsx. Same rationale: brand
// pages render fast from a baked static HTML, but pick up admin product
// edits (price, stock, new arrivals) within ~1 minute.
export const revalidate = 60

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const brand = getBrandBySlug(slug)
  if (!brand) return {}
  return buildBrandMetadata(brand)
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const brand = getBrandBySlug(slug)
  if (!brand) notFound()

  const products = await getProductsByBrandSlug(slug)
  const sublines = computeBrandSublines(brand, products)
  const productCount = products.length
  const featured = products.slice(0, 5)
  const avgRating =
    products.length > 0
      ? products.reduce((s, p) => s + p.rating, 0) / products.length
      : 4.7
  const minPrice = products.length ? Math.min(...products.map((p) => p.price)) : 0
  const maxPrice = products.length ? Math.max(...products.map((p) => p.price)) : 0

  const crumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Brands', url: `${SITE_URL}/brands` },
    { name: brand.displayName, url: `${SITE_URL}/brand/${brand.slug}` },
  ]

  const productJsonItems = featured.map((p) => ({
    name: p.name,
    url: `${SITE_URL}/product/${p.slug}`,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(brandItemListJsonLd(brand.slug, brand.displayName, productJsonItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(brand.faqs)) }}
      />

      {/* Hero banner */}
      <section
        className="border-b border-line"
        style={{ background: `linear-gradient(135deg, ${brand.accentColor}10 0%, #ffffff 60%)` }}
      >
        <div className="container-site py-10 lg:py-16">
          <Breadcrumb
            crumbs={[
              { label: 'Vapes Australia', href: '/' },
              { label: 'Brands', href: '/brands' },
              { label: brand.displayName },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-6">
            <div>
              <p
                className="font-display text-xs uppercase tracking-[0.3em] font-bold mb-3"
                style={{ color: brand.accentColor }}
              >
                {brand.origin} · Authentic AU Stock
              </p>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink-dark leading-[1.05] mb-3">
                {brand.displayName} <span className="text-mute">at Vapes Australia</span>
              </h1>
              <p
                className="font-display text-lg font-semibold mb-5"
                style={{ color: brand.accentColor }}
              >
                {brand.tagline}
              </p>
              <p className="text-body text-base leading-relaxed">{brand.shortDescription}</p>

              {/* Inline stats */}
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                <div className="bg-white border border-line rounded-sm p-3 text-center">
                  <p className="font-display text-xl font-bold text-ink">{productCount}</p>
                  <p className="text-[10px] text-mute uppercase tracking-wider font-display font-semibold mt-1">Products</p>
                </div>
                <div className="bg-white border border-line rounded-sm p-3 text-center">
                  <p className="font-display text-xl font-bold text-ink">
                    {minPrice === maxPrice ? `$${minPrice.toFixed(0)}` : `$${minPrice.toFixed(0)}+`}
                  </p>
                  <p className="text-[10px] text-mute uppercase tracking-wider font-display font-semibold mt-1">From</p>
                </div>
                <div className="bg-white border border-line rounded-sm p-3 text-center">
                  <div className="flex items-center justify-center gap-0.5 mb-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        className={i < Math.round(avgRating) ? 'h-3 w-3 text-warning' : 'h-3 w-3 text-soft-300'}
                      />
                    ))}
                  </div>
                  <p className="font-display text-base font-bold text-ink">{avgRating.toFixed(1)}</p>
                  <p className="text-[10px] text-mute uppercase tracking-wider font-display font-semibold">Rating</p>
                </div>
              </div>

              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-body">
                <li className="flex items-center gap-1.5">
                  <CheckCircleIcon className="h-4 w-4 text-success flex-shrink-0" />
                  Authentic AU stock
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircleIcon className="h-4 w-4 text-success flex-shrink-0" />
                  Same-day Sydney dispatch
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircleIcon className="h-4 w-4 text-success flex-shrink-0" />
                  Free shipping over $300
                </li>
              </ul>
            </div>

            {/* Brand product collage */}
            <div className="w-full">
              <HeroCollage products={featured} accentColor={brand.accentColor} />
            </div>
          </div>
        </div>
      </section>

      {/* Products section */}
      <section className="container-site py-12">
        <div className="section-heading-wrap">
          <h2 className="section-heading">all {brand.displayName.toLowerCase()} products</h2>
          <span className="font-display text-xs uppercase tracking-widest font-bold text-mute">
            {productCount.toLocaleString()} item{productCount !== 1 ? 's' : ''}
          </span>
        </div>

        {products.length === 0 ? (
          <p className="text-mute text-center py-16">No {brand.displayName} products currently in stock. Check back soon.</p>
        ) : (
          <Suspense fallback={<div className="h-96" />}>
            <BrandProductGrid products={products} sublines={sublines} accentColor={brand.accentColor} brandSlug={brand.slug} />
          </Suspense>
        )}
      </section>

      {/* About brand (long-form SEO content) */}
      <section className="bg-soft-100 border-t border-line py-14">
        <div className="container-site grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink mb-4 lowercase">
                about {brand.displayName.toLowerCase()}
              </h2>
              <p className="text-body leading-relaxed">{brand.longDescription}</p>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-ink mb-4 lowercase">
                why buy {brand.displayName.toLowerCase()} from aussievapes
              </h3>
              <ul className="space-y-3">
                {brand.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-body">
                    <CheckCircleIcon
                      className="h-5 w-5 flex-shrink-0 mt-0.5"
                      style={{ color: brand.accentColor }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border-l-4 border-ink p-5 rounded-sm">
              <p className="font-display text-xs uppercase tracking-widest text-mute font-bold mb-1">
                Best Known For
              </p>
              <p className="font-display text-lg font-bold text-ink">{brand.bestKnownFor}</p>
            </div>
          </div>

          {/* Side: quick links to products */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-line rounded-sm p-6">
              <h3 className="font-display text-base font-bold text-ink uppercase tracking-wider mb-4 pb-3 border-b border-line">
                Popular {brand.displayName} Models
              </h3>
              <ul className="space-y-3">
                {featured.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/product/${p.slug}`}
                      className="group flex items-center gap-3 text-sm hover:bg-soft-100 -mx-2 px-2 py-1.5 rounded-sm transition-colors"
                    >
                      <span className="font-display font-semibold text-ink group-hover:text-price line-clamp-2 flex-1">
                        {p.name}
                      </span>
                      <span className="font-display font-bold text-price whitespace-nowrap">
                        ${p.price.toFixed(2)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/brand/${brand.slug}#products`}
                className="block mt-4 pt-4 border-t border-line font-display text-xs uppercase tracking-widest font-bold text-price text-center hover:underline"
              >
                View All {productCount} Products →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-line py-14">
        <div className="container-site max-w-3xl">
          <div className="text-center mb-10">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-2">
              Frequently Asked Questions
            </p>
            <h2 className="font-display text-3xl font-bold text-ink lowercase">
              {brand.displayName.toLowerCase()} faq
            </h2>
          </div>

          <div className="space-y-4">
            {brand.faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-soft-100 border border-line rounded-sm overflow-hidden"
              >
                <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4 font-display font-bold text-ink hover:bg-soft-200 transition-colors">
                  <span>{faq.question}</span>
                  <span className="font-display text-price text-xl group-open:rotate-45 transition-transform flex-shrink-0">
                    +
                  </span>
                </summary>
                <div className="p-5 pt-0 text-body leading-relaxed text-sm">{faq.answer}</div>
              </details>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-sm bg-soft-100 border border-line text-center">
            <h3 className="font-display text-lg font-bold text-ink mb-2 uppercase tracking-wide">
              Still have questions?
            </h3>
            <p className="text-body text-sm mb-4">Our Australian support team is here to help, Mon–Fri 9am–5pm AEST.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="btn-primary">Contact Support</Link>
              <Link href={`/search?q=${encodeURIComponent(brand.displayName)}`} className="btn-secondary">
                Search {brand.displayName}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related brands */}
      <section className="bg-soft-100 border-t border-line py-12">
        <div className="container-site">
          <h2 className="section-heading mb-6">explore other brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {BRANDS.filter((b) => b.slug !== brand.slug).slice(0, 8).map((b) => (
              <Link
                key={b.slug}
                href={`/brand/${b.slug}`}
                className="group bg-white border border-line rounded-sm aspect-[3/2] flex items-center justify-center hover:shadow-md hover:border-ink transition-all p-3"
              >
                <span
                  className="font-display text-lg font-bold uppercase tracking-wider"
                  style={{ color: b.accentColor }}
                >
                  {b.displayName.length > 10 ? b.displayName.slice(0, 10) : b.displayName}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance footer */}
      <div className="container-site py-6">
        <div className="p-4 rounded-sm bg-soft-100 border border-line text-xs text-body leading-relaxed flex items-start gap-2">
          <ExclamationTriangleIcon className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-ink">Australian Regulation Notice:</strong> Nicotine-containing vaping products require a valid Australian prescription under the TGA Therapeutic Goods (Standard for Nicotine Vaping Products) (TGO 110) Order 2021. By purchasing, you confirm you hold a valid prescription and are 18 years or older. Vapes Australia complies with all applicable Australian regulations.
          </span>
        </div>
      </div>
    </>
  )
}
