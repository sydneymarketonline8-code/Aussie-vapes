import { getSupabasePublicClient } from '@/lib/supabase/public'

export interface PublicReview {
  id: string
  rating: number
  title: string | null
  body: string
  reviewerName: string
  createdAt: string
  isVerifiedBuyer: boolean
}

/** Approved, non-deleted reviews for a single product. */
export async function listApprovedReviews(productId: string, limit = 20): Promise<PublicReview[]> {
  const supabase = getSupabasePublicClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('id, rating, title, body, reviewer_name, created_at, is_verified_buyer')
    .eq('product_id', productId)
    .eq('status', 'approved')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[listApprovedReviews] query failed', error)
    return []
  }
  return (data ?? []).map((r): PublicReview => ({
    id: r.id,
    rating: r.rating,
    title: r.title,
    body: r.body,
    reviewerName: r.reviewer_name,
    createdAt: r.created_at,
    isVerifiedBuyer: !!r.is_verified_buyer,
  }))
}
