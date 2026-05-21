import AdminTopbar from '@/components/admin/AdminTopbar'
import ReviewsModeration from '@/components/admin/ReviewsModeration'
import { listAdminReviews } from '@/lib/admin-reviews'

export const dynamic = 'force-dynamic'

export default async function AdminReviewsPage() {
  const reviews = await listAdminReviews()
  const pendingCount = reviews.filter((r) => r.status === 'pending').length
  return (
    <>
      <AdminTopbar
        title="Reviews"
        subtitle={`${pendingCount} pending moderation · ${reviews.length} total`}
      />
      <div className="px-8 py-8">
        <ReviewsModeration reviews={reviews} />
      </div>
    </>
  )
}
