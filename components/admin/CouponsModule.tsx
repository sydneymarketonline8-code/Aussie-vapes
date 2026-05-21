'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { AdminCoupon } from '@/lib/admin-coupons-types'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { createCoupon, toggleCouponActive, deleteCoupon } from '@/app/admin/coupons/actions'

export default function CouponsModule({ coupons }: { coupons: AdminCoupon[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const [pendingId, setPendingId] = useState<string | null>(null)

  function onToggle(c: AdminCoupon) {
    setPendingId(c.id)
    startTransition(async () => {
      await toggleCouponActive(c.id, !c.isActive)
      setPendingId(null)
      router.refresh()
    })
  }

  function onDelete(c: AdminCoupon) {
    if (!confirm(`Delete coupon ${c.code}? This cannot be undone.`)) return
    setPendingId(c.id)
    startTransition(async () => {
      await deleteCoupon(c.id)
      setPendingId(null)
      router.refresh()
    })
  }

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
                <th className="px-5 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-mute text-sm">
                    No coupons yet. Click <strong>New Coupon</strong> to create one.
                  </td>
                </tr>
              )}
              {coupons.map((c) => {
                const expired = c.expiresAt ? new Date(c.expiresAt) < new Date() : false
                const exhausted = c.maxUses > 0 && c.uses >= c.maxUses
                const live = c.isActive && !expired && !exhausted
                const rowPending = pending && pendingId === c.id

                return (
                  <tr key={c.id} className={`hover:bg-soft-50 ${rowPending ? 'opacity-50' : ''}`}>
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
                      {c.expiresAt
                        ? new Date(c.expiresAt).toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' })
                        : <span className="text-mute">never</span>}
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
                        onClick={() => onToggle(c)}
                        disabled={rowPending}
                        className="font-display text-xs uppercase tracking-widest font-bold text-price hover:underline mr-3 disabled:opacity-50"
                      >
                        {c.isActive ? 'Pause' : 'Activate'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(c)}
                        disabled={rowPending}
                        className="font-display text-xs uppercase tracking-widest font-bold text-sale hover:underline disabled:opacity-50"
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

      {open && (
        <CouponModal
          onClose={() => setOpen(false)}
          onCreated={() => {
            setOpen(false)
            router.refresh()
          }}
        />
      )}
    </>
  )
}

function CouponModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: '10',
    minOrderValue: '0',
    maxUses: '0',
    expiresAt: '',
    isActive: true,
  })

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = await createCoupon({
        code: form.code,
        type: form.type,
        value: Number(form.value),
        minOrderValue: Number(form.minOrderValue) || 0,
        maxUses: Number(form.maxUses) || 0,
        expiresAt: form.expiresAt || null,
        isActive: form.isActive,
      })
      if (!result.ok) {
        setError(result.error)
        return
      }
      onCreated()
    })
  }

  const labelCls = 'block font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-1'
  const inputCls = 'w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body focus:outline-none focus:border-ink'

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

        <form className="p-5 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className={labelCls} htmlFor="code">Code *</label>
            <input
              id="code"
              value={form.code}
              onChange={(e) => set('code', e.target.value.toUpperCase())}
              className={`${inputCls} font-mono uppercase`}
              placeholder="SUMMER25"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} htmlFor="type">Type</label>
              <select
                id="type"
                value={form.type}
                onChange={(e) => set('type', e.target.value as 'percentage' | 'fixed')}
                className={inputCls}
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="value">Value *</label>
              <input
                id="value"
                type="number"
                step="0.01"
                min="0.01"
                value={form.value}
                onChange={(e) => set('value', e.target.value)}
                className={inputCls}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} htmlFor="minOrder">Minimum Order ($)</label>
              <input
                id="minOrder"
                type="number"
                min="0"
                value={form.minOrderValue}
                onChange={(e) => set('minOrderValue', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="maxUses">Max Uses (0 = unlimited)</label>
              <input
                id="maxUses"
                type="number"
                min="0"
                value={form.maxUses}
                onChange={(e) => set('maxUses', e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="expiresAt">Expires At</label>
            <input
              id="expiresAt"
              type="date"
              value={form.expiresAt}
              onChange={(e) => set('expiresAt', e.target.value)}
              className={inputCls}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-body">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => set('isActive', e.target.checked)}
              className="rounded-sm border-line text-ink focus:ring-ink"
            />
            Active immediately
          </label>

          {error && (
            <div className="p-2 rounded-sm bg-sale/10 border border-sale text-sm text-sale">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="px-4 py-2 rounded-sm border border-line text-ink font-display text-xs font-bold uppercase tracking-wider hover:bg-soft-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="px-4 py-2 rounded-sm bg-price text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-sale transition-colors disabled:opacity-60"
            >
              {pending ? 'Creating…' : 'Create Coupon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
