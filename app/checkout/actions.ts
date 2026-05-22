'use server'

import { randomBytes } from 'crypto'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { type PaymentMethod } from '@/lib/payment'
import { notifySalesPendingPayment } from '@/lib/notify'
import { sendOrderConfirmationEmail } from '@/lib/order-emails'

/**
 * Generates an order payment reference like `PAY-7F2K9QH3DR`. 10 chars of
 * Crockford-style base32 (no I, L, O, U) gives 32^10 ≈ 1.1e15 possibilities —
 * brute-forcing the success URL is infeasible. Short enough to still fit in
 * a bank-transfer description field.
 */
function generatePaymentReference(): string {
  const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
  const bytes = randomBytes(10)
  let code = ''
  for (let i = 0; i < 10; i++) code += alphabet[bytes[i] % alphabet.length]
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

export type CreateOrderResult =
  | { ok: true; reference: string }
  | { ok: false; error: string }

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

  const items = input.items.map((i) => ({
    product_id: UUID_RE.test(i.productId) ? i.productId : '',
    product_slug: i.productSlug,
    product_name: i.productName,
    product_image_url: i.productImageUrl ?? '',
    selected_flavour: i.selectedFlavour ?? '',
    selected_nicotine: i.selectedNicotine ?? '',
    quantity: i.quantity,
    unit_price: i.unitPrice,
  }))

  const { data: rpcRows, error: orderError } = await supabase.rpc('create_guest_order', {
    payload: {
      customer_email: input.contact.email,
      customer_name: fullName,
      customer_phone: input.contact.phone ?? '',
      subtotal,
      shipping: shippingCost,
      total,
      ship_recipient: fullName,
      ship_line1: input.shipping.address,
      ship_suburb: input.shipping.suburb,
      ship_state: input.shipping.state,
      ship_postcode: input.shipping.postcode,
      ship_country: input.shipping.country || 'Australia',
      payment_method: input.payment.method,
      payment_reference: reference,
      items,
    },
  })

  const created = Array.isArray(rpcRows) ? rpcRows[0] : null
  if (orderError || !created) {
    console.error('[createOrder] create_guest_order rpc failed', orderError)
    return { ok: false, error: 'Could not create order. Please try again.' }
  }

  await Promise.all([
    notifySalesPendingPayment({
      orderNumber: created.order_number as string,
      reference,
      method: input.payment.method,
      totalAud: total,
      customerEmail: input.contact.email,
      customerName: fullName,
    }),
    sendOrderConfirmationEmail({
      to: input.contact.email,
      customerName: fullName,
      orderNumber: created.order_number as string,
      reference,
      method: input.payment.method,
      totalAud: total,
    }),
  ])

  return { ok: true, reference }
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** Convenience wrapper used by the checkout form: creates the order then redirects. */
export async function createOrderAndRedirect(input: CreateOrderInput) {
  const result = await createOrder(input)
  if (!result.ok) return result
  redirect(`/checkout/success/${result.reference}`)
}
