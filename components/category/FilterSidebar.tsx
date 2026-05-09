'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import type { FilterState } from '@/types'
import clsx from 'clsx'

const BRANDS = ['CloudBurst', 'ArcBlast', 'ZephyrFlex', 'StrikePod', 'NovaPod', 'SlimPulse', 'CoreDrive', 'SaltSurge', 'IceWave', 'TropicRush']

interface FilterSidebarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-surface-600 py-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-sm font-semibold text-zinc-300 hover:text-zinc-100 transition-colors"
      >
        {title}
        <ChevronDownIcon className={clsx('h-4 w-4 text-zinc-500 transition-transform', open && 'rotate-180')} />
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
    <aside className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">Filters</h2>
        {hasFilters ? (
          <button
            onClick={() => onChange({ priceMin: 0, priceMax: 200, brands: [], inStockOnly: false, tags: [] })}
            className="text-xs text-brand hover:text-brand-light transition-colors"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {/* Price range */}
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
          <span className="text-zinc-600 text-sm">—</span>
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
        <p className="text-xs text-zinc-600 mt-1">${filters.priceMin} – ${filters.priceMax} AUD</p>
      </AccordionSection>

      {/* In stock */}
      <AccordionSection title="Availability">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="rounded border-surface-500 bg-surface-700 text-brand focus:ring-brand"
          />
          <span className="text-sm text-zinc-400">In stock only</span>
        </label>
      </AccordionSection>

      {/* Brands */}
      <AccordionSection title="Brand">
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded border-surface-500 bg-surface-700 text-brand focus:ring-brand"
              />
              <span className="text-sm text-zinc-400">{brand}</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      {/* Tags */}
      <AccordionSection title="Features">
        <div className="flex flex-wrap gap-2">
          {['disposable', 'rechargeable', 'pod-system', 'nic-salt', 'bestseller', 'new', 'bundle'].map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={clsx(
                'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                filters.tags.includes(tag)
                  ? 'border-brand bg-brand/10 text-brand'
                  : 'border-surface-500 text-zinc-500 hover:border-zinc-400'
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
