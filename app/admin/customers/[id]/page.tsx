import Link from 'next/link'
import { notFound } from 'next/navigation'
import AdminTopbar from '@/components/admin/AdminTopbar'
import {
  getCustomerById,
  getOrdersByCustomer,
  type OrderStatus,
} from '@/lib/admin-mock-data'
import { ArrowLeftIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'bg-warning/15 text-warning',
  confirmed: 'bg-info/15 text-info',
  processing: 'bg-info/15 text-info',
  shipped: 'bg-success/15 text-success',
  delivered: 'bg-success/15 text-success',
  cancelled: 'bg-price/15 text-price',
}

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const customer = getCustomerById(id)
  if (!customer) notFound()
  const orders = getOrdersByCustomer(id)

  return (
    <>
      <AdminTopbar
        title={`${customer.firstName} ${customer.lastName}`}
        subtitle={customer.email}
        actions={
          <Link
            href="/admin/customers"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-line bg-white text-ink font-display text-xs font-bold uppercase tracking-wider hover:bg-soft-50"
          >
            <ArrowLeftIcon className="h-4 w-4" /> All Customers
          </Link>
        }
      />

      <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="bg-white border border-line rounded-sm p-5 space-y-4">
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-widest text-mute mb-3">
              Contact
            </h3>
            <p className="flex items-center gap-2 text-sm text-body">
              <EnvelopeIcon className="h-4 w-4 text-mute" />
              {customer.email}
            </p>
            <p className="flex items-center gap-2 text-sm text-body mt-1.5">
              <MapPinIcon className="h-4 w-4 text-mute" />
              {customer.city}, {customer.state}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-line">
            <div className="text-center">
              <p className="font-display text-[10px] uppercase tracking-widest font-bold text-mute">Orders</p>
              <p className="font-display text-xl font-bold text-ink mt-1">{customer.ordersCount}</p>
            </div>
            <div className="text-center">
              <p className="font-display text-[10px] uppercase tracking-widest font-bold text-mute">Spent</p>
              <p className="font-display text-xl font-bold text-ink mt-1">${customer.totalSpent.toFixed(0)}</p>
            </div>
            <div className="text-center">
              <p className="font-display text-[10px] uppercase tracking-widest font-bold text-mute">AOV</p>
              <p className="font-display text-xl font-bold text-ink mt-1">
                ${customer.ordersCount > 0 ? (customer.totalSpent / customer.ordersCount).toFixed(0) : '0'}
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-line text-xs text-mute font-display uppercase tracking-wider">
            Joined {new Date(customer.joinedAt).toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </aside>

        <div className="lg:col-span-2 bg-white border border-line rounded-sm">
          <div className="px-5 py-4 border-b border-line">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
              Order History ({orders.length})
            </h3>
          </div>
          {orders.length === 0 ? (
            <p className="px-5 py-12 text-center text-mute text-sm">No orders yet.</p>
          ) : (
            <ul className="divide-y divide-line">
              {orders.map((o) => (
                <li key={o.id}>
                  <Link
                    href={`/admin/orders/${o.id}`}
                    className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-soft-50"
                  >
                    <div>
                      <p className="font-display font-bold text-ink">{o.number}</p>
                      <p className="text-[11px] text-mute font-display uppercase tracking-wider">
                        {new Date(o.placedAt).toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' })}
                        {' · '}
                        {o.itemsCount} items
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-sm text-[11px] font-display font-bold uppercase tracking-wider ${STATUS_STYLES[o.status]}`}
                      >
                        {o.status}
                      </span>
                      <span className="font-display font-bold text-ink">${o.total.toFixed(2)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
