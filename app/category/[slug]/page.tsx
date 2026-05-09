'use client'

import { useState, useMemo } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FilterSidebar from '@/components/category/FilterSidebar'
import SortDropdown from '@/components/category/SortDropdown'
import ProductGrid from '@/components/product/ProductGrid'
import { getCategoryBySlug } from '@/lib/categories'
import { getProductsByCategory } from '@/lib/products'
import type { FilterState, SortOption } from '@/types'
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { use } from 'react'

const DEFAULT_FILTERS: FilterState = {
  priceMin: 0,
  priceMax: 200,
  brands: [],
  inStockOnly: false,
  tags: [],
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const allProducts = getProductsByCategory(slug)
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortOption>('featured')
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => {
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false
      if (filters.inStockOnly && !p.inStock) return false
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false
      if (filters.tags.length && !filters.tags.some((t) => p.tags.includes(t))) return false
      return true
    })

    switch (sort) {
      case 'price-asc': result = [...result].sort((a, b) => a.price - b.price); break
      case 'price-desc': result = [...result].sort((a, b) => b.price - a.price); break
      case 'newest': result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break
      default: result = [...result].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
    }
    return result
  }, [allProducts, filters, sort])

  return (
    <div>
      {/* Category hero banner */}
      <div className="relative overflow-hidden bg-surface-800 border-b border-surface-600">
        <div className="absolute inset-0">
          <Image src={category.image} alt={category.name} fill className="object-cover opacity-20" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-800 via-surface-800/90 to-surface-800/60" />
          <div className="absolute inset-0 bg-grid opacity-40" />
        </div>
        <div className="container-site relative py-12">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: category.name }]} />
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-50 mt-4 mb-3">{category.name}</h1>
          <p className="text-zinc-400 max-w-2xl leading-relaxed">{category.longDescription}</p>
          {/* Subcategory pills */}
          {category.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {category.subcategories.map((sub) => (
                <a
                  key={sub.id}
                  href={`?sub=${sub.slug}`}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-surface-500 text-zinc-400 hover:border-brand/50 hover:text-brand transition-colors bg-surface-700"
                >
                  {sub.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container-site py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-surface-600">
          <button
            onClick={() => setFilterDrawerOpen((o) => !o)}
            className="flex items-center gap-2 btn-secondary py-2 px-4 text-sm lg:hidden"
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4" />
            Filters
          </button>
          <SortDropdown value={sort} onChange={setSort} totalCount={filtered.length} />
        </div>

        <div className="flex gap-8">
          {/* Desktop filter sidebar */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <FilterSidebar filters={filters} onChange={setFilters} />
          </div>

          {/* Products */}
          <div className="flex-1 min-w-0">
            <ProductGrid products={filtered} emptyMessage={`No ${category.name} match your filters.`} />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setFilterDrawerOpen(false)} />
          <div className="relative w-72 max-w-full bg-surface-800 h-full overflow-y-auto border-r border-surface-600 p-5 animate-slide-right">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-zinc-200">Filters</span>
              <button onClick={() => setFilterDrawerOpen(false)}>
                <XMarkIcon className="h-5 w-5 text-zinc-400" />
              </button>
            </div>
            <FilterSidebar filters={filters} onChange={setFilters} />
          </div>
        </div>
      )}

      {/* Category SEO content */}
      <section className="container-site py-10 max-w-3xl">
        <h2 className="text-xl font-bold text-zinc-200 mb-3">About {category.name} at VapeVault AU</h2>
        <p className="text-zinc-500 text-sm leading-relaxed">{category.longDescription}</p>
        {category.keywords.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {category.keywords.slice(0, 6).map((kw) => (
              <span key={kw} className="px-2 py-1 text-xs bg-surface-700 text-zinc-500 rounded border border-surface-500">
                {kw}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
