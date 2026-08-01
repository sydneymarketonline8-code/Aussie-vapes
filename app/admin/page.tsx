import Link from 'next/link'
import Image from 'next/image'
import AdminTopbar from '@/components/admin/AdminTopbar'
import AdminKpiCard from '@/components/admin/AdminKpiCard'
import {
  getDashboardKpis,
  getRecentOrders,
  getLowStockProducts,
} from '@/lib/admin-dashboard'
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
  CalculatorIcon,
  BoltIcon,
  EyeIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

export const dynamic = 'force-dynamic'

function formatAUD(n: number, opts: Intl.NumberFormatOptions = {}): string {
  return `$${n.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0, ...opts })}`
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-warning/15 text-warning',
  confirmed: 'bg-info/15 text-info',
  processing: 'bg-info/15 text-info',
  shipped: 'bg-success/15 text-success',
  delivered: 'bg-success/15 text-success',
  cancelled: 'bg-price/15 text-price',
  refunded: 'bg-price/15 text-price',
}

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
}

export default async function AdminDashboardPage() {
  const [kpis, recent, lowStock] = await Promise.all([
    getDashboardKpis(),
    getRecentOrders(10),
    getLowStockProducts(8),
  ])

  return (
    <>
      <AdminTopbar title="Dashboard" subtitle="Aussie Vape Hub — operational overview" />

      <div className="px-8 py-8 space-y-8">
        {/* KPI cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminKpiCard
            label="Revenue (MTD)"
            value={formatAUD(kpis.revenue.thisMonth)}
            previousValue={formatAUD(kpis.revenue.lastMonth)}
            percentChange={kpis.revenue.percentChange}
            Icon={CurrencyDollarIcon}
            accent="#4cbb6c"
          />
          <AdminKpiCard
            label="Orders (MTD)"
            value={kpis.orders.thisMonth.toLocaleString()}
            previousValue={kpis.orders.lastMonth.toLocaleString()}
            percentChange={kpis.orders.percentChange}
            Icon={ShoppingBagIcon}
            accent="#2fb5d2"
          />
          <AdminKpiCard
            label="New Customers"
            value={kpis.newCustomers.thisMonth.toLocaleString()}
            previousValue={kpis.newCustomers.lastMonth.toLocaleString()}
            percentChange={kpis.newCustomers.percentChange}
            Icon={UsersIcon}
            accent="#ff9a52"
          />
          <AdminKpiCard
            label="Avg Order Value"
            value={formatAUD(kpis.avgOrderValue.thisMonth, { maximumFractionDigits: 2 })}
            previousValue={formatAUD(kpis.avgOrderValue.lastMonth, { maximumFractionDigits: 2 })}
            percentChange={kpis.avgOrderValue.percentChange}
            Icon={CalculatorIcon}
            accent="#3b3b3b"
          />
        </section>

        {/* Recent orders + Low stock */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-line rounded-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <h3 className="font-display text-base font-bold text-ink uppercase tracking-wide flex items-center gap-2">
                <ShoppingBagIcon className="h-4 w-4 text-mute" />
                Recent Orders
              </h3>
              <Link
                href="/admin/orders"
                className="font-display text-xs uppercase tracking-widest font-bold text-price hover:underline inline-flex items-center gap-1"
              >
                All Orders <ArrowRightIcon className="h-3 w-3" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-soft-50 text-mute font-display uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-5 py-2.5 text-left">Order</th>
                    <th className="px-5 py-2.5 text-left">Customer</th>
                    <th className="px-5 py-2.5 text-left">Status</th>
                    <th className="px-5 py-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {recent.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-mute text-sm">
                        No orders yet.
                      </td>
                    </tr>
                  )}
                  {recent.map((o) => (
                    <tr key={o.id} className="hover:bg-soft-50">
                      <td className="px-5 py-3">
                        <Link
                          href={`/admin/orders/${o.id}`}
                          className="font-display font-bold text-ink hover:text-price"
                        >
                          {o.number}
                        </Link>
                        <p className="text-[11px] text-mute font-display uppercase tracking-wider">
                          {new Date(o.placedAt).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })}
                          {' · '}
                          {o.itemsCount} {o.itemsCount === 1 ? 'item' : 'items'}
                        </p>
                      </td>
                      <td className="px-5 py-3">
                        <p className="font-display font-semibold text-ink">{o.customerName}</p>
                        {(o.customerCity || o.customerState) && (
                          <p className="text-[11px] text-mute">
                            {[o.customerCity, o.customerState].filter(Boolean).join(', ')}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-sm text-[11px] font-display font-bold uppercase tracking-wider ${STATUS_STYLES[o.status] ?? 'bg-soft-200 text-mute'}`}
                        >
                          {STATUS_LABEL[o.status] ?? o.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right font-display font-bold text-ink">
                        ${o.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-line rounded-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <h3 className="font-display text-base font-bold text-ink uppercase tracking-wide flex items-center gap-2">
                <BoltIcon className="h-4 w-4 text-warning" />
                Low Stock
              </h3>
              <Link
                href="/admin/inventory"
                className="font-display text-xs uppercase tracking-widest font-bold text-price hover:underline inline-flex items-center gap-1"
              >
                Inventory <ArrowRightIcon className="h-3 w-3" />
              </Link>
            </div>
            {lowStock.length === 0 ? (
              <p className="px-5 py-8 text-sm text-mute text-center">No low-stock items right now.</p>
            ) : (
              <ul className="divide-y divide-line">
                {lowStock.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/admin/products/${p.slug}`}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-soft-50 transition-colors"
                    >
                      <div className="relative h-10 w-10 flex-shrink-0 bg-soft-100 border border-line rounded-sm overflow-hidden">
                        {p.imageUrl ? (
                          <Image
                            src={p.imageUrl}
                            alt={p.name}
                            fill
                            sizes="40px"
                            className="object-contain p-1"
                            unoptimized
                          />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-sm font-semibold text-ink line-clamp-1">{p.name}</p>
                        {p.brandName && <p className="text-[11px] text-mute">{p.brandName}</p>}
                      </div>
                      <span className="font-display font-bold text-warning text-sm whitespace-nowrap">
                        {p.stockCount} left
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Footer row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-line rounded-sm p-5">
            <h3 className="font-display text-xs font-bold text-mute uppercase tracking-widest mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/admin/products/new" className="block px-3 py-2 rounded-sm border border-line hover:border-ink hover:bg-soft-50 font-display font-bold text-ink uppercase tracking-wider text-xs">
                + New Product
              </Link>
              <Link href="/admin/coupons" className="block px-3 py-2 rounded-sm border border-line hover:border-ink hover:bg-soft-50 font-display font-bold text-ink uppercase tracking-wider text-xs">
                + Coupon
              </Link>
              <Link href="/admin/orders" className="block px-3 py-2 rounded-sm border border-line hover:border-ink hover:bg-soft-50 font-display font-bold text-ink uppercase tracking-wider text-xs">
                View Orders
              </Link>
              <Link href="/admin/reviews" className="block px-3 py-2 rounded-sm border border-line hover:border-ink hover:bg-soft-50 font-display font-bold text-ink uppercase tracking-wider text-xs">
                Moderate Reviews
              </Link>
            </div>
          </div>

          <div className="bg-ink text-white rounded-sm p-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xs font-bold text-white/60 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <EyeIcon className="h-3.5 w-3.5" />
                Public Site
              </h3>
              <p className="text-white/80 text-sm">
                Preview Aussie Vape Hub as a customer sees it.
              </p>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-price text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-sale transition-colors whitespace-nowrap"
            >
              Open Live Site
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
