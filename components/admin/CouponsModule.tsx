'use client'

import { useState } from 'react'
import { type AdminCoupon } from '@/lib/admin-mock-data'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function CouponsModule({ coupons }: { coupons: AdminCoupon[] }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-white border border-line rounded-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
            All Coupons ({coupons.length})
          </h3>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm bg-price text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-sale transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            New Coupon
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-soft-50 text-mute font-display uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-5 py-2.5 text-left">Code</th>
                <th className="px-5 py-2.5 text-left">Type</th>
                <th className="px-5 py-2.5 text-right">Value</th>
                <th className="px-5 py-2.5 text-right">Min Order</th>
                <th className="px-5 py-2.5 text-right">Usage</th>
                <th className="px-5 py-2.5 text-left">Expires</th>
                <th className="px-5 py-2.5 text-left">Status</th>
                <th className="px-5 py-2.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {coupons.map((c) => {
                const expired = new Date(c.expiresAt) < new Date(2026, 4, 16)
                const exhausted = c.maxUses > 0 && c.uses >= c.maxUses
                const live = c.isActive && !expired && !exhausted
                return (
                  <tr key={c.id} className="hover:bg-soft-50">
                    <td className="px-5 py-3">
                      <span className="font-mono font-bold text-ink bg-soft-100 px-2 py-0.5 rounded-sm">
                        {c.code}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-body capitalize">{c.type}</td>
                    <td className="px-5 py-3 text-right font-display font-bold text-ink">
                      {c.type === 'percentage' ? `${c.value}%` : `$${c.value.toFixed(2)}`}
                    </td>
                    <td className="px-5 py-3 text-right text-body">
                      {c.minOrderValue > 0 ? `$${c.minOrderValue.toFixed(0)}` : '—'}
                    </td>
                    <td className="px-5 py-3 text-right text-body">
                      {c.uses.toLocaleString()}
                      {c.maxUses > 0 && (
                        <span className="text-mute"> / {c.maxUses.toLocaleString()}</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-xs text-body">
                      {new Date(c.expiresAt).toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-3">
                      {live ? (
                        <span className="inline-block px-2 py-0.5 rounded-sm bg-success/15 text-success text-[11px] font-display font-bold uppercase tracking-wider">
                          Live
                        </span>
                      ) : exhausted ? (
                        <span className="inline-block px-2 py-0.5 rounded-sm bg-warning/15 text-warning text-[11px] font-display font-bold uppercase tracking-wider">
                          Exhausted
                        </span>
                      ) : expired ? (
                        <span className="inline-block px-2 py-0.5 rounded-sm bg-price/15 text-price text-[11px] font-display font-bold uppercase tracking-wider">
                          Expired
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded-sm bg-soft-200 text-mute text-[11px] font-display font-bold uppercase tracking-wider">
                          Paused
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        disabled
                        title="Requires backend"
                        className="font-display text-xs uppercase tracking-widest font-bold text-mute cursor-not-allowed mr-2"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled
                        title="Requires backend"
                        className="font-display text-xs uppercase tracking-widest font-bold text-mute cursor-not-allowed"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {open && <CouponModal onClose={() => setOpen(false)} />}
    </>
  )
}

function CouponModal({ onClose }: { onClose: () => void }) {
  const labelCls = 'block font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-1'
  const inputCls =
    'w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body focus:outline-none focus:border-ink'

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="relative w-full max-w-lg bg-white rounded-sm shadow-2xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h3 className="font-display text-base font-bold text-ink">Create Coupon</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-soft-100 text-mute"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form className="p-5 space-y-4">
          <div>
            <label className={labelCls}>Code *</label>
            <input className={`${inputCls} font-mono uppercase`} placeholder="SUMMER25" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Type</label>
              <select className={inputCls} defaultValue="percentage">
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Value</label>
              <input type="number" className={inputCls} placeholder="10" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Minimum Order ($)</label>
              <input type="number" className={inputCls} placeholder="0" />
            </div>
            <div>
              <label className={labelCls}>Max Uses (0 = unlimited)</label>
              <input type="number" className={inputCls} placeholder="0" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Expires At</label>
            <input type="date" className={inputCls} />
          </div>
          <label className="flex items-center gap-2 text-sm text-body">
            <input type="checkbox" defaultChecked className="rounded-sm border-line text-ink focus:ring-ink" />
            Active immediately
          </label>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-sm border border-line text-ink font-display text-xs font-bold uppercase tracking-wider hover:bg-soft-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled
              title="Requires backend"
              className="px-4 py-2 rounded-sm bg-price/70 text-white font-display text-xs font-bold uppercase tracking-wider cursor-not-allowed"
            >
              Create Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
