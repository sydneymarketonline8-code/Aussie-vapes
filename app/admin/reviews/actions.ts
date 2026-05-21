'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin-auth'
import type { ReviewStatus } from '@/lib/admin-reviews-types'

export async function setReviewStatus(reviewId: string, status: ReviewStatus) {
  if (!(await isAdmin())) return { ok: false as const, error: 'Not authorised' }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('reviews')
    .update({
      status,
      moderated_at: new Date().toISOString(),
    })
    .eq('id', reviewId)

  if (error) {
    console.error('[setReviewStatus] failed', error)
    return { ok: false as const, error: error.message }
  }
  revalidatePath('/admin/reviews')
  return { ok: true as const }
}
