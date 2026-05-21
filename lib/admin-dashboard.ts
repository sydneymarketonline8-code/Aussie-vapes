import { createSupabaseServerClient } from '@/lib/supabase/server'

export interface KpiSet {
  thisMonth: number
  lastMonth: number
  percentChange: number
}

export interface DashboardKpis {
  revenue: KpiSet
  orders: KpiSet
  newCustomers: KpiSet
  avgOrderValue: KpiSet
}

export interface DashboardRecentOrder {
  id: string
  number: string
  customerName: string
  customerCity: string | null
  customerState: string | null
  status: string
  itemsCount: number
  total: number
  placedAt: string
}

export interface DashboardLowStockProduct {
  id: string
  slug: string
  name: string
  brandName: string | null
  stockCount: number
  imageUrl: string | null
}

function pct(curr: number, prev: number): number {
  if (prev === 0) return curr > 0 ? 100 : 0
  return Math.round(((curr - prev) / prev) * 100)
}

const ZERO_KPI: KpiSet = { thisMonth: 0, lastMonth: 0, percentChange: 0 }
const ZERO_KPIS: DashboardKpis = {
  revenue: ZERO_KPI,
  orders: ZERO_KPI,
  newCustomers: ZERO_KPI,
  avgOrderValue: ZERO_KPI,
}

export async function getDashboardKpis(): Promise<DashboardKpis> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('dashboard_kpis')
    .select('*')
    .maybeSingle()

  if (error || !data) {
    if (error) console.error('[getDashboardKpis] query failed', error)
    return ZERO_KPIS
  }

  const revenueThis = Number(data.revenue_this)
  const revenueLast = Number(data.revenue_last)
  const ordersThis = Number(data.orders_this)
  const ordersLast = Number(data.orders_last)
  const newCustThis = Number(data.new_customers_this)
  const newCustLast = Number(data.new_customers_last)
  const aovThis = Number(data.aov_this)
  const aovLast = Number(data.aov_last)

  return {
    revenue: { thisMonth: revenueThis, lastMonth: revenueLast, percentChange: pct(revenueThis, revenueLast) },
    orders: { thisMonth: ordersThis, lastMonth: ordersLast, percentChange: pct(ordersThis, ordersLast) },
    newCustomers: { thisMonth: newCustThis, lastMonth: newCustLast, percentChange: pct(newCustThis, newCustLast) },
    avgOrderValue: { thisMonth: aovThis, lastMonth: aovLast, percentChange: pct(aovThis, aovLast) },
  }
}

export async function getRecentOrders(limit = 10): Promise<DashboardRecentOrder[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id, number, customer_name, ship_suburb, ship_state, status, total, placed_at,
      order_items(quantity)
    `)
    .order('placed_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[getRecentOrders] query failed', error)
    return []
  }

  return (data ?? []).map((o): DashboardRecentOrder => {
    const items = (o.order_items as { quantity: number }[] | null) ?? []
    return {
      id: o.id,
      number: o.number,
      customerName: o.customer_name,
      customerCity: o.ship_suburb,
      customerState: o.ship_state,
      status: o.status,
      itemsCount: items.reduce((s, it) => s + (it.quantity ?? 0), 0),
      total: Number(o.total),
      placedAt: o.placed_at,
    }
  })
}

export async function getLowStockProducts(limit = 8): Promise<DashboardLowStockProduct[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('low_stock_products')
    .select('*')
    .limit(limit)

  if (error) {
    console.error('[getLowStockProducts] query failed', error)
    return []
  }

  return (data ?? []).map((p): DashboardLowStockProduct => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brandName: p.brand_name ?? null,
    stockCount: Number(p.stock_count),
    imageUrl: p.image_url ?? null,
  }))
}
