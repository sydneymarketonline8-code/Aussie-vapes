'use client'

import { useState, useMemo, use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FilterSidebar from '@/components/category/FilterSidebar'
import SortDropdown from '@/components/category/SortDropdown'
import ProductGrid from '@/components/product/ProductGrid'
import { getCategoryBySlug } from '@/lib/categories'
import { getProductsByCategory } from '@/lib/products'
import type { FilterState, SortOption } from '@/types'
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aussievapes.com.au'

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
  const [activeSub, setActiveSub] = useState<string | null>(null)

  // Counts per subcategory
  const subcategoryCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of allProducts) {
      if (p.subcategory) counts.set(p.subcategory, (counts.get(p.subcategory) || 0) + 1)
    }
    return counts
  }, [allProducts])

  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => {
      if (activeSub && p.subcategory !== activeSub) return false
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
  }, [allProducts, filters, sort, activeSub])

  const minPrice = allProducts.length ? Math.min(...allProducts.map((p) => p.price)) : 0
  const maxPrice = allProducts.length ? Math.max(...allProducts.map((p) => p.price)) : 0
  const avgRating =
    allProducts.length > 0
      ? allProducts.reduce((s, p) => s + p.rating, 0) / allProducts.length
      : 4.7

  // JSON-LD structured data
  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: category.name, item: `${SITE_URL}/category/${category.slug}` },
    ],
  }
  const itemListJson = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.name,
    description: category.description,
    url: `${SITE_URL}/category/${category.slug}`,
    numberOfItems: allProducts.length,
    itemListElement: allProducts.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${SITE_URL}/product/${p.slug}`,
    })),
  }
  const faqJson = category.faqs && {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: category.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJson) }} />
      {faqJson && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      )}

      {/* Category hero banner */}
      <section className="relative overflow-hidden bg-soft-100 border-b border-line">
        <div className="container-site relative py-10 lg:py-14">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: category.name }]} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end mt-5">
            <div className="lg:col-span-2">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-2">
                {category.productCount.toLocaleString()} Products In Stock
              </p>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink leading-[1.05] mb-3 lowercase">
                {category.name}
              </h1>
              {category.intro && (
                <p className="text-body text-base leading-relaxed max-w-2xl mb-3">{category.intro}</p>
              )}
              <p className="text-body text-sm leading-relaxed max-w-2xl">{category.description}</p>
              {/* Subcategory pills — interactive filters */}
              {category.subcategories.length > 0 && (
                <div className="mt-5">
                  <p className="font-display text-[11px] uppercase tracking-[0.3em] text-mute font-bold mb-2">
                    Shop by Sub-Category
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveSub(null)}
                      className={`px-4 py-2 rounded-sm text-xs font-display font-bold uppercase tracking-wider border transition-colors ${
                        activeSub === null
                          ? 'border-ink bg-ink text-white'
                          : 'border-line text-body bg-white hover:border-ink'
                      }`}
                    >
                      All <span className="opacity-70 ml-1">({allProducts.length.toLocaleString()})</span>
                    </button>
                    {category.subcategories.map((sub) => {
                      const count = subcategoryCounts.get(sub.slug) ?? 0
                      const isActive = activeSub === sub.slug
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setActiveSub(isActive ? null : sub.slug)}
                          disabled={count === 0}
                          className={`px-4 py-2 rounded-sm text-xs font-display font-bold uppercase tracking-wider border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                            isActive
                              ? 'border-ink bg-ink text-white'
                              : 'border-line text-body bg-white hover:border-ink'
                          }`}
                        >
                          {sub.name} <span className="opacity-70 ml-1">({count})</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Stats card */}
            <div className="bg-white border border-line rounded-sm p-6 shadow-sm hidden lg:block">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="font-display text-3xl font-bold text-ink">{allProducts.length.toLocaleString()}</p>
                  <p className="text-xs text-mute uppercase tracking-wider font-display font-semibold mt-1">In Stock</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-ink">${minPrice.toFixed(0)}+</p>
                  <p className="text-xs text-mute uppercase tracking-wider font-display font-semibold mt-1">From</p>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-line text-center">
                <p className="font-display text-2xl font-bold text-ink">★ {avgRating.toFixed(1)}</p>
                <p className="text-xs text-mute uppercase tracking-wider font-display font-semibold mt-1">Average Rating</p>
              </div>
              <div className="mt-5 pt-5 border-t border-line space-y-2 text-xs text-body">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-success flex-shrink-0" />
                  Authentic AU stock
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-success flex-shrink-0" />
                  Same-day Sydney dispatch
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      {category.highlights && category.highlights.length > 0 && (
        <section className="bg-white border-b border-line">
          <div className="container-site py-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {category.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2 text-xs text-body">
                  <CheckCircleIcon className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
          <div className="hidden lg:block w-60 flex-shrink-0">
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

      {/* Long-form SEO content */}
      <section className="bg-soft-100 border-t border-line py-14">
        <div className="container-site grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink mb-4 lowercase">
                about {category.name.toLowerCase()} at aussievapes
              </h2>
              <p className="text-body leading-relaxed">{category.longDescription}</p>
            </div>

            {category.buyerGuide && category.buyerGuide.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-ink mb-5 lowercase">
                  {category.name.toLowerCase()} buyer&apos;s guide
                </h2>
                <div className="space-y-5">
                  {category.buyerGuide.map((g) => (
                    <article key={g.title} className="bg-white border-l-4 border-price p-5 rounded-sm">
                      <h3 className="font-display text-lg font-bold text-ink mb-2">{g.title}</h3>
                      <p className="text-body text-sm leading-relaxed">{g.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Keyword cloud sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-line rounded-sm p-6">
              <h3 className="font-display text-base font-bold text-ink uppercase tracking-wider mb-4 pb-3 border-b border-line">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.keywords.map((kw) => (
                  <Link
                    key={kw}
                    href={`/search?q=${encodeURIComponent(kw)}`}
                    className="px-3 py-1 text-xs bg-soft-100 hover:bg-ink hover:text-white text-body rounded-sm border border-line transition-colors font-display"
                  >
                    {kw}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      {category.faqs && category.faqs.length > 0 && (
        <section className="bg-white border-t border-line py-14">
          <div className="container-site max-w-3xl">
            <div className="text-center mb-10">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-2">
                Frequently Asked Questions
              </p>
              <h2 className="font-display text-3xl font-bold text-ink lowercase">
                {category.name.toLowerCase()} faq
              </h2>
            </div>

            <div className="space-y-4">
              {category.faqs.map((faq, i) => (
                <details key={i} className="group bg-soft-100 border border-line rounded-sm overflow-hidden">
                  <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4 font-display font-bold text-ink hover:bg-soft-200 transition-colors">
                    <span>{faq.question}</span>
                    <span className="font-display text-price text-xl group-open:rotate-45 transition-transform flex-shrink-0">
                      +
                    </span>
                  </summary>
                  <div className="p-5 pt-0 text-body leading-relaxed text-sm">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
