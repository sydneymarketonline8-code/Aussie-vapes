'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { markOrderPaid, updateOrderStatus } from './actions'
import type { OrderStatus } from '@/lib/admin-orders-types'

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'refunded', label: 'Refunded' },
]

export function StatusSelect({
  orderId,
  current,
}: {
  orderId: string
  current: OrderStatus
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [value, setValue] = useState<OrderStatus>(current)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="status" className="font-display text-[11px] uppercase tracking-wider text-mute font-bold">
        Update Status
      </label>
      <select
        id="status"
        value={value}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value as OrderStatus
          setValue(next)
          setError(null)
          startTransition(async () => {
            const result = await updateOrderStatus(orderId, next)
            if (!result.ok) {
              setError(result.error ?? 'Update failed')
              setValue(current)
            } else {
              router.refresh()
            }
          })
        }}
        className="bg-white border border-line rounded-sm px-3 py-1.5 text-xs text-body focus:outline-none disabled:bg-soft-50 disabled:text-mute disabled:cursor-not-allowed"
      >
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <span className="text-[11px] text-sale">{error}</span>}
    </div>
  )
}

export function MarkPaidButton({
  orderId,
  paymentReference,
}: {
  orderId: string
  paymentReference: string | null
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function onClick() {
    if (!confirm(
      `Mark this order paid? Confirm you've received the transfer matching reference ${paymentReference ?? '(none)'}.`,
    )) return
    setError(null)
    startTransition(async () => {
      const result = await markOrderPaid(orderId)
      if (!result.ok) {
        setError(result.error ?? 'Failed to mark as paid')
      } else {
        router.refresh()
      }
    })
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className="w-full px-3 py-2 rounded-sm bg-success text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-success/90 disabled:opacity-60"
      >
        {pending ? 'Marking…' : 'Mark as Paid'}
      </button>
      {error && <p className="mt-1 text-[11px] text-sale">{error}</p>}
    </div>
  )
}
