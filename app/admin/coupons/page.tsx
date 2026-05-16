import AdminTopbar from '@/components/admin/AdminTopbar'
import CouponsModule from '@/components/admin/CouponsModule'
import { COUPONS } from '@/lib/admin-mock-data'

export default function AdminCouponsPage() {
  return (
    <>
      <AdminTopbar
        title="Coupons"
        subtitle="Discount codes and promotional rules"
      />
      <div className="px-8 py-8">
        <CouponsModule coupons={COUPONS} />
      </div>
    </>
  )
}
