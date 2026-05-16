import type { ComponentType, SVGProps } from 'react'
import clsx from 'clsx'
import { ArrowUpRightIcon, ArrowDownRightIcon } from '@heroicons/react/24/solid'

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>

interface AdminKpiCardProps {
  label: string
  value: string
  previousValue: string
  percentChange: number
  Icon?: HeroIcon
  accent?: string
}

export default function AdminKpiCard({
  label,
  value,
  previousValue,
  percentChange,
  Icon,
  accent = '#3b3b3b',
}: AdminKpiCardProps) {
  const up = percentChange >= 0
  return (
    <div className="bg-white border border-line rounded-sm p-5 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <p className="font-display text-[11px] uppercase tracking-widest font-bold text-mute">
          {label}
        </p>
        {Icon && (
          <div
            className="h-9 w-9 rounded-md flex items-center justify-center"
            style={{ background: `${accent}15`, color: accent }}
          >
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <p className="font-display text-3xl font-bold text-ink leading-none">{value}</p>
      <div className="mt-3 flex items-center gap-2">
        <span
          className={clsx(
            'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm text-[11px] font-display font-bold',
            up ? 'bg-success/10 text-success' : 'bg-price/10 text-price'
          )}
        >
          {up ? (
            <ArrowUpRightIcon className="h-3 w-3" />
          ) : (
            <ArrowDownRightIcon className="h-3 w-3" />
          )}
          {up ? '+' : ''}
          {percentChange}%
        </span>
        <span className="text-[11px] text-mute font-display">
          vs {previousValue} last month
        </span>
      </div>
    </div>
  )
}
