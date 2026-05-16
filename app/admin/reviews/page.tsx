import AdminTopbar from '@/components/admin/AdminTopbar'
import ReviewsModeration from '@/components/admin/ReviewsModeration'
import { REVIEWS } from '@/lib/admin-mock-data'

export default function AdminReviewsPage() {
  const pendingCount = REVIEWS.filter((r) => r.status === 'pending').length
  return (
    <>
      <AdminTopbar
        title="Reviews"
        subtitle={`${pendingCount} pending moderation · ${REVIEWS.length} total`}
      />
      <div className="px-8 py-8">
        <ReviewsModeration reviews={REVIEWS} />
      </div>
    </>
  )
}
