'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  type AdminOrder,
  type OrderStatus,
  ORDER_STATUS_FLOW,
} from '@/lib/admin-mock-data'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'bg-warning/15 text-warning',
  confirmed: 'bg-info/15 text-info',
  processing: 'bg-info/15 text-info',
  shipped: 'bg-success/15 text-success',
  delivered: 'bg-success/15 text-success',
  cancelled: 'bg-price/15 text-price',
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

const TABS: { key: 'all' | OrderStatus; label: string }[] = [
  { key: 'all', label: 'All' },
  ...ORDER_STATUS_FLOW.map((s) => ({ key: s, label: STATUS_LABEL[s] })),
  { key: 'cancelled' as const, label: 'Cancelled' },
]

const PAGE_SIZE = 20

export default function OrdersTable({ orders }: { orders: AdminOrder[] }) {
  const [tab, setTab] = useState<'all' | OrderStatus>('all')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length }
    for (const o of orders) c[o.status] = (c[o.status] ?? 0) + 1
    return c
  }, [orders])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return orders.filter((o) => {
      if (tab !== 'all' && o.status !== tab) return false
      if (term) {
        const hay = `${o.number} ${o.customerName} ${o.customerEmail} ${o.id}`.toLowerCase()
        if (!hay.includes(term)) return false
      }
      return true
    })
  }, [orders, tab, q])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const slice = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <div className="bg-white border border-line rounded-sm">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 px-3 pt-3 border-b border-line bg-soft-50">
        {TABS.map(({ key, label }) => {
          const active = tab === key
          const count = counts[key] ?? 0
          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                setTab(key)
                setPage(1)
              }}
              className={`flex items-center gap-1.5 px-4 py-2 font-display text-xs font-bold uppercase tracking-wider border-b-2 -mb-px transition-colors ${
                active
                  ? 'border-price text-ink bg-white'
                  : 'border-transparent text-mute hover:text-ink'
              }`}
            >
              {label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-sm ${active ? 'bg-price/10 text-price' : 'bg-soft-200 text-mute'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="p-4 border-b border-line">
        <div className="relative max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setPage(1)
            }}
            placeholder="Search order #, customer, email…"
            className="w-full bg-white border border-line rounded-sm pl-9 pr-3 py-2 text-sm text-body placeholder:text-mute focus:outline-none focus:border-ink"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-soft-50 text-mute font-display uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-5 py-2.5 text-left">Order</th>
              <th className="px-5 py-2.5 text-left">Date</th>
              <th className="px-5 py-2.5 text-left">Customer</th>
              <th className="px-5 py-2.5 text-left">Status</th>
              <th className="px-5 py-2.5 text-right">Items</th>
              <th className="px-5 py-2.5 text-right">Total</th>
              <th className="px-5 py-2.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {slice.map((o) => (
              <tr key={o.id} className="hover:bg-soft-50">
                <td className="px-5 py-3">
                  <Link
                    href={`/admin/orders/${o.id}`}
                    className="font-display font-bold text-ink hover:text-price"
                  >
                    {o.number}
                  </Link>
                </td>
                <td className="px-5 py-3 text-xs text-body">
                  {new Date(o.placedAt).toLocaleString('en-AU', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </td>
                <td className="px-5 py-3">
                  <p className="font-display font-semibold text-ink">{o.customerName}</p>
                  <p className="text-[11px] text-mute">{o.customerEmail}</p>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-sm text-[11px] font-display font-bold uppercase tracking-wider ${STATUS_STYLES[o.status]}`}
                  >
                    {STATUS_LABEL[o.status]}
                  </span>
                </td>
                <td className="px-5 py-3 text-right text-body">{o.itemsCount}</td>
                <td className="px-5 py-3 text-right font-display font-bold text-ink">
                  ${o.total.toFixed(2)}
                </td>
                <td className="px-5 py-3 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/orders/${o.id}`}
                    className="font-display text-xs uppercase tracking-widest font-bold text-price hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {slice.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-mute text-sm">
                  No orders match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-line">
          <p className="text-xs text-mute font-display">
            Page {safePage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="px-3 py-1.5 rounded-sm text-xs font-display font-bold uppercase tracking-wider border border-line text-body bg-white hover:border-ink disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="px-3 py-1.5 rounded-sm text-xs font-display font-bold uppercase tracking-wider border border-line text-body bg-white hover:border-ink disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
