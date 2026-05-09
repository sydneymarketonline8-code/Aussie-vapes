import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutline } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md'
}

export default function StarRating({ rating, reviewCount, size = 'sm' }: StarRatingProps) {
  const full = Math.floor(rating)
  const empty = 5 - full
  const iconClass = clsx(size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5')

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: full }).map((_, i) => (
          <StarIcon key={`f-${i}`} className={clsx(iconClass, 'text-amber-400')} />
        ))}
        {Array.from({ length: empty }).map((_, i) => (
          <StarOutline key={`e-${i}`} className={clsx(iconClass, 'text-surface-500')} />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-zinc-500">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  )
}
