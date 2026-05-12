'use client'

import { useState, useMemo } from 'react'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FilterSidebar from '@/components/category/FilterSidebar'
import SortDropdown from '@/components/category/SortDropdown'
import ProductGrid from '@/components/product/ProductGrid'
import { getCategoryBySlug } from '@/lib/categories'
import { getProductsByCategory } from '@/lib/products'
import type { FilterState, SortOption } from '@/types'
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'
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
      <div className="relative overflow-hidden bg-soft-100 border-b border-line">
        <div className="container-site relative py-10">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: category.name }]} />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-4 mb-3 lowercase">{category.name}</h1>
          <p className="text-body max-w-2xl leading-relaxed text-sm">{category.longDescription}</p>
          {/* Subcategory pills */}
          {category.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {category.subcategories.map((sub) => (
                <a
                  key={sub.id}
                  href={`?sub=${sub.slug}`}
                  className="px-4 py-1.5 rounded-sm text-xs font-display font-bold uppercase tracking-wider border border-line text-body bg-white hover:border-ink hover:bg-ink hover:text-white transition-colors"
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
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-line">
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
          <div className="absolute inset-0 bg-black/50" onClick={() => setFilterDrawerOpen(false)} />
          <div className="relative w-80 max-w-full bg-white h-full overflow-y-auto border-r border-line p-5 animate-slide-right">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display font-bold uppercase tracking-wider text-ink">Filters</span>
              <button onClick={() => setFilterDrawerOpen(false)} aria-label="Close filters">
                <XMarkIcon className="h-5 w-5 text-ink" />
              </button>
            </div>
            <FilterSidebar filters={filters} onChange={setFilters} />
          </div>
        </div>
      )}

      {/* Category SEO content */}
      <section className="container-site py-10 max-w-3xl">
        <h2 className="font-display text-xl font-bold text-ink mb-3 lowercase">about {category.name.toLowerCase()} at vapevault au</h2>
        <p className="text-body text-sm leading-relaxed">{category.longDescription}</p>
        {category.keywords.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {category.keywords.slice(0, 6).map((kw) => (
              <span key={kw} className="px-3 py-1 text-xs bg-soft-100 text-body rounded-sm border border-line font-display uppercase tracking-wider font-semibold">
                {kw}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
