import AdminTopbar from '@/components/admin/AdminTopbar'
import CouponsModule from '@/components/admin/CouponsModule'
import { listAdminCoupons } from '@/lib/admin-coupons'

export const dynamic = 'force-dynamic'

export default async function AdminCouponsPage() {
  const coupons = await listAdminCoupons()
  return (
    <>
      <AdminTopbar
        title="Coupons"
        subtitle="Discount codes and promotional rules"
      />
      <div className="px-8 py-8">
        <CouponsModule coupons={coupons} />
      </div>
    </>
  )
}
