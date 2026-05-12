import clsx from 'clsx'

type BadgeVariant = 'new' | 'sale' | 'bestseller' | 'instock' | 'outofstock'

interface BadgeProps {
  variant: BadgeVariant
  className?: string
}

const map: Record<BadgeVariant, string> = {
  new: 'badge-new',
  sale: 'badge-sale',
  bestseller: 'badge-bestseller',
  instock: 'inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-bold uppercase tracking-wider bg-success/10 text-success border border-success/30 font-display',
  outofstock: 'inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-bold uppercase tracking-wider bg-soft-200 text-mute border border-line font-display',
}

const label: Record<BadgeVariant, string> = {
  new: 'New',
  sale: 'Sale',
  bestseller: 'Best Seller',
  instock: 'In Stock',
  outofstock: 'Out of Stock',
}

export default function Badge({ variant, className }: BadgeProps) {
  return (
    <span className={clsx(map[variant], className)}>{label[variant]}</span>
  )
}
