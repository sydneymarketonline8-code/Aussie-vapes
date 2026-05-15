'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
  HomeIcon,
  CubeIcon,
  TagIcon,
  RectangleStackIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'

const NAV = [
  { label: 'Dashboard', href: '/admin', Icon: HomeIcon },
  { label: 'Products', href: '/admin/products', Icon: CubeIcon },
  { label: 'Brands', href: '/admin/brands', Icon: TagIcon },
  { label: 'Categories', href: '/admin/categories', Icon: RectangleStackIcon },
  { label: 'Inventory', href: '/admin/inventory', Icon: ChartBarIcon },
  { label: 'Orders', href: '/admin/orders', Icon: ShoppingBagIcon },
  { label: 'Customers', href: '/admin/customers', Icon: UsersIcon },
  { label: 'Settings', href: '/admin/settings', Icon: Cog6ToothIcon },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-ink-dark text-white flex flex-col z-30">
      <Link href="/admin" className="block px-5 py-5 border-b border-white/10">
        <span className="font-display text-lg font-bold tracking-tight leading-none">
          AUSSIE <span className="text-price">VAPES</span>
        </span>
        <span className="block text-[10px] tracking-[0.3em] text-white/50 font-display font-semibold mt-1">
          ADMIN CONSOLE
        </span>
      </Link>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-0.5 px-3">
          {NAV.map(({ label, href, Icon }) => {
            const active =
              href === '/admin'
                ? pathname === '/admin'
                : pathname === href || pathname.startsWith(`${href}/`)
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-display font-semibold uppercase tracking-wider transition-colors',
                    active
                      ? 'bg-price text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          rel="noopener"
          className="flex items-center gap-3 px-3 py-2 rounded-sm text-xs font-display uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          View Public Site
        </Link>
      </div>
    </aside>
  )
}
