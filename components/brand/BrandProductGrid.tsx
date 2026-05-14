'use client'

import { useState, useMemo } from 'react'
import ProductCard from '@/components/product/ProductCard'
import type { Product } from '@/types'
import type { BrandSubline } from '@/lib/brands'
import clsx from 'clsx'

interface BrandProductGridProps {
  products: Product[]
  sublines: BrandSubline[]
  accentColor: string
}

export default function BrandProductGrid({ products, sublines, accentColor }: BrandProductGridProps) {
  const [active, setActive] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!active) return products
    const subline = sublines.find((s) => s.slug === active)
    if (!subline) return products
    const set = new Set(subline.productSlugs)
    return products.filter((p) => set.has(p.slug))
  }, [active, products, sublines])

  if (!sublines.length) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    )
  }

  return (
    <>
      {/* Subline filter pills */}
      <div className="mb-8">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-mute font-bold mb-3">
          Shop by Model
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActive(null)}
            className={clsx(
              'px-4 py-2 rounded-sm text-xs font-display font-bold uppercase tracking-wider border transition-all',
              active === null
                ? 'text-white border-transparent shadow-sm'
                : 'bg-white border-line text-body hover:border-ink'
            )}
            style={active === null ? { background: accentColor } : undefined}
          >
            All <span className="opacity-70 ml-1">({products.length})</span>
          </button>
          {sublines.map((s) => (
            <button
              key={s.slug}
              onClick={() => setActive(s.slug)}
              className={clsx(
                'px-4 py-2 rounded-sm text-xs font-display font-bold uppercase tracking-wider border transition-all',
                active === s.slug
                  ? 'text-white border-transparent shadow-sm'
                  : 'bg-white border-line text-body hover:border-ink'
              )}
              style={active === s.slug ? { background: accentColor } : undefined}
            >
              {s.label} <span className="opacity-70 ml-1">({s.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active filter indicator */}
      {active && (
        <div className="mb-4 flex items-center gap-3 text-sm">
          <span className="text-body">
            Showing <strong className="text-ink font-display">{filtered.length}</strong>{' '}
            <strong className="text-ink font-display">
              {sublines.find((s) => s.slug === active)?.label}
            </strong>{' '}
            products
          </span>
          <button
            onClick={() => setActive(null)}
            className="text-price hover:underline font-display uppercase tracking-wider text-xs font-bold"
          >
            Clear filter
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  )
}
