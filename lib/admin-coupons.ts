import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { AdminCoupon } from './admin-coupons-types'

export * from './admin-coupons-types'

export async function listAdminCoupons(): Promise<AdminCoupon[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('coupons')
    .select('id, code, type, value, min_order_value, max_uses, uses, expires_at, is_active')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[listAdminCoupons] query failed', error)
    return []
  }

  return (data ?? []).map((c): AdminCoupon => ({
    id: c.id,
    code: c.code,
    type: c.type as 'percentage' | 'fixed',
    value: Number(c.value),
    minOrderValue: Number(c.min_order_value ?? 0),
    maxUses: Number(c.max_uses ?? 0),
    uses: Number(c.uses ?? 0),
    expiresAt: c.expires_at,
    isActive: c.is_active,
  }))
}
