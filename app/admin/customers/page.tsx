import AdminTopbar from '@/components/admin/AdminTopbar'
import CustomersTable from '@/components/admin/CustomersTable'
import { listAdminCustomers } from '@/lib/admin-customers'

export const dynamic = 'force-dynamic'

export default async function AdminCustomersPage() {
  const customers = await listAdminCustomers()
  return (
    <>
      <AdminTopbar
        title="Customers"
        subtitle={`${customers.length} registered customer${customers.length === 1 ? '' : 's'}`}
      />
      <div className="px-8 py-8">
        <CustomersTable customers={customers} />
      </div>
    </>
  )
}
