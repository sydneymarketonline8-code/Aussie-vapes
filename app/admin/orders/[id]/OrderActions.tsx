'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  markOrderPaid,
  updateOrderStatus,
  updateOrderTracking,
  updateOrderNotes,
} from './actions'
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

export function TrackingForm({
  orderId,
  initialCarrier,
  initialNumber,
}: {
  orderId: string
  initialCarrier: string | null
  initialNumber: string | null
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [carrier, setCarrier] = useState(initialCarrier ?? '')
  const [number, setNumber] = useState(initialNumber ?? '')
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaved(false)
    startTransition(async () => {
      const result = await updateOrderTracking(orderId, carrier, number)
      if (!result.ok) {
        setError(result.error ?? 'Update failed')
      } else {
        setSaved(true)
        router.refresh()
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label htmlFor="carrier" className="block font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-1">
          Carrier
        </label>
        <select
          id="carrier"
          value={carrier}
          onChange={(e) => setCarrier(e.target.value)}
          disabled={pending}
          className="w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body"
        >
          <option value="">Select carrier…</option>
          <option value="AusPost">AusPost</option>
          <option value="Sendle">Sendle</option>
          <option value="Couriers Please">Couriers Please</option>
          <option value="Aramex">Aramex</option>
          <option value="StarTrack">StarTrack</option>
        </select>
      </div>
      <div>
        <label htmlFor="trackingNumber" className="block font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-1">
          Tracking Number
        </label>
        <input
          id="trackingNumber"
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          disabled={pending}
          placeholder="e.g. AU1234567890"
          className="w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body font-mono"
        />
      </div>
      <div className="sm:col-span-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2 rounded-sm bg-price text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-sale transition-colors disabled:opacity-60"
        >
          {pending ? 'Saving…' : 'Save Tracking'}
        </button>
        {saved && <span className="text-[11px] text-success font-display font-bold uppercase tracking-wider">✓ Saved</span>}
        {error && <span className="text-[11px] text-sale">{error}</span>}
      </div>
    </form>
  )
}

export function NotesEditor({
  orderId,
  initialNotes,
}: {
  orderId: string
  initialNotes: string | null
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [notes, setNotes] = useState(initialNotes ?? '')
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  function onSave() {
    setError(null)
    setSaved(false)
    startTransition(async () => {
      const result = await updateOrderNotes(orderId, notes)
      if (!result.ok) {
        setError(result.error ?? 'Update failed')
      } else {
        setSaved(true)
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-2">
      <textarea
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        disabled={pending}
        placeholder="Visible only to staff — not shown to the customer."
        className="w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body resize-y"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="px-3 py-1.5 rounded-sm bg-ink text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-ink-dark disabled:opacity-60"
        >
          {pending ? 'Saving…' : 'Save Note'}
        </button>
        {saved && <span className="text-[11px] text-success font-display font-bold uppercase tracking-wider">✓ Saved</span>}
        {error && <span className="text-[11px] text-sale">{error}</span>}
      </div>
    </div>
  )
}
