import AdminTopbar from '@/components/admin/AdminTopbar'
import OrdersTable from '@/components/admin/OrdersTable'
import { listAdminOrders } from '@/lib/admin-orders'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
  const orders = await listAdminOrders()
  return (
    <>
      <AdminTopbar
        title="Orders"
        subtitle={`${orders.length} order${orders.length === 1 ? '' : 's'} · most recent first`}
      />
      <div className="px-8 py-8">
        <OrdersTable orders={orders} />
      </div>
    </>
  )
}
