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
  instock: 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/60 text-green-400 border border-green-800',
  outofstock: 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 text-zinc-500',
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
