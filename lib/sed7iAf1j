import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { AdminReview, ReviewStatus } from './admin-reviews-types'

export * from './admin-reviews-types'

export async function listAdminReviews(): Promise<AdminReview[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      id, reviewer_name, reviewer_email, rating, title, body, status, created_at,
      product:product_id ( name, slug, product_images(url) )
    `)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(500)

  if (error) {
    console.error('[listAdminReviews] query failed', error)
    return []
  }

  // Supabase types embedded relations as arrays even when they're 1:1, so we
  // normalise via unknown and pick the first row.
  const rows = (data as unknown as Array<{
    id: string
    reviewer_name: string
    reviewer_email: string | null
    rating: number
    title: string | null
    body: string
    status: ReviewStatus
    created_at: string
    product:
      | { name: string; slug: string; product_images: { url: string }[] | null }
      | Array<{ name: string; slug: string; product_images: { url: string }[] | null }>
      | null
  }> | null) ?? []

  return rows.map((r): AdminReview => {
    const product = Array.isArray(r.product) ? r.product[0] : r.product
    return {
      id: r.id,
      productSlug: product?.slug ?? null,
      productName: product?.name ?? '(product deleted)',
      productImage: product?.product_images?.[0]?.url ?? null,
      reviewerName: r.reviewer_name,
      reviewerEmail: r.reviewer_email,
      rating: r.rating,
      title: r.title,
      body: r.body,
      status: r.status,
      createdAt: r.created_at,
    }
  })
}
