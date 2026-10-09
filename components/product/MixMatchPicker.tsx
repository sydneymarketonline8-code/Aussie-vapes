'use client'

import { useEffect, useState } from 'react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { formatMixMatchSelection } from '@/lib/mix-match'

interface MixMatchPickerProps {
  flavours: string[]
  size: number
  /** Called with the formatted selection once exactly `size` devices are picked, otherwise undefined. */
  onChange: (selection: string | undefined) => void
}

export default function MixMatchPicker({ flavours, size, onChange }: MixMatchPickerProps) {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const total = Object.values(counts).reduce((s, n) => s + n, 0)
  const remaining = size - total

  useEffect(() => {
    onChange(total === size ? formatMixMatchSelection(counts) : undefined)
  }, [counts, total, size, onChange])

  function bump(flavour: string, delta: number) {
    setCounts((c) => {
      const picked = Object.values(c).reduce((s, n) => s + n, 0)
      if (delta > 0 && picked >= size) return c
      return { ...c, [flavour]: Math.max(0, (c[flavour] ?? 0) + delta) }
    })
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="block font-display text-xs font-bold text-ink uppercase tracking-widest">
          Choose {size} Flavours
        </label>
        <span className={clsx('text-xs font-semibold', remaining === 0 ? 'text-success' : 'text-mute')}>
          {remaining === 0 ? `All ${size} picked ✓` : `${total} of ${size} picked — ${remaining} to go`}
        </span>
      </div>
      <ul className="divide-y divide-line border border-line rounded-sm bg-white">
        {flavours.map((flavour) => {
          const n = counts[flavour] ?? 0
          return (
            <li key={flavour} className="flex items-center justify-between gap-3 px-3 py-2">
              <span className={clsx('text-sm', n > 0 ? 'text-ink font-semibold' : 'text-body')}>{flavour}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => bump(flavour, -1)}
                  disabled={n === 0}
                  aria-label={`Remove one ${flavour}`}
                  className="p-1.5 rounded-sm border border-line text-ink hover:border-ink disabled:opacity-30 disabled:hover:border-line"
                >
                  <MinusIcon className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-ink tabular-nums">{n}</span>
                <button
                  type="button"
                  onClick={() => bump(flavour, 1)}
                  disabled={remaining === 0}
                  aria-label={`Add one ${flavour}`}
                  className="p-1.5 rounded-sm border border-line text-ink hover:border-ink disabled:opacity-30 disabled:hover:border-line"
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
