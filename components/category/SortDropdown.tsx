'use client'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import type { SortOption } from '@/types'

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
]

interface SortDropdownProps {
  value: SortOption
  onChange: (v: SortOption) => void
  totalCount: number
}

export default function SortDropdown({ value, onChange, totalCount }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-4">
      <p className="text-sm text-zinc-500 hidden sm:block">
        {totalCount} product{totalCount !== 1 ? 's' : ''}
      </p>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none input-base py-2 pr-9 text-sm cursor-pointer min-w-[180px]"
          aria-label="Sort products"
        >
          {OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
      </div>
    </div>
  )
}
