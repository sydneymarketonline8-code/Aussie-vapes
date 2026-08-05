import Link from 'next/link'
import { requireAccount } from '@/lib/account-auth'
import { ShoppingBagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default async function AccountOrdersPage() {
  await requireAccount()

  return (
    <div className="space-y-5">
      <header className="bg-white border border-line rounded-sm p-5">
        <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide">
          Order History
        </h2>
        <p className="text-sm text-mute mt-1">
          Every VapeHub Vapes Australia order you place will appear here. Track shipments, download invoices, and reorder favourites in one tap.
        </p>
      </header>

      <div className="bg-white border border-line rounded-sm">
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-line">
          <div className="relative flex-1 min-w-[200px]">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" />
            <input
              type="search"
              placeholder="Search by order number, product or date…"
              className="w-full bg-white border border-line rounded-sm pl-9 pr-3 py-2 text-sm text-body placeholder:text-mute focus:outline-none focus:border-ink"
            />
          </div>
          <select
            aria-label="Filter by status"
            defaultValue="all"
            className="bg-white border border-line rounded-sm px-3 py-2 text-sm text-body focus:outline-none focus:border-ink"
          >
            <option value="all">All orders</option>
            <option value="processing">Processing</option>
            <option value="dispatched">Dispatched</option>
            <option value="delivered">Delivered</option>
            <option value="returned">Returned</option>
          </select>
        </div>
        <div className="px-5 py-16 text-center">
          <ShoppingBagIcon className="h-14 w-14 mx-auto text-line mb-4" />
          <p className="font-display text-lg font-bold text-ink uppercase tracking-wider mb-2">
            No orders yet
          </p>
          <p className="text-sm text-mute mb-6 max-w-md mx-auto">
            Once you place your first VapeHub Vapes Australia order it will land here. You can re-order any past purchase
            in two taps from this page.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/category/disposable-vapes" className="btn-primary">
              Browse Disposables
            </Link>
            <Link href="/brands" className="btn-secondary">
              All Brands
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-soft-100 border border-line rounded-sm p-5 text-sm text-body">
        Have a guest order from before signing up?{' '}
        <Link href="/track" className="text-price font-semibold hover:underline">
          Track an order
        </Link>{' '}
        with your order number and email — no account required.
      </div>
    </div>
  )
}
