'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { accountLogout } from '@/lib/account-auth'
import {
  HomeIcon,
  ShoppingBagIcon,
  MapPinIcon,
  UserIcon,
  DocumentTextIcon,
  BellAlertIcon,
  ArrowRightOnRectangleIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'

const NAV = [
  { label: 'Dashboard', href: '/account', Icon: HomeIcon },
  { label: 'Orders', href: '/account/orders', Icon: ShoppingBagIcon },
  { label: 'Addresses', href: '/account/addresses', Icon: MapPinIcon },
  { label: 'Profile', href: '/account/profile', Icon: UserIcon },
  { label: 'Prescription', href: '/account/prescription', Icon: DocumentTextIcon },
  { label: 'Preferences', href: '/account/preferences', Icon: BellAlertIcon },
  { label: 'Wishlist', href: '/wishlist', Icon: HeartIcon },
]

interface AccountSidebarProps {
  firstName: string
  lastName: string
  email: string
}

export default function AccountSidebar({ firstName, lastName, email }: AccountSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="space-y-5">
      {/* Customer card */}
      <div className="bg-white border border-line rounded-sm p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-12 w-12 rounded-full bg-ink text-white flex items-center justify-center font-display font-bold text-base flex-shrink-0">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-ink text-sm leading-tight">
              {firstName} {lastName}
            </p>
            <p className="text-xs text-mute truncate">{email}</p>
          </div>
        </div>
        <p className="font-display text-[10px] uppercase tracking-widest text-success font-bold flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
          Signed in
        </p>
      </div>

      {/* Nav */}
      <nav className="bg-white border border-line rounded-sm overflow-hidden">
        <ul className="divide-y divide-line">
          {NAV.map(({ label, href, Icon }) => {
            const active =
              href === '/account' ? pathname === '/account' : pathname.startsWith(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 text-sm font-display font-semibold uppercase tracking-wider transition-colors',
                    active
                      ? 'bg-ink text-white'
                      : 'text-body hover:bg-soft-100 hover:text-ink'
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

      {/* Logout */}
      <form action={accountLogout}>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-white border border-line text-body hover:border-price hover:text-price font-display text-sm font-semibold uppercase tracking-wider transition-colors"
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          Sign Out
        </button>
      </form>
    </aside>
  )
}
