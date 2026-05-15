import type { ComponentType, SVGProps } from 'react'
import clsx from 'clsx'

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>

interface AdminStatCardProps {
  label: string
  value: string | number
  delta?: string
  trend?: 'up' | 'down' | 'flat'
  Icon?: HeroIcon
  accent?: string
}

export default function AdminStatCard({
  label,
  value,
  delta,
  trend,
  Icon,
  accent = '#3b3b3b',
}: AdminStatCardProps) {
  return (
    <div className="bg-white border border-line rounded-sm p-5 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <p className="font-display text-[11px] uppercase tracking-widest font-bold text-mute">
          {label}
        </p>
        {Icon && (
          <div
            className="h-8 w-8 rounded-sm flex items-center justify-center"
            style={{ background: `${accent}15`, color: accent }}
          >
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <p className="font-display text-3xl font-bold text-ink leading-none">{value}</p>
      {delta && (
        <p
          className={clsx(
            'mt-2 text-xs font-display font-semibold inline-flex items-center gap-1',
            trend === 'up' && 'text-success',
            trend === 'down' && 'text-price',
            (!trend || trend === 'flat') && 'text-mute'
          )}
        >
          {trend === 'up' && '↑'}
          {trend === 'down' && '↓'}
          {delta}
        </p>
      )}
    </div>
  )
}
