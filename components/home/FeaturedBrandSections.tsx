import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import { BRANDS, getProductsByBrand } from '@/lib/brands'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

/**
 * Five SEO-rich brand landing blocks on the homepage, one per top Aussie
 * search brand. Each block has an H2 with the brand name, a brief tagline,
 * 4 representative products, and a Shop CTA pointing at the full brand page.
 *
 * Targets keyword clusters: "iget australia", "alfakher australia",
 * "hqd australia", "gunnpod australia", "lost mary australia" — and the
 * combined "[brand] aussie vape hub" long-tails.
 */

const FEATURED_BRAND_SLUGS = ['iget', 'alfakher', 'hqd', 'gunnpod', 'lost-mary']

function pick4(slug: string) {
  const products = getProductsByBrand(slug).filter((p) => p.images?.[0])
  // Prefer best-sellers / rated, fall back to first 4
  const sorted = [...products].sort(
    (a, b) =>
      (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) ||
      b.rating - a.rating ||
      b.reviewCount - a.reviewCount
  )
  return sorted.slice(0, 4)
}

export default function FeaturedBrandSections() {
  const brandBlocks = FEATURED_BRAND_SLUGS.map((slug) => {
    const brand = BRANDS.find((b) => b.slug === slug)
    if (!brand) return null
    const products = pick4(slug)
    if (products.length === 0) return null
    return { brand, products }
  }).filter((x): x is { brand: NonNullable<ReturnType<typeof BRANDS.find>>; products: ReturnType<typeof pick4> } => x !== null)

  if (brandBlocks.length === 0) return null

  return (
    <section className="bg-white border-y border-line py-14">
      <div className="container-site">
        {/* Section heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-2">
            Top Vape Brands
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink lowercase mb-3">
            australia&apos;s most-searched vape brands
          </h2>
          <p className="text-body leading-relaxed">
            The five brands Australians actually buy. Each has a dedicated Aussie Vape Hub page with the full range,
            verified authentic stock and same-day Sydney dispatch.
          </p>
        </div>

        {/* Brand blocks */}
        <div className="space-y-14">
          {brandBlocks.map(({ brand, products }) => (
            <article
              key={brand.slug}
              className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-8 lg:gap-10 items-start"
            >
              {/* Brand info column */}
              <div className="lg:sticky lg:top-24">
                <div
                  className="inline-block px-3 py-1 mb-3 rounded-sm text-[10px] font-display uppercase tracking-[0.3em] font-bold text-white"
                  style={{ background: brand.accentColor }}
                >
                  {brand.origin}
                </div>
                <h3
                  className="font-display text-3xl lg:text-4xl font-bold uppercase tracking-tight leading-none mb-2"
                  style={{ color: brand.accentColor }}
                >
                  {brand.displayName}
                </h3>
                <p
                  className="font-display text-sm font-semibold mb-3"
                  style={{ color: brand.accentColor }}
                >
                  {brand.tagline}
                </p>
                <p className="text-body text-sm leading-relaxed mb-4">{brand.shortDescription}</p>

                <Link
                  href={`/brand/${brand.slug}`}
                  className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-widest font-bold text-ink hover:text-price transition-colors"
                >
                  Shop {brand.displayName} Australia <ArrowRightIcon className="h-4 w-4" />
                </Link>

                {/* Quick-link strip — bottom for the SEO crawl */}
                <ul className="mt-5 space-y-1.5 text-xs">
                  <li>
                    <Link href={`/brand/${brand.slug}`} className="text-body hover:text-price">
                      → All {brand.displayName} Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/search?q=${encodeURIComponent(brand.displayName)}`}
                      className="text-body hover:text-price"
                    >
                      → Search {brand.displayName}
                    </Link>
                  </li>
                  <li>
                    <Link href="/packs/brand-packs" className="text-body hover:text-price">
                      → {brand.displayName} Packs &amp; Bundles
                    </Link>
                  </li>
                </ul>
              </div>

              {/* 4-product grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 pt-10 border-t border-line text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-mute font-bold mb-3">
            Looking for more brands?
          </p>
          <Link href="/brands" className="btn-primary">
            See All 40+ Vape Brands
          </Link>
        </div>
      </div>
    </section>
  )
}
