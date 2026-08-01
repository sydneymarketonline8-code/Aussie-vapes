import Link from 'next/link'
import { requireAccount } from '@/lib/account-auth'
import { getFeaturedProducts } from '@/lib/storefront-products'
import ProductCard from '@/components/product/ProductCard'
import {
  ShoppingBagIcon,
  MapPinIcon,
  DocumentTextIcon,
  BellAlertIcon,
  TruckIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

export default async function AccountDashboardPage() {
  const session = await requireAccount()
  const memberSince = new Date(session.joinedAt).toLocaleDateString('en-AU', {
    month: 'long',
    year: 'numeric',
  })

  const recommended = await getFeaturedProducts(4)

  return (
    <div className="space-y-6">
      {/* Account summary */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-line rounded-sm p-5">
          <p className="font-display text-[10px] uppercase tracking-widest text-mute font-bold">Orders</p>
          <p className="font-display text-3xl font-bold text-ink mt-1">0</p>
          <p className="text-xs text-mute mt-1">No orders yet</p>
        </div>
        <div className="bg-white border border-line rounded-sm p-5">
          <p className="font-display text-[10px] uppercase tracking-widest text-mute font-bold">Saved Addresses</p>
          <p className="font-display text-3xl font-bold text-ink mt-1">0</p>
          <Link href="/account/addresses" className="text-xs text-price font-display font-bold uppercase tracking-wider hover:underline mt-1 inline-block">
            Add Address
          </Link>
        </div>
        <div className="bg-white border border-line rounded-sm p-5">
          <p className="font-display text-[10px] uppercase tracking-widest text-mute font-bold">Prescription</p>
          <p className="font-display text-xl font-bold text-warning mt-1">Not uploaded</p>
          <Link href="/account/prescription" className="text-xs text-price font-display font-bold uppercase tracking-wider hover:underline mt-1 inline-block">
            Upload Now
          </Link>
        </div>
        <div className="bg-white border border-line rounded-sm p-5">
          <p className="font-display text-[10px] uppercase tracking-widest text-mute font-bold">Member Since</p>
          <p className="font-display text-xl font-bold text-ink mt-1">{memberSince}</p>
          <p className="text-xs text-mute mt-1">Aussie Vape Hub member</p>
        </div>
      </section>

      {/* Recent orders */}
      <section className="bg-white border border-line rounded-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="font-display text-base font-bold text-ink uppercase tracking-wide flex items-center gap-2">
            <ShoppingBagIcon className="h-4 w-4 text-mute" />
            Recent Orders
          </h2>
          <Link
            href="/account/orders"
            className="font-display text-xs uppercase tracking-widest font-bold text-price hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="px-5 py-10 text-center">
          <ShoppingBagIcon className="h-12 w-12 mx-auto text-line mb-3" />
          <p className="font-display text-base font-bold text-ink uppercase tracking-wider mb-1">
            No orders yet
          </p>
          <p className="text-sm text-mute mb-5 max-w-sm mx-auto">
            When you place your first Aussie Vape Hub order it will appear here with full tracking and reorder options.
          </p>
          <Link href="/category/disposable-vapes" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="font-display text-sm font-bold text-mute uppercase tracking-widest mb-3">
          Account Quick Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { Icon: MapPinIcon, label: 'Manage Addresses', href: '/account/addresses' },
            { Icon: DocumentTextIcon, label: 'Upload Prescription', href: '/account/prescription' },
            { Icon: BellAlertIcon, label: 'Email Preferences', href: '/account/preferences' },
            { Icon: TruckIcon, label: 'Track an Order', href: '/track' },
          ].map(({ Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className="bg-white border border-line rounded-sm p-4 hover:border-ink hover:shadow-sm transition-all flex items-center gap-3 group"
            >
              <Icon className="h-5 w-5 text-ink flex-shrink-0" />
              <span className="font-display text-sm font-semibold text-ink uppercase tracking-wider flex-1 leading-tight">
                {label}
              </span>
              <ArrowRightIcon className="h-4 w-4 text-mute group-hover:text-price transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended */}
      {recommended.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-sm font-bold text-mute uppercase tracking-widest flex items-center gap-2">
              <CheckBadgeIcon className="h-4 w-4" />
              Recommended For You
            </h2>
            <Link
              href="/category/disposable-vapes"
              className="font-display text-xs uppercase tracking-widest font-bold text-price hover:underline"
            >
              Browse All →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {recommended.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
