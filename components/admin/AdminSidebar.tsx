'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
  HomeIcon,
  CubeIcon,
  RectangleStackIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  TicketIcon,
  ShareIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  TruckIcon,
  CreditCardIcon,
  ArrowTopRightOnSquareIcon,
  ArrowRightOnRectangleIcon,
  TagIcon,
} from '@heroicons/react/24/outline'
import { logout } from '@/lib/admin-auth'

interface NavItem {
  label: string
  href: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Overview',
    items: [{ label: 'Dashboard', href: '/admin', Icon: HomeIcon }],
  },
  {
    title: 'Catalog',
    items: [
      { label: 'Products', href: '/admin/products', Icon: CubeIcon },
      { label: 'Categories', href: '/admin/categories', Icon: RectangleStackIcon },
      { label: 'Brands', href: '/admin/brands', Icon: TagIcon },
      { label: 'Inventory', href: '/admin/inventory', Icon: ChartBarIcon },
    ],
  },
  {
    title: 'Sales',
    items: [
      { label: 'Orders', href: '/admin/orders', Icon: ShoppingBagIcon },
      { label: 'Coupons', href: '/admin/coupons', Icon: TicketIcon },
      { label: 'Affiliate', href: '/admin/affiliate', Icon: ShareIcon },
    ],
  },
  {
    title: 'Customers',
    items: [
      { label: 'Users', href: '/admin/customers', Icon: UsersIcon },
      { label: 'Reviews', href: '/admin/reviews', Icon: ChatBubbleLeftRightIcon },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'General', href: '/admin/settings', Icon: Cog6ToothIcon },
      { label: 'Shipping', href: '/admin/shipping', Icon: TruckIcon },
      { label: 'Payments', href: '/admin/payments', Icon: CreditCardIcon },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-neutral-900 text-white flex flex-col z-30">
      {/* Logo */}
      <Link href="/admin" className="block px-5 py-5 border-b border-white/10">
        <span className="font-display text-lg font-bold tracking-tight leading-none">
          VAPES <span className="text-price">AUSTRALIA</span>
        </span>
        <span className="block text-[10px] tracking-[0.3em] text-white/50 font-display font-semibold mt-1">
          ADMIN PANEL
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-5">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="px-5 mb-2 font-display text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold">
              {section.title}
            </p>
            <ul className="space-y-0.5 px-3">
              {section.items.map(({ label, href, Icon }) => {
                const active =
                  href === '/admin'
                    ? pathname === '/admin'
                    : pathname === href || pathname.startsWith(`${href}/`)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={clsx(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-display font-semibold tracking-wide transition-colors',
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
          </div>
        ))}
      </nav>

      {/* Footer: view site + sign out */}
      <div className="px-3 py-3 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          rel="noopener"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-xs font-display uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          View Public Site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-display uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
