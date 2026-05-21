'use server'

import { randomBytes } from 'crypto'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { type PaymentMethod } from '@/lib/payment'
import { notifySalesPendingPayment } from '@/lib/notify'

/**
 * Generates an order payment reference like `PAY-7F2K9Q`. Six chars of
 * Crockford-style base32 (no I, L, O, U) gives ~1 in a billion collisions
 * per pair and stays short enough for a bank-transfer description field.
 */
function generatePaymentReference(): string {
  const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
  const bytes = randomBytes(6)
  let code = ''
  for (let i = 0; i < 6; i++) code += alphabet[bytes[i] % alphabet.length]
  return `PAY-${code}`
}

export interface CheckoutItemInput {
  productId: string
  productSlug: string
  productName: string
  productImageUrl?: string
  selectedFlavour?: string
  selectedNicotine?: string
  quantity: number
  unitPrice: number
}

export interface CreateOrderInput {
  contact: {
    email: string
    firstName: string
    lastName: string
    phone?: string
  }
  shipping: {
    address: string
    suburb: string
    state: string
    postcode: string
    country: string
    method: 'standard' | 'express'
  }
  payment: { method: PaymentMethod }
  items: CheckoutItemInput[]
}

export interface CreateOrderResult {
  ok: true
  reference: string
} | {
  ok: false
  error: string
}

/**
 * Creates an order in Supabase with `payment_status = 'pending'` (Awaiting
 * payment), assigns a unique reference code, and fires a sales-team
 * notification. The client redirects to /checkout/success/[reference] on
 * success, where payment instructions are rendered.
 */
export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  if (!input.items.length) {
    return { ok: false, error: 'Your cart is empty.' }
  }

  const subtotal = input.items.reduce(
    (sum, i) => sum + i.unitPrice * i.quantity,
    0,
  )
  const shippingCost = input.shipping.method === 'express'
    ? 14.95
    : subtotal >= 300 ? 0 : 9.95
  const total = subtotal + shippingCost

  const reference = generatePaymentReference()
  const fullName = `${input.contact.firstName} ${input.contact.lastName}`.trim()

  const supabase = await createSupabaseServerClient()

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_email: input.contact.email,
      customer_name: fullName,
      customer_phone: input.contact.phone || null,
      status: 'pending',
      payment_status: 'pending',
      payment_method: input.payment.method,
      payment_reference: reference,
      subtotal,
      shipping: shippingCost,
      total,
      ship_recipient: fullName,
      ship_line1: input.shipping.address,
      ship_suburb: input.shipping.suburb,
      ship_state: input.shipping.state,
      ship_postcode: input.shipping.postcode,
      ship_country: input.shipping.country || 'Australia',
    })
    .select('id, number, total, customer_email, customer_name')
    .single()

  if (orderError || !order) {
    console.error('[createOrder] insert orders failed', orderError)
    return { ok: false, error: 'Could not create order. Please try again.' }
  }

  const itemRows = input.items.map((i) => ({
    order_id: order.id,
    product_id: i.productId,
    product_slug: i.productSlug,
    product_name: i.productName,
    product_image_url: i.productImageUrl ?? null,
    selected_flavour: i.selectedFlavour ?? null,
    selected_nicotine: i.selectedNicotine ?? null,
    quantity: i.quantity,
    unit_price: i.unitPrice,
    line_total: i.unitPrice * i.quantity,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(itemRows)
  if (itemsError) {
    console.error('[createOrder] insert order_items failed', itemsError)
    return { ok: false, error: 'Could not save order line items. Please try again.' }
  }

  await notifySalesPendingPayment({
    orderNumber: order.number,
    reference,
    method: input.payment.method,
    totalAud: Number(order.total),
    customerEmail: order.customer_email,
    customerName: order.customer_name,
  })

  return { ok: true, reference }
}

/** Convenience wrapper used by the checkout form: creates the order then redirects. */
export async function createOrderAndRedirect(input: CreateOrderInput) {
  const result = await createOrder(input)
  if (!result.ok) return result
  redirect(`/checkout/success/${result.reference}`)
}
