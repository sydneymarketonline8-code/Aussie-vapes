// Client-safe shared types and constants for admin orders.
// Keep server-only data fetching in lib/admin-orders.ts.

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type PaymentStatus =
  | 'pending'
  | 'authorized'
  | 'captured'
  | 'failed'
  | 'refunded'
  | 'partially_refunded'

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
]

export interface OrderLineItem {
  productSlug: string
  productName: string
  productImage: string | null
  quantity: number
  unitPrice: number
  lineTotal: number
  selectedFlavour: string | null
  selectedNicotine: string | null
}

export interface AdminOrderSummary {
  id: string
  number: string
  customerName: string
  customerEmail: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: 'payid' | 'bitcoin' | null
  paymentReference: string | null
  placedAt: string
  itemsCount: number
  total: number
  profileId: string | null
}

export interface AdminOrderDetail extends AdminOrderSummary {
  customerPhone: string | null
  subtotal: number
  shipping: number
  discount: number
  shippingAddress: {
    recipient: string
    line1: string
    line2: string | null
    suburb: string
    state: string
    postcode: string
    country: string
  }
  items: OrderLineItem[]
  tracking: { carrier: string | null; number: string | null }
  internalNotes: string | null
}
