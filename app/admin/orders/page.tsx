import AdminTopbar from '@/components/admin/AdminTopbar'
import OrdersTable from '@/components/admin/OrdersTable'
import { listAdminOrders } from '@/lib/admin-orders'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
  const orders = await listAdminOrders()
  return (
    <>
      <AdminTopbar
        title="Orders"
        subtitle={`${orders.length} order${orders.length === 1 ? '' : 's'} · most recent first`}
        actions={
          <a
            href="/admin/orders/export"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-line bg-white text-ink font-display text-xs font-bold uppercase tracking-wider hover:bg-soft-50"
          >
            <ArrowDownTrayIcon className="h-4 w-4" /> Export CSV
          </a>
        }
      />
      <div className="px-8 py-8">
        <OrdersTable orders={orders} />
      </div>
    </>
  )
}
