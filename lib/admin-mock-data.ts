/**
 * Static mock data for the admin dashboard. Replace with real database
 * queries when a backend (Supabase / Postgres) is wired up.
 */

import { PRODUCTS } from './products'
import type { Product } from '@/types'

// ─── Customers ───────────────────────────────────────────────

export interface AdminCustomer {
  id: string
  firstName: string
  lastName: string
  email: string
  joinedAt: string
  role: 'customer' | 'admin'
  ordersCount: number
  totalSpent: number
  lastOrderAt?: string
  city: string
  state: string
}

const FIRST_NAMES = ['Jack', 'Olivia', 'Noah', 'Charlotte', 'Liam', 'Amelia', 'Lucas', 'Mia', 'Ethan', 'Ava', 'Mason', 'Isla', 'Logan', 'Grace', 'Hunter', 'Ruby', 'Cooper', 'Chloe', 'Oliver', 'Sophia', 'Hayden', 'Zoe', 'Riley', 'Lily', 'Harvey', 'Ella', 'Archie', 'Ivy', 'Leo', 'Hannah']
const LAST_NAMES = ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White', 'Martin', 'Anderson', 'Thompson', 'Nguyen', 'Walker', 'Hall', 'Wright', 'Lee', 'Robinson', 'Lewis', 'Clark', 'Young', 'King', 'Scott', 'Green', 'Adams', 'Baker', 'Hill', 'Mitchell', 'Carter']
const CITIES: { city: string; state: string }[] = [
  { city: 'Sydney', state: 'NSW' },
  { city: 'Melbourne', state: 'VIC' },
  { city: 'Brisbane', state: 'QLD' },
  { city: 'Perth', state: 'WA' },
  { city: 'Adelaide', state: 'SA' },
  { city: 'Newcastle', state: 'NSW' },
  { city: 'Gold Coast', state: 'QLD' },
  { city: 'Geelong', state: 'VIC' },
  { city: 'Wollongong', state: 'NSW' },
  { city: 'Hobart', state: 'TAS' },
]

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const rand = seededRandom(20260516)

export const CUSTOMERS: AdminCustomer[] = Array.from({ length: 28 }, (_, i) => {
  const first = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)]
  const last = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)]
  const loc = CITIES[Math.floor(rand() * CITIES.length)]
  const ordersCount = Math.floor(rand() * 18)
  const avgOrder = 35 + Math.floor(rand() * 220)
  const joined = new Date(2025, Math.floor(rand() * 12), 1 + Math.floor(rand() * 28))
  const lastOrder =
    ordersCount > 0
      ? new Date(2026, Math.floor(rand() * 5), 1 + Math.floor(rand() * 28))
      : undefined
  return {
    id: `cus_${(i + 1).toString().padStart(4, '0')}`,
    firstName: first,
    lastName: last,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    joinedAt: joined.toISOString(),
    role: i === 0 ? 'admin' : 'customer',
    ordersCount,
    totalSpent: ordersCount * avgOrder,
    lastOrderAt: lastOrder?.toISOString(),
    city: loc.city,
    state: loc.state,
  }
})

export function getCustomerById(id: string): AdminCustomer | undefined {
  return CUSTOMERS.find((c) => c.id === id)
}

// ─── Orders ───────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

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
  productImage: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface AdminOrder {
  id: string
  number: string
  customerId: string
  customerName: string
  customerEmail: string
  status: OrderStatus
  placedAt: string
  items: OrderLineItem[]
  itemsCount: number
  subtotal: number
  shipping: number
  discount: number
  total: number
  shippingAddress: {
    name: string
    line1: string
    suburb: string
    state: string
    postcode: string
    country: string
  }
  tracking?: { carrier: string; number: string }
  notes?: string
}

const STATUSES: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'shipped',
  'delivered',
  'cancelled',
]

const productsWithImages = PRODUCTS.filter((p) => p.images?.[0])

function makeOrder(i: number, customer: AdminCustomer): AdminOrder {
  const itemCount = 1 + Math.floor(rand() * 4)
  const items: OrderLineItem[] = []
  for (let n = 0; n < itemCount; n++) {
    const p = productsWithImages[Math.floor(rand() * productsWithImages.length)]
    const qty = 1 + Math.floor(rand() * 2)
    items.push({
      productSlug: p.slug,
      productName: p.name,
      productImage: p.images[0],
      quantity: qty,
      unitPrice: p.price,
      lineTotal: Math.round(p.price * qty * 100) / 100,
    })
  }
  const subtotal = Math.round(items.reduce((s, it) => s + it.lineTotal, 0) * 100) / 100
  const shipping = subtotal >= 300 ? 0 : 9.95
  const discount = rand() < 0.18 ? Math.round(subtotal * 0.1 * 100) / 100 : 0
  const total = Math.round((subtotal + shipping - discount) * 100) / 100
  const status = STATUSES[i % STATUSES.length]
  const placed = new Date(2026, 4, 1 + Math.floor(rand() * 15), Math.floor(rand() * 24), Math.floor(rand() * 60))
  const tracking =
    status === 'shipped' || status === 'delivered'
      ? {
          carrier: ['AusPost', 'Sendle', 'Couriers Please', 'Aramex'][Math.floor(rand() * 4)],
          number: `AU${(rand() * 1e10).toFixed(0).padStart(10, '0')}`,
        }
      : undefined

  return {
    id: `ord_${(i + 1).toString().padStart(5, '0')}`,
    number: `AV-${(10001 + i).toString()}`,
    customerId: customer.id,
    customerName: `${customer.firstName} ${customer.lastName}`,
    customerEmail: customer.email,
    status,
    placedAt: placed.toISOString(),
    items,
    itemsCount: items.reduce((s, it) => s + it.quantity, 0),
    subtotal,
    shipping,
    discount,
    total,
    shippingAddress: {
      name: `${customer.firstName} ${customer.lastName}`,
      line1: `${1 + Math.floor(rand() * 200)} ${LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)]} St`,
      suburb: customer.city,
      state: customer.state,
      postcode: ['2000', '3000', '4000', '5000', '6000', '7000', '2280', '4217'][Math.floor(rand() * 8)],
      country: 'Australia',
    },
    tracking,
    notes: undefined,
  }
}

export const ORDERS: AdminOrder[] = Array.from({ length: 36 }, (_, i) =>
  makeOrder(i, CUSTOMERS[i % CUSTOMERS.length])
).sort((a, b) => (a.placedAt < b.placedAt ? 1 : -1))

export function getOrderById(id: string): AdminOrder | undefined {
  return ORDERS.find((o) => o.id === id || o.number === id)
}

export function getOrdersByCustomer(customerId: string): AdminOrder[] {
  return ORDERS.filter((o) => o.customerId === customerId)
}

// Update mock customers with order counts derived from orders
for (const c of CUSTOMERS) {
  const orders = getOrdersByCustomer(c.id)
  c.ordersCount = orders.length
  c.totalSpent = Math.round(orders.reduce((s, o) => s + o.total, 0) * 100) / 100
  c.lastOrderAt = orders[0]?.placedAt
}

// ─── Coupons ───────────────────────────────────────────────

export interface AdminCoupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minOrderValue: number
  maxUses: number
  uses: number
  expiresAt: string
  isActive: boolean
}

export const COUPONS: AdminCoupon[] = [
  { id: 'cp_001', code: 'WELCOME10', type: 'percentage', value: 10, minOrderValue: 0, maxUses: 0, uses: 487, expiresAt: '2026-12-31', isActive: true },
  { id: 'cp_002', code: 'FREESHIP', type: 'fixed', value: 9.95, minOrderValue: 60, maxUses: 0, uses: 1124, expiresAt: '2026-12-31', isActive: true },
  { id: 'cp_003', code: 'MAY25', type: 'percentage', value: 25, minOrderValue: 150, maxUses: 200, uses: 188, expiresAt: '2026-05-31', isActive: true },
  { id: 'cp_004', code: 'BULK15', type: 'percentage', value: 15, minOrderValue: 300, maxUses: 0, uses: 92, expiresAt: '2026-08-31', isActive: true },
  { id: 'cp_005', code: 'IGETFAN', type: 'percentage', value: 12, minOrderValue: 0, maxUses: 500, uses: 446, expiresAt: '2026-06-30', isActive: true },
  { id: 'cp_006', code: 'EASTER10', type: 'percentage', value: 10, minOrderValue: 0, maxUses: 1000, uses: 1000, expiresAt: '2026-04-30', isActive: false },
  { id: 'cp_007', code: 'STAFF50', type: 'percentage', value: 50, minOrderValue: 0, maxUses: 50, uses: 12, expiresAt: '2026-12-31', isActive: true },
  { id: 'cp_008', code: 'CROWN5', type: 'fixed', value: 5, minOrderValue: 35, maxUses: 0, uses: 234, expiresAt: '2026-07-31', isActive: true },
]

// ─── Reviews ───────────────────────────────────────────────

export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export interface AdminReview {
  id: string
  productSlug: string
  productName: string
  productImage: string
  reviewerName: string
  reviewerEmail: string
  rating: number
  title: string
  body: string
  createdAt: string
  status: ReviewStatus
}

const REVIEW_BODIES = [
  'Flavour is on point and the draw is smooth — exactly what I wanted from this brand.',
  'Battery lasted noticeably longer than the previous device I had. Great value.',
  'Shipped fast from Sydney. Arrived discreetly packaged, no issues at all.',
  'Decent device but the flavour faded a bit toward the end. Still worth it for the price.',
  'Best disposable I\'ve tried in Australia. Will absolutely reorder.',
  'Mesh coil makes a real difference. Crisp flavour right to the last puff.',
  'Customer support helped me when the device arrived faulty. Replaced free of charge.',
  'Lasted me about 9 days of moderate use. Battery and e-liquid finished around the same time.',
]
const REVIEW_TITLES = ['Spot on', 'Loved it', 'Solid pickup', 'Will reorder', 'Great flavour', 'Fast shipping', 'Bit hit and miss', 'Exactly as described']

export const REVIEWS: AdminReview[] = productsWithImages.slice(0, 24).map((p, i) => {
  const reviewer = CUSTOMERS[i % CUSTOMERS.length]
  const status: ReviewStatus = i < 6 ? 'pending' : i < 22 ? 'approved' : 'rejected'
  return {
    id: `rev_${(i + 1).toString().padStart(4, '0')}`,
    productSlug: p.slug,
    productName: p.name,
    productImage: p.images[0],
    reviewerName: `${reviewer.firstName} ${reviewer.lastName.charAt(0)}.`,
    reviewerEmail: reviewer.email,
    rating: 3 + Math.floor(rand() * 3),
    title: REVIEW_TITLES[i % REVIEW_TITLES.length],
    body: REVIEW_BODIES[i % REVIEW_BODIES.length],
    createdAt: new Date(2026, 4, 1 + (i % 15)).toISOString(),
    status,
  }
})

// ─── Aggregates ───────────────────────────────────────────────

function monthBounds(now = new Date()) {
  const startThis = new Date(now.getFullYear(), now.getMonth(), 1)
  const startLast = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  return { startThis, startLast }
}

export interface KpiSet {
  thisMonth: number
  lastMonth: number
  percentChange: number
}

function pct(curr: number, prev: number): number {
  if (prev === 0) return curr > 0 ? 100 : 0
  return Math.round(((curr - prev) / prev) * 100)
}

export function getDashboardKpis() {
  const { startThis, startLast } = monthBounds(new Date(2026, 4, 16))
  const revenueThis = ORDERS.filter((o) => new Date(o.placedAt) >= startThis && o.status !== 'cancelled').reduce((s, o) => s + o.total, 0)
  const revenueLast = ORDERS.filter((o) => {
    const d = new Date(o.placedAt)
    return d >= startLast && d < startThis && o.status !== 'cancelled'
  }).reduce((s, o) => s + o.total, 0)

  const ordersThis = ORDERS.filter((o) => new Date(o.placedAt) >= startThis).length
  const ordersLast = ORDERS.filter((o) => {
    const d = new Date(o.placedAt)
    return d >= startLast && d < startThis
  }).length

  // Mock 'new customers' from the joined-this-month set
  const newCustThis = CUSTOMERS.filter((c) => new Date(c.joinedAt) >= startThis).length || 12
  const newCustLast = CUSTOMERS.filter((c) => {
    const d = new Date(c.joinedAt)
    return d >= startLast && d < startThis
  }).length || 9

  const aovThis = ordersThis > 0 ? revenueThis / ordersThis : 0
  const aovLast = ordersLast > 0 ? revenueLast / ordersLast : 0

  return {
    revenue: { thisMonth: revenueThis, lastMonth: revenueLast, percentChange: pct(revenueThis, revenueLast) } satisfies KpiSet,
    orders: { thisMonth: ordersThis, lastMonth: ordersLast, percentChange: pct(ordersThis, ordersLast) } satisfies KpiSet,
    newCustomers: { thisMonth: newCustThis, lastMonth: newCustLast, percentChange: pct(newCustThis, newCustLast) } satisfies KpiSet,
    avgOrderValue: { thisMonth: aovThis, lastMonth: aovLast, percentChange: pct(aovThis, aovLast) } satisfies KpiSet,
  }
}

export function getLowStockProducts(threshold = 5): Product[] {
  return PRODUCTS.filter((p) => p.stockCount != null && p.stockCount < threshold)
}

export function getRecentOrders(limit = 10): AdminOrder[] {
  return ORDERS.slice(0, limit)
}
