'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin-auth'

export interface CreateCouponInput {
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minOrderValue: number
  maxUses: number
  expiresAt: string | null
  isActive: boolean
}

export async function createCoupon(input: CreateCouponInput) {
  if (!(await isAdmin())) return { ok: false as const, error: 'Not authorised' }

  const code = input.code.trim().toUpperCase()
  if (!code) return { ok: false as const, error: 'Code is required' }
  if (!(input.value > 0)) return { ok: false as const, error: 'Value must be greater than zero' }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('coupons').insert({
    code,
    type: input.type,
    value: input.value,
    min_order_value: input.minOrderValue,
    max_uses: input.maxUses,
    expires_at: input.expiresAt,
    is_active: input.isActive,
  })

  if (error) {
    console.error('[createCoupon] insert failed', error)
    if (error.code === '23505') return { ok: false as const, error: 'A coupon with that code already exists' }
    return { ok: false as const, error: error.message }
  }
  revalidatePath('/admin/coupons')
  return { ok: true as const }
}

export async function toggleCouponActive(id: string, nextActive: boolean) {
  if (!(await isAdmin())) return { ok: false as const, error: 'Not authorised' }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('coupons')
    .update({ is_active: nextActive })
    .eq('id', id)

  if (error) {
    console.error('[toggleCouponActive] failed', error)
    return { ok: false as const, error: error.message }
  }
  revalidatePath('/admin/coupons')
  return { ok: true as const }
}

export async function deleteCoupon(id: string) {
  if (!(await isAdmin())) return { ok: false as const, error: 'Not authorised' }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('coupons').delete().eq('id', id)

  if (error) {
    console.error('[deleteCoupon] failed', error)
    return { ok: false as const, error: error.message }
  }
  revalidatePath('/admin/coupons')
  return { ok: true as const }
}
