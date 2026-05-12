'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import type { FilterState } from '@/types'
import clsx from 'clsx'

const BRANDS = ['Alfakher', 'IGET', 'HQD', 'Gunnpod', 'Lost Mary', 'RAZ', 'Vozol', 'Bang', 'Elux', 'Mr Fog']

interface FilterSidebarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-line py-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full font-display text-sm font-bold uppercase tracking-wider text-ink hover:text-price transition-colors"
      >
        {title}
        <ChevronDownIcon className={clsx('h-4 w-4 text-mute transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  )
}

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  function toggleBrand(brand: string) {
    const brands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]
    onChange({ ...filters, brands })
  }

  function toggleTag(tag: string) {
    const tags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag]
    onChange({ ...filters, tags })
  }

  const hasFilters = filters.brands.length || filters.inStockOnly || filters.priceMax < 200 || filters.tags.length

  return (
    <aside className="w-full bg-white border border-line rounded-sm p-5">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display text-base font-bold uppercase tracking-wider text-ink">Filters</h2>
        {hasFilters ? (
          <button
            onClick={() => onChange({ priceMin: 0, priceMax: 200, brands: [], inStockOnly: false, tags: [] })}
            className="text-xs text-price hover:underline font-display uppercase tracking-wider font-semibold"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <AccordionSection title="Price Range">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={filters.priceMax}
            value={filters.priceMin}
            onChange={(e) => onChange({ ...filters, priceMin: Number(e.target.value) })}
            className="input-base py-2 text-xs"
            placeholder="Min"
          />
          <span className="text-mute text-sm">—</span>
          <input
            type="number"
            min={filters.priceMin}
            max={500}
            value={filters.priceMax}
            onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
            className="input-base py-2 text-xs"
            placeholder="Max"
          />
        </div>
        <p className="text-xs text-mute mt-1">${filters.priceMin} – ${filters.priceMax} AUD</p>
      </AccordionSection>

      <AccordionSection title="Availability">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="rounded-sm border-line bg-white text-ink focus:ring-ink"
          />
          <span className="text-sm text-body">In stock only</span>
        </label>
      </AccordionSection>

      <AccordionSection title="Brand">
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded-sm border-line bg-white text-ink focus:ring-ink"
              />
              <span className="text-sm text-body">{brand}</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Features">
        <div className="flex flex-wrap gap-2">
          {['disposable', 'rechargeable', 'pod-system', 'nic-salt', 'bestseller', 'new', 'bundle'].map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={clsx(
                'px-2.5 py-1 rounded-sm text-xs font-medium border transition-colors',
                filters.tags.includes(tag)
                  ? 'border-ink bg-ink text-white'
                  : 'border-line text-body bg-white hover:border-ink'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </AccordionSection>
    </aside>
  )
}
