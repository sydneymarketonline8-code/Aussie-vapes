import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import AdminTopbar from '@/components/admin/AdminTopbar'
import {
  getOrderById,
  ORDER_STATUS_FLOW,
  type OrderStatus,
} from '@/lib/admin-mock-data'
import {
  ArrowLeftIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  HomeIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline'

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

const STATUS_ICON: Record<OrderStatus, typeof ClockIcon> = {
  pending: ClockIcon,
  confirmed: CheckCircleIcon,
  processing: Cog6ToothIcon,
  shipped: TruckIcon,
  delivered: HomeIcon,
  cancelled: ClockIcon,
}

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = getOrderById(id)
  if (!order) notFound()

  const statusIndex = ORDER_STATUS_FLOW.indexOf(order.status)
  const isCancelled = order.status === 'cancelled'

  return (
    <>
      <AdminTopbar
        title={`Order ${order.number}`}
        subtitle={`Placed ${new Date(order.placedAt).toLocaleString('en-AU')}`}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-line bg-white text-ink font-display text-xs font-bold uppercase tracking-wider hover:bg-soft-50"
            >
              <ArrowLeftIcon className="h-4 w-4" /> All Orders
            </Link>
            <button
              type="button"
              disabled
              title="Requires backend"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-line bg-white text-mute font-display text-xs font-bold uppercase tracking-wider cursor-not-allowed"
            >
              <PrinterIcon className="h-4 w-4" /> Invoice
            </button>
            <button
              type="button"
              disabled
              title="Requires backend"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm bg-ink text-white font-display text-xs font-bold uppercase tracking-wider cursor-not-allowed"
            >
              <EnvelopeIcon className="h-4 w-4" /> Email Customer
            </button>
          </div>
        }
      />

      <div className="px-8 py-8 space-y-6">
        {/* Status timeline */}
        <div className="bg-white border border-line rounded-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
              Order Progress
            </h3>
            <form className="flex items-center gap-2">
              <label htmlFor="status" className="font-display text-[11px] uppercase tracking-wider text-mute font-bold">
                Update Status
              </label>
              <select
                id="status"
                disabled
                defaultValue={order.status}
                title="Requires backend"
                className="bg-white border border-line rounded-sm px-3 py-1.5 text-xs text-body focus:outline-none disabled:bg-soft-50 disabled:text-mute disabled:cursor-not-allowed"
              >
                {(Object.keys(STATUS_LABEL) as OrderStatus[]).map((s) => (
                  <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                ))}
              </select>
            </form>
          </div>

          {isCancelled ? (
            <div className="px-4 py-3 rounded-sm bg-price/10 border border-price/30 text-price text-sm font-display font-bold uppercase tracking-wider">
              Order Cancelled
            </div>
          ) : (
            <ol className="flex items-center justify-between gap-2">
              {ORDER_STATUS_FLOW.map((s, i) => {
                const reached = i <= statusIndex
                const current = i === statusIndex
                const Icon = STATUS_ICON[s]
                return (
                  <li key={s} className="flex-1 flex items-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={`h-10 w-10 rounded-full border-2 flex items-center justify-center ${
                          reached
                            ? 'bg-success border-success text-white'
                            : 'bg-white border-line text-mute'
                        } ${current ? 'ring-4 ring-success/20' : ''}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`font-display text-[10px] uppercase tracking-wider font-bold ${
                          reached ? 'text-ink' : 'text-mute'
                        }`}
                      >
                        {STATUS_LABEL[s]}
                      </span>
                    </div>
                    {i < ORDER_STATUS_FLOW.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 ${
                          i < statusIndex ? 'bg-success' : 'bg-line'
                        }`}
                      />
                    )}
                  </li>
                )
              })}
            </ol>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items + totals */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-line rounded-sm">
              <div className="px-5 py-4 border-b border-line">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                  Items ({order.itemsCount})
                </h3>
              </div>
              <ul className="divide-y divide-line">
                {order.items.map((it, i) => (
                  <li key={`${it.productSlug}-${i}`} className="flex items-center gap-4 px-5 py-4">
                    <div className="relative h-14 w-14 flex-shrink-0 bg-soft-100 border border-line rounded-sm overflow-hidden">
                      <Image
                        src={it.productImage}
                        alt={it.productName}
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/admin/products/${it.productSlug}`}
                        className="font-display font-semibold text-ink hover:text-price line-clamp-2"
                      >
                        {it.productName}
                      </Link>
                      <p className="text-xs text-mute mt-0.5">
                        ${it.unitPrice.toFixed(2)} × {it.quantity}
                      </p>
                    </div>
                    <div className="font-display font-bold text-ink">
                      ${it.lineTotal.toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-5 py-4 border-t border-line bg-soft-50 space-y-1 text-sm">
                <div className="flex justify-between text-body">
                  <span>Subtotal</span>
                  <span className="font-display">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-body">
                  <span>Shipping</span>
                  <span className="font-display">
                    {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span className="font-display">− ${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-ink font-display font-bold text-base pt-2 border-t border-line">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Tracking */}
            <div className="bg-white border border-line rounded-sm p-5">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-3 flex items-center gap-2">
                <TruckIcon className="h-4 w-4 text-mute" />
                Tracking
              </h3>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-1">
                    Carrier
                  </label>
                  <select
                    disabled
                    defaultValue={order.tracking?.carrier ?? ''}
                    title="Requires backend"
                    className="w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body disabled:bg-soft-50 disabled:text-mute"
                  >
                    <option value="">Select carrier…</option>
                    <option value="AusPost">AusPost</option>
                    <option value="Sendle">Sendle</option>
                    <option value="Couriers Please">Couriers Please</option>
                    <option value="Aramex">Aramex</option>
                  </select>
                </div>
                <div>
                  <label className="block font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-1">
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    disabled
                    defaultValue={order.tracking?.number ?? ''}
                    placeholder="e.g. AU1234567890"
                    className="w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body disabled:bg-soft-50 disabled:text-mute"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="button"
                    disabled
                    title="Requires backend"
                    className="px-4 py-2 rounded-sm bg-price/70 text-white font-display text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                  >
                    Save & Notify Customer
                  </button>
                </div>
              </form>
            </div>

            {/* Internal notes */}
            <div className="bg-white border border-line rounded-sm p-5">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-3">
                Internal Notes
              </h3>
              <textarea
                rows={4}
                disabled
                defaultValue={order.notes ?? ''}
                placeholder="Visible only to staff — not shown to the customer."
                className="w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body disabled:bg-soft-50 disabled:text-mute"
              />
            </div>
          </div>

          {/* Customer + shipping */}
          <aside className="space-y-4">
            <div className="bg-white border border-line rounded-sm p-5">
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-mute mb-3">
                Customer
              </h3>
              <Link
                href={`/admin/customers/${order.customerId}`}
                className="font-display font-bold text-ink hover:text-price block"
              >
                {order.customerName}
              </Link>
              <p className="text-xs text-mute mt-0.5">{order.customerEmail}</p>
              <Link
                href={`/admin/customers/${order.customerId}`}
                className="mt-3 inline-block font-display text-[11px] uppercase tracking-widest font-bold text-price hover:underline"
              >
                View customer →
              </Link>
            </div>

            <div className="bg-white border border-line rounded-sm p-5">
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-mute mb-3">
                Shipping Address
              </h3>
              <address className="not-italic text-sm text-body leading-relaxed">
                <strong className="text-ink font-display">{order.shippingAddress.name}</strong>
                <br />
                {order.shippingAddress.line1}
                <br />
                {order.shippingAddress.suburb} {order.shippingAddress.state}{' '}
                {order.shippingAddress.postcode}
                <br />
                {order.shippingAddress.country}
              </address>
            </div>

            <div className="bg-white border border-line rounded-sm p-5">
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-mute mb-3">
                Payment
              </h3>
              <p className="text-sm text-body">PayID or Bitcoin · <span className="text-mute">manual verification</span></p>
              <p className="text-xs text-mute mt-1">
                Match the reference code on the order to the incoming transfer, then mark this order as Paid.
              </p>
              <p className="text-xs text-amber-700 font-display font-bold uppercase tracking-wider mt-2">
                ⌛ Awaiting payment · ${order.total.toFixed(2)}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
