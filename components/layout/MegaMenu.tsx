'use client'

import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'
import clsx from 'clsx'

interface MegaMenuProps {
  isOpen: boolean
}

export default function MegaMenu({ isOpen }: MegaMenuProps) {
  return (
    <div
      className={clsx(
        'absolute top-full left-0 right-0 z-40 bg-surface-800 border-t border-b border-surface-600 shadow-2xl transition-all duration-200',
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      )}
    >
      <div className="container-site py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <Link
                href={`/category/${cat.slug}`}
                className="block text-sm font-semibold text-brand mb-3 hover:text-brand-light transition-colors"
              >
                {cat.name}
              </Link>
              <p className="text-xs text-zinc-500 mb-3 leading-relaxed">{cat.description}</p>
              <ul className="space-y-1">
                {cat.subcategories.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={`/category/${cat.slug}?sub=${sub.slug}`}
                      className="mega-menu-item"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="mega-menu-item text-brand text-xs font-medium mt-2 flex items-center gap-1"
                  >
                    View all {cat.name} →
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-surface-600 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: '🔥 Best Sellers', href: '/category/disposable-vapes' },
            { label: '🆕 New Arrivals', href: '/new-arrivals' },
            { label: '💸 On Sale', href: '/sale' },
            { label: '📦 Bulk Orders', href: '/bulk' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-center px-4 py-2.5 rounded-lg bg-surface-700 hover:bg-surface-600 text-sm text-zinc-300 hover:text-zinc-100 transition-colors border border-surface-500"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
