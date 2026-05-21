import { createSupabaseServerClient } from '@/lib/supabase/server'
import type {
  AdminCustomerSummary,
  AdminCustomerDetail,
  AdminCustomerOrder,
} from './admin-customers-types'

export * from './admin-customers-types'

interface ProfileRow {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  role: 'customer' | 'admin' | 'staff'
  created_at: string
  orders: { total: number; placed_at: string }[] | null
}

export async function listAdminCustomers(): Promise<AdminCustomerSummary[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('profiles')
    .select(`id, email, first_name, last_name, role, created_at, orders(total, placed_at)`)
    .order('created_at', { ascending: false })
    .limit(500)

  if (error) {
    console.error('[listAdminCustomers] query failed', error)
    return []
  }

  return ((data as ProfileRow[] | null) ?? []).map((p): AdminCustomerSummary => {
    const orders = p.orders ?? []
    const totalSpent = orders.reduce((s, o) => s + Number(o.total), 0)
    const lastOrderAt = orders
      .map((o) => o.placed_at)
      .sort()
      .reverse()[0] ?? null

    return {
      id: p.id,
      email: p.email,
      firstName: p.first_name ?? '',
      lastName: p.last_name ?? '',
      role: p.role,
      joinedAt: p.created_at,
      ordersCount: orders.length,
      totalSpent,
      lastOrderAt,
    }
  })
}

export async function getAdminCustomerById(id: string): Promise<AdminCustomerDetail | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id, email, first_name, last_name, phone, role, created_at,
      orders(id, number, status, placed_at, total, order_items(quantity))
    `)
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('[getAdminCustomerById] query failed', error)
    return null
  }
  if (!data) return null

  const rawOrders = (data.orders as Array<{
    id: string
    number: string
    status: string
    placed_at: string
    total: number
    order_items: { quantity: number }[] | null
  }> | null) ?? []

  const orders: AdminCustomerOrder[] = rawOrders
    .map((o) => ({
      id: o.id,
      number: o.number,
      status: o.status,
      placedAt: o.placed_at,
      total: Number(o.total),
      itemsCount: (o.order_items ?? []).reduce((s, it) => s + (it.quantity ?? 0), 0),
    }))
    .sort((a, b) => (a.placedAt < b.placedAt ? 1 : -1))

  const totalSpent = orders.reduce((s, o) => s + o.total, 0)

  return {
    id: data.id,
    email: data.email,
    firstName: data.first_name ?? '',
    lastName: data.last_name ?? '',
    phone: data.phone ?? null,
    role: data.role,
    joinedAt: data.created_at,
    ordersCount: orders.length,
    totalSpent,
    lastOrderAt: orders[0]?.placedAt ?? null,
    orders,
  }
}
