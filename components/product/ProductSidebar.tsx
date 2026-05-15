import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types'
import { BRANDS, getBrandSlugForProduct } from '@/lib/brands'
import { PRODUCTS, getFeaturedProducts } from '@/lib/products'
import { PUFF_RANGES, getPuffRangeCounts, POPULAR_FLAVOURS } from '@/lib/puff-ranges'

interface ProductSidebarProps {
  currentProduct: Product
}

/** Sidebar with: Shop by Brand · Shop by Puff Count · Shop by Flavour · Best Sellers */
export default function ProductSidebar({ currentProduct }: ProductSidebarProps) {
  // Top brands by product count
  const brandCounts = new Map<string, number>()
  for (const p of PRODUCTS) {
    const slug = getBrandSlugForProduct(p)
    if (slug) brandCounts.set(slug, (brandCounts.get(slug) || 0) + 1)
  }
  const topBrands = BRANDS.map((b) => ({ ...b, count: brandCounts.get(b.slug) || 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  const puffCounts = getPuffRangeCounts()
  const bestSellers = getFeaturedProducts()
    .filter((p) => p.id !== currentProduct.id && p.images?.[0])
    .slice(0, 5)

  return (
    <aside className="space-y-5">
      {/* Shop by Brand */}
      <div className="bg-white border border-line rounded-sm p-5">
        <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3 pb-2 border-b border-line">
          Shop by Brand
        </h3>
        <ul className="space-y-2">
          {topBrands.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/brand/${b.slug}`}
                className="flex items-center justify-between text-sm hover:bg-soft-100 -mx-2 px-2 py-1.5 rounded-sm transition-colors"
              >
                <span className="font-display font-semibold" style={{ color: b.accentColor }}>
                  {b.displayName}
                </span>
                <span className="text-xs text-mute">{b.count}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/brands"
          className="block mt-3 pt-3 border-t border-line text-xs font-display uppercase tracking-widest font-bold text-price text-center hover:underline"
        >
          All {BRANDS.length} Brands →
        </Link>
      </div>

      {/* Shop by Puff Count */}
      <div className="bg-white border border-line rounded-sm p-5">
        <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3 pb-2 border-b border-line">
          Shop by Puff Count
        </h3>
        <ul className="space-y-2">
          {PUFF_RANGES.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/puffs/${r.slug}`}
                className="flex items-center justify-between gap-2 text-sm hover:bg-soft-100 -mx-2 px-2 py-1.5 rounded-sm transition-colors"
              >
                <span className="flex items-center gap-2">
                  <r.icon className="h-4 w-4 text-ink" />
                  <span className="font-display font-semibold text-ink">{r.shortName}</span>
                </span>
                <span className="text-xs text-mute">{puffCounts[r.slug] ?? 0}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/puffs"
          className="block mt-3 pt-3 border-t border-line text-xs font-display uppercase tracking-widest font-bold text-price text-center hover:underline"
        >
          All Puff Ranges →
        </Link>
      </div>

      {/* Shop by Flavour */}
      <div className="bg-white border border-line rounded-sm p-5">
        <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3 pb-2 border-b border-line">
          Shop by Flavour
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_FLAVOURS.map((f) => (
            <Link
              key={f}
              href={`/search?q=${encodeURIComponent(f)}`}
              className="px-2.5 py-1 text-xs bg-soft-100 hover:bg-ink hover:text-white text-body rounded-sm border border-line transition-colors font-display"
            >
              {f}
            </Link>
          ))}
        </div>
      </div>

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <div className="bg-white border border-line rounded-sm p-5">
          <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3 pb-2 border-b border-line">
            Best Sellers
          </h3>
          <ul className="space-y-3">
            {bestSellers.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/product/${p.slug}`}
                  className="group flex items-center gap-3 hover:bg-soft-100 -mx-2 px-2 py-1 rounded-sm transition-colors"
                >
                  <div className="relative h-14 w-14 flex-shrink-0 rounded-sm overflow-hidden bg-soft-100 border border-line">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="56px"
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-xs font-semibold text-ink line-clamp-2 leading-snug group-hover:text-price transition-colors">
                      {p.name}
                    </p>
                    <p className="font-display text-sm font-bold text-price mt-0.5">${p.price.toFixed(2)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}
