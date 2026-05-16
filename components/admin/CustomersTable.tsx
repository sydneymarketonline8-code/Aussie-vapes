'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  type AdminCustomer,
  type AdminOrder,
  type OrderStatus,
} from '@/lib/admin-mock-data'
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

const PAGE_SIZE = 20

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'bg-warning/15 text-warning',
  confirmed: 'bg-info/15 text-info',
  processing: 'bg-info/15 text-info',
  shipped: 'bg-success/15 text-success',
  delivered: 'bg-success/15 text-success',
  cancelled: 'bg-price/15 text-price',
}

interface CustomersTableProps {
  customers: AdminCustomer[]
  ordersByCustomer: Record<string, AdminOrder[]>
}

export default function CustomersTable({ customers, ordersByCustomer }: CustomersTableProps) {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [activeId, setActiveId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return customers
    return customers.filter((c) =>
      `${c.firstName} ${c.lastName} ${c.email} ${c.city}`.toLowerCase().includes(term)
    )
  }, [customers, q])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const slice = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const active = activeId ? customers.find((c) => c.id === activeId) : null
  const activeOrders = active ? ordersByCustomer[active.id] ?? [] : []

  return (
    <>
      <div className="bg-white border border-line rounded-sm">
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
              placeholder="Search name, email, city…"
              className="w-full bg-white border border-line rounded-sm pl-9 pr-3 py-2 text-sm text-body placeholder:text-mute focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-soft-50 text-mute font-display uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-5 py-2.5 text-left">Customer</th>
                <th className="px-5 py-2.5 text-left">Location</th>
                <th className="px-5 py-2.5 text-left">Joined</th>
                <th className="px-5 py-2.5 text-right">Orders</th>
                <th className="px-5 py-2.5 text-right">Total Spent</th>
                <th className="px-5 py-2.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {slice.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-soft-50 cursor-pointer"
                  onClick={() => setActiveId(c.id)}
                >
                  <td className="px-5 py-3">
                    <p className="font-display font-bold text-ink">
                      {c.firstName} {c.lastName}
                      {c.role === 'admin' && (
                        <span className="ml-2 text-[10px] font-display font-bold uppercase tracking-wider bg-ink text-white px-1.5 py-0.5 rounded-sm">
                          Admin
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-mute">{c.email}</p>
                  </td>
                  <td className="px-5 py-3 text-xs text-body">
                    {c.city}, {c.state}
                  </td>
                  <td className="px-5 py-3 text-xs text-body">
                    {new Date(c.joinedAt).toLocaleDateString('en-AU', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-3 text-right font-display font-bold text-ink">
                    {c.ordersCount}
                  </td>
                  <td className="px-5 py-3 text-right font-display font-bold text-ink">
                    ${c.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="font-display text-[11px] uppercase tracking-widest font-bold text-price">
                      View →
                    </span>
                  </td>
                </tr>
              ))}
              {slice.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-mute text-sm">
                    No customers match.
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

      {/* Slide-in panel */}
      {active && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="flex-1 bg-ink/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setActiveId(null)}
          />
          <aside className="w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-slide-right">
            <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b border-line bg-white">
              <div>
                <h3 className="font-display text-base font-bold text-ink">
                  {active.firstName} {active.lastName}
                </h3>
                <p className="text-[11px] text-mute font-display uppercase tracking-wider">
                  Customer · {active.id}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="p-1.5 rounded-sm hover:bg-soft-100 text-mute"
                aria-label="Close panel"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-body">
                  <EnvelopeIcon className="h-4 w-4 text-mute" />
                  {active.email}
                </p>
                <p className="flex items-center gap-2 text-body">
                  <MapPinIcon className="h-4 w-4 text-mute" />
                  {active.city}, {active.state}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-soft-50 border border-line rounded-sm p-3 text-center">
                  <p className="font-display text-[10px] uppercase tracking-widest font-bold text-mute">Orders</p>
                  <p className="font-display text-xl font-bold text-ink mt-1">{active.ordersCount}</p>
                </div>
                <div className="bg-soft-50 border border-line rounded-sm p-3 text-center">
                  <p className="font-display text-[10px] uppercase tracking-widest font-bold text-mute">Spent</p>
                  <p className="font-display text-xl font-bold text-ink mt-1">
                    ${active.totalSpent.toFixed(0)}
                  </p>
                </div>
                <div className="bg-soft-50 border border-line rounded-sm p-3 text-center">
                  <p className="font-display text-[10px] uppercase tracking-widest font-bold text-mute">AOV</p>
                  <p className="font-display text-xl font-bold text-ink mt-1">
                    ${active.ordersCount > 0 ? (active.totalSpent / active.ordersCount).toFixed(0) : '0'}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-display text-xs font-bold uppercase tracking-widest text-mute mb-3">
                  Order History
                </h4>
                {activeOrders.length === 0 ? (
                  <p className="text-sm text-mute">No orders yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {activeOrders.map((o) => (
                      <li key={o.id}>
                        <Link
                          href={`/admin/orders/${o.id}`}
                          className="flex items-center justify-between gap-3 px-3 py-2 rounded-sm border border-line hover:border-ink hover:bg-soft-50"
                        >
                          <div className="min-w-0">
                            <p className="font-display font-bold text-ink text-sm">{o.number}</p>
                            <p className="text-[11px] text-mute">
                              {new Date(o.placedAt).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })}{' · '}
                              {o.itemsCount} items
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-display font-bold text-ink text-sm">${o.total.toFixed(2)}</p>
                            <span
                              className={`inline-block px-1.5 py-0.5 rounded-sm text-[9px] font-display font-bold uppercase tracking-wider mt-0.5 ${STATUS_STYLES[o.status]}`}
                            >
                              {o.status}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
