'use server'

import { revalidatePath } from 'next/cache'
import { getSupabasePublicClient } from '@/lib/supabase/public'

export interface SubmitReviewInput {
  productId: string
  productSlug: string
  reviewerName: string
  reviewerEmail: string
  rating: number
  title: string
  body: string
}

export async function submitReview(input: SubmitReviewInput) {
  if (!input.productId) return { ok: false as const, error: 'Missing product' }
  if (!input.reviewerName.trim()) return { ok: false as const, error: 'Name is required' }
  if (!input.body.trim()) return { ok: false as const, error: 'Please write your review' }
  if (input.rating < 1 || input.rating > 5) return { ok: false as const, error: 'Pick a rating from 1 to 5' }

  const supabase = getSupabasePublicClient()
  const { error } = await supabase.rpc('submit_product_review', {
    payload: {
      product_id: input.productId,
      reviewer_name: input.reviewerName,
      reviewer_email: input.reviewerEmail,
      rating: input.rating,
      title: input.title,
      body: input.body,
    },
  })

  if (error) {
    console.error('[submitReview] rpc failed', error)
    return { ok: false as const, error: error.message }
  }

  revalidatePath(`/product/${input.productSlug}`)
  revalidatePath('/admin/reviews')
  return { ok: true as const }
}
