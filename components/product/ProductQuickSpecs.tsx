import type { Product } from '@/types'
import { BeakerIcon, BoltIcon, FireIcon, SparklesIcon } from '@heroicons/react/24/outline'

interface ProductQuickSpecsProps {
  product: Product
}

/** Visually prominent quick-spec chips for the product hero — Puff Count,
 * Nicotine, Battery, Flavour count. Improves SEO via on-page entity signals
 * and gives shoppers the key info at a glance. */
export default function ProductQuickSpecs({ product }: ProductQuickSpecsProps) {
  const puffMatch = product.name.match(/(\d{3,6})\s*(?:k|K)?\s*PUFFS?/i)
  const puffs = puffMatch ? parseInt(puffMatch[1], 10) : null

  const specs = product.specifications || {}
  const nicotine = specs['Nicotine Strength'] || specs['Nicotine'] || (product.nicotineStrengths?.[0] ?? '20mg/mL')
  const battery = specs['Battery'] || (puffs && puffs >= 5000 ? 'USB-C Rechargeable' : 'Built-in')
  const eliquid = specs['E-liquid Capacity']
  const flavourCount = product.flavours?.length ?? 0

  const chips: { Icon: typeof BeakerIcon; label: string; value: string }[] = []

  if (puffs) {
    chips.push({ Icon: FireIcon, label: 'Puff Count', value: puffs.toLocaleString() })
  }
  chips.push({ Icon: BeakerIcon, label: 'Nicotine', value: nicotine.replace('/mL', '') })
  chips.push({ Icon: BoltIcon, label: 'Battery', value: battery })
  if (eliquid) {
    chips.push({ Icon: SparklesIcon, label: 'E-Liquid', value: eliquid })
  } else if (flavourCount > 0) {
    chips.push({ Icon: SparklesIcon, label: 'Flavours', value: `${flavourCount} options` })
  }

  if (chips.length === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3 p-3 bg-soft-100 rounded-sm border border-line">
      {chips.map(({ Icon, label, value }) => (
        <div key={label} className="flex items-center gap-2.5">
          <div className="h-9 w-9 flex-shrink-0 rounded-sm bg-white border border-line flex items-center justify-center">
            <Icon className="h-5 w-5 text-ink" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-[10px] uppercase tracking-wider text-mute font-bold leading-tight">{label}</p>
            <p className="font-display text-sm font-bold text-ink leading-tight truncate">{value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
