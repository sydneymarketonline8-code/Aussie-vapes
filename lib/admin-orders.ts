import { createSupabaseServerClient } from '@/lib/supabase/server'
import type {
  AdminOrderDetail,
  AdminOrderSummary,
  OrderLineItem,
  OrderStatus,
  PaymentStatus,
} from './admin-orders-types'

export * from './admin-orders-types'

/** Server-side list query for the /admin/orders table. */
export async function listAdminOrders(): Promise<AdminOrderSummary[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id, number, customer_name, customer_email, status, payment_status,
      payment_method, payment_reference, total, placed_at, profile_id,
      order_items(quantity)
    `)
    .order('placed_at', { ascending: false })
    .limit(200)

  if (error) {
    console.error('[listAdminOrders] query failed', error)
    return []
  }

  return (data ?? []).map((row): AdminOrderSummary => {
    const items = (row.order_items as { quantity: number }[] | null) ?? []
    const itemsCount = items.reduce((sum, it) => sum + (it.quantity ?? 0), 0)
    return {
      id: row.id,
      number: row.number,
      customerName: row.customer_name,
      customerEmail: row.customer_email,
      status: row.status as OrderStatus,
      paymentStatus: row.payment_status as PaymentStatus,
      paymentMethod: (row.payment_method as 'payid' | 'bitcoin' | null) ?? null,
      paymentReference: row.payment_reference ?? null,
      placedAt: row.placed_at,
      itemsCount,
      total: Number(row.total),
      profileId: row.profile_id ?? null,
    }
  })
}

/** Server-side fetch for /admin/orders/[id]. Returns null if the order isn't found. */
export async function getAdminOrderById(id: string): Promise<AdminOrderDetail | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id, number, customer_name, customer_email, customer_phone,
      status, payment_status, payment_method, payment_reference,
      subtotal, shipping, discount, total, placed_at, profile_id,
      ship_recipient, ship_line1, ship_line2, ship_suburb, ship_state, ship_postcode, ship_country,
      carrier, tracking_number, internal_notes,
      order_items (
        product_slug, product_name, product_image_url,
        quantity, unit_price, line_total,
        selected_flavour, selected_nicotine
      )
    `)
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('[getAdminOrderById] query failed', error)
    return null
  }
  if (!data) return null

  const items: OrderLineItem[] = ((data.order_items as Array<{
    product_slug: string
    product_name: string
    product_image_url: string | null
    quantity: number
    unit_price: number
    line_total: number
    selected_flavour: string | null
    selected_nicotine: string | null
  }> | null) ?? []).map((it) => ({
    productSlug: it.product_slug,
    productName: it.product_name,
    productImage: it.product_image_url,
    quantity: it.quantity,
    unitPrice: Number(it.unit_price),
    lineTotal: Number(it.line_total),
    selectedFlavour: it.selected_flavour,
    selectedNicotine: it.selected_nicotine,
  }))

  return {
    id: data.id,
    number: data.number,
    customerName: data.customer_name,
    customerEmail: data.customer_email,
    customerPhone: data.customer_phone ?? null,
    status: data.status as OrderStatus,
    paymentStatus: data.payment_status as PaymentStatus,
    paymentMethod: (data.payment_method as 'payid' | 'bitcoin' | null) ?? null,
    paymentReference: data.payment_reference ?? null,
    placedAt: data.placed_at,
    profileId: data.profile_id ?? null,
    subtotal: Number(data.subtotal),
    shipping: Number(data.shipping),
    discount: Number(data.discount ?? 0),
    total: Number(data.total),
    itemsCount: items.reduce((s, it) => s + it.quantity, 0),
    items,
    shippingAddress: {
      recipient: data.ship_recipient,
      line1: data.ship_line1,
      line2: data.ship_line2 ?? null,
      suburb: data.ship_suburb,
      state: data.ship_state,
      postcode: data.ship_postcode,
      country: data.ship_country,
    },
    tracking: {
      carrier: data.carrier ?? null,
      number: data.tracking_number ?? null,
    },
    internalNotes: data.internal_notes ?? null,
  }
}
