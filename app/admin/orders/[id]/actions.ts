'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin-auth'
import type { OrderStatus } from '@/lib/admin-orders'

export async function markOrderPaid(orderId: string) {
  if (!(await isAdmin())) return { ok: false, error: 'Not authorised' }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('orders')
    .update({
      payment_status: 'captured',
      status: 'confirmed',
      paid_at: new Date().toISOString(),
    })
    .eq('id', orderId)

  if (error) {
    console.error('[markOrderPaid] update failed', error)
    return { ok: false, error: error.message }
  }
  revalidatePath(`/admin/orders/${orderId}`)
  revalidatePath('/admin/orders')
  return { ok: true }
}

export async function updateOrderTracking(
  orderId: string,
  carrier: string,
  trackingNumber: string,
) {
  if (!(await isAdmin())) return { ok: false as const, error: 'Not authorised' }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('orders')
    .update({
      carrier: carrier.trim() || null,
      tracking_number: trackingNumber.trim() || null,
    })
    .eq('id', orderId)

  if (error) {
    console.error('[updateOrderTracking] failed', error)
    return { ok: false as const, error: error.message }
  }
  revalidatePath(`/admin/orders/${orderId}`)
  return { ok: true as const }
}

export async function updateOrderNotes(orderId: string, notes: string) {
  if (!(await isAdmin())) return { ok: false as const, error: 'Not authorised' }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('orders')
    .update({ internal_notes: notes.trim() ? notes : null })
    .eq('id', orderId)

  if (error) {
    console.error('[updateOrderNotes] failed', error)
    return { ok: false as const, error: error.message }
  }
  revalidatePath(`/admin/orders/${orderId}`)
  return { ok: true as const }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  if (!(await isAdmin())) return { ok: false, error: 'Not authorised' }

  const supabase = await createSupabaseServerClient()
  const patch: Record<string, unknown> = { status }
  if (status === 'shipped') patch.shipped_at = new Date().toISOString()
  if (status === 'delivered') patch.delivered_at = new Date().toISOString()
  if (status === 'cancelled') patch.cancelled_at = new Date().toISOString()

  const { error } = await supabase.from('orders').update(patch).eq('id', orderId)
  if (error) {
    console.error('[updateOrderStatus] update failed', error)
    return { ok: false, error: error.message }
  }
  revalidatePath(`/admin/orders/${orderId}`)
  revalidatePath('/admin/orders')
  return { ok: true }
}
