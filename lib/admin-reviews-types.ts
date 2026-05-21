export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export interface AdminReview {
  id: string
  productSlug: string | null
  productName: string
  productImage: string | null
  reviewerName: string
  reviewerEmail: string | null
  rating: number
  title: string | null
  body: string
  createdAt: string
  status: ReviewStatus
}
