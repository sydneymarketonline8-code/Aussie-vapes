'use client'

import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'
import { BRANDS } from '@/lib/brands'
import { PACK_GROUPS } from '@/lib/packs'
import { PUFF_RANGES } from '@/lib/puff-ranges'
import clsx from 'clsx'

interface MegaMenuProps {
  isOpen: boolean
}

export default function MegaMenu({ isOpen }: MegaMenuProps) {
  // Top 12 brands by product count would be ideal but compute is expensive on every render — use curated featured list
  const featuredBrands = BRANDS.slice(0, 12)

  return (
    <div
      className={clsx(
        'absolute top-full left-0 right-0 z-40 bg-white border-t border-b border-line shadow-xl transition-all duration-200',
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      )}
    >
      <div className="container-site py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Categories column */}
          <div className="col-span-12 lg:col-span-3">
            <p className="font-display text-[11px] uppercase tracking-[0.3em] text-price font-bold mb-3">
              Shop By Category
            </p>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="font-display font-bold text-sm text-ink hover:text-price uppercase tracking-wider block py-1"
                  >
                    {cat.name}
                    <span className="text-mute font-normal text-xs normal-case tracking-normal ml-1">
                      ({cat.productCount.toLocaleString()})
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-line mt-3">
                <Link href="/new-arrivals" className="text-xs text-success font-display uppercase tracking-wider font-bold">
                  New Arrivals →
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-xs text-price font-display uppercase tracking-wider font-bold">
                  Sale →
                </Link>
              </li>
            </ul>
          </div>

          {/* Brands column (wide) */}
          <div className="col-span-12 lg:col-span-6">
            <p className="font-display text-[11px] uppercase tracking-[0.3em] text-price font-bold mb-3">
              Top VapeHub Vapes Australia Brands
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
              {featuredBrands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/brand/${b.slug}`}
                  className="font-display font-bold text-sm text-ink hover:text-price uppercase tracking-wider block py-1"
                  style={{ color: b.accentColor }}
                >
                  {b.displayName}
                </Link>
              ))}
            </div>
            <Link
              href="/brands"
              className="inline-block mt-3 text-xs text-ink font-display uppercase tracking-wider font-bold hover:text-price"
            >
              See All {BRANDS.length} VapeHub Vapes Australia Brands →
            </Link>

            {/* Shop by Puff Count strip */}
            <div className="mt-5 pt-4 border-t border-line">
              <p className="font-display text-[11px] uppercase tracking-[0.3em] text-price font-bold mb-3">
                Shop by Puff Count
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {PUFF_RANGES.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/puffs/${r.slug}`}
                    className="font-display text-sm font-semibold text-body hover:text-price py-1 flex items-center gap-2"
                  >
                    <r.icon className="h-4 w-4 text-ink" />
                    <span>{r.shortName} Puffs</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Packs + Locations */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <div>
              <p className="font-display text-[11px] uppercase tracking-[0.3em] text-price font-bold mb-3">
                Vape Packs
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/packs" className="text-sm font-display font-bold uppercase tracking-wider text-ink hover:text-price">
                    All Vape Packs →
                  </Link>
                </li>
                {PACK_GROUPS.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/packs/${g.slug}`} className="text-sm text-body hover:text-price">
                      {g.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-line">
              <p className="font-display text-[11px] uppercase tracking-[0.3em] text-price font-bold mb-3">
                VapeHub Vapes Australia Locations &amp; Resources
              </p>
              <ul className="space-y-1.5">
                <li><Link href="/vapehub-vapes-australia/sydney" className="text-sm text-body hover:text-price">VapeHub Vapes Australia Sydney</Link></li>
                <li><Link href="/vapehub-vapes-australia/melbourne" className="text-sm text-body hover:text-price">VapeHub Vapes Australia Melbourne</Link></li>
                <li><Link href="/vapehub-vapes-australia/brisbane" className="text-sm text-body hover:text-price">VapeHub Vapes Australia Brisbane</Link></li>
                <li><Link href="/beginners-guide" className="text-sm text-body hover:text-price">Beginner&apos;s Guide</Link></li>
                <li><Link href="/vaping-laws-australia" className="text-sm text-body hover:text-price">AU Vaping Laws</Link></li>
                <li><Link href="/faq" className="text-sm text-body hover:text-price">FAQ</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-6 pt-6 border-t border-line grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Bulk & Wholesale', href: '/bulk' },
            { label: 'Track Order', href: '/track' },
            { label: 'Shipping Info', href: '/shipping' },
            { label: 'Contact Support', href: '/contact' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-center px-4 py-2.5 rounded-sm bg-soft-100 hover:bg-ink hover:text-white text-sm font-display font-semibold text-ink uppercase tracking-wider transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
