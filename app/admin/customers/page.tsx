import AdminTopbar from '@/components/admin/AdminTopbar'
import CustomersTable from '@/components/admin/CustomersTable'
import { CUSTOMERS, ORDERS } from '@/lib/admin-mock-data'

export default function AdminCustomersPage() {
  const ordersByCustomer = ORDERS.reduce<Record<string, typeof ORDERS>>((acc, o) => {
    if (!acc[o.customerId]) acc[o.customerId] = []
    acc[o.customerId].push(o)
    return acc
  }, {})

  return (
    <>
      <AdminTopbar
        title="Customers"
        subtitle={`${CUSTOMERS.length} registered customers`}
      />
      <div className="px-8 py-8">
        <CustomersTable customers={CUSTOMERS} ordersByCustomer={ordersByCustomer} />
      </div>
    </>
  )
}
