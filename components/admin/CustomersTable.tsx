'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { AdminCustomerSummary } from '@/lib/admin-customers-types'
import { MagnifyingGlassIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const PAGE_SIZE = 20

export default function CustomersTable({ customers }: { customers: AdminCustomerSummary[] }) {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return customers
    return customers.filter((c) =>
      `${c.firstName} ${c.lastName} ${c.email}`.toLowerCase().includes(term),
    )
  }, [customers, q])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const slice = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
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
            placeholder="Search name, email…"
            className="w-full bg-white border border-line rounded-sm pl-9 pr-3 py-2 text-sm text-body placeholder:text-mute focus:outline-none focus:border-ink"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-soft-50 text-mute font-display uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-5 py-2.5 text-left">Customer</th>
              <th className="px-5 py-2.5 text-left">Joined</th>
              <th className="px-5 py-2.5 text-left">Last Order</th>
              <th className="px-5 py-2.5 text-right">Orders</th>
              <th className="px-5 py-2.5 text-right">Total Spent</th>
              <th className="px-5 py-2.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {slice.map((c) => {
              const fullName = `${c.firstName} ${c.lastName}`.trim() || '(no name)'
              return (
                <tr key={c.id} className="hover:bg-soft-50">
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/customers/${c.id}`}
                      className="font-display font-bold text-ink hover:text-price inline-flex items-center gap-2"
                    >
                      {fullName}
                      {(c.role === 'admin' || c.role === 'staff') && (
                        <span className="text-[10px] font-display font-bold uppercase tracking-wider bg-ink text-white px-1.5 py-0.5 rounded-sm">
                          {c.role}
                        </span>
                      )}
                    </Link>
                    <p className="text-[11px] text-mute flex items-center gap-1 mt-0.5">
                      <EnvelopeIcon className="h-3 w-3" /> {c.email}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-xs text-body">
                    {new Date(c.joinedAt).toLocaleDateString('en-AU', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-3 text-xs text-body">
                    {c.lastOrderAt
                      ? new Date(c.lastOrderAt).toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' })
                      : <span className="text-mute">—</span>}
                  </td>
                  <td className="px-5 py-3 text-right font-display font-bold text-ink">{c.ordersCount}</td>
                  <td className="px-5 py-3 text-right font-display font-bold text-ink">${c.totalSpent.toFixed(2)}</td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/customers/${c.id}`}
                      className="font-display text-[11px] uppercase tracking-widest font-bold text-price hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              )
            })}
            {slice.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-mute text-sm">
                  {q ? 'No customers match.' : 'No customers yet.'}
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
