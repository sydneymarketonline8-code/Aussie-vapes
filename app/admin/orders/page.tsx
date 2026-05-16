import AdminTopbar from '@/components/admin/AdminTopbar'
import OrdersTable from '@/components/admin/OrdersTable'
import { ORDERS } from '@/lib/admin-mock-data'

export default function AdminOrdersPage() {
  return (
    <>
      <AdminTopbar
        title="Orders"
        subtitle={`${ORDERS.length} orders · last 14 days`}
      />
      <div className="px-8 py-8">
        <OrdersTable orders={ORDERS} />
      </div>
    </>
  )
}
