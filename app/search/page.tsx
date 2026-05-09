'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { searchProducts } from '@/lib/products'
import ProductGrid from '@/components/product/ProductGrid'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const results = useMemo(() => (query.trim() ? searchProducts(query) : []), [query])

  return (
    <div className="container-site py-10">
      <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />

      <div className="mt-4 mb-8">
        {/* Search box */}
        <form method="get" action="/search" className="flex gap-3 max-w-lg">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search vapes, brands, flavours..."
              className="input-base pl-10"
              autoFocus
            />
          </div>
          <button type="submit" className="btn-primary px-5">Search</button>
        </form>
      </div>

      {query ? (
        <>
          <h1 className="text-2xl font-bold text-zinc-100 mb-2">
            {results.length > 0 ? (
              <>Search results for &ldquo;<span className="text-brand">{query}</span>&rdquo;</>
            ) : (
              <>No results for &ldquo;<span className="text-zinc-500">{query}</span>&rdquo;</>
            )}
          </h1>
          <p className="text-zinc-500 text-sm mb-8">
            {results.length} product{results.length !== 1 ? 's' : ''} found
          </p>

          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <div className="text-center py-10">
              <p className="text-zinc-500 mb-6">
                Try a different search term, or browse by category:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="px-4 py-2 rounded-full border border-surface-500 text-sm text-zinc-400 hover:border-brand/50 hover:text-brand transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 mb-2">Search VapeVault AU</h1>
          <p className="text-zinc-500 text-sm mb-8">Browse popular categories or type a product name above.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="card card-hover p-4 text-center hover:bg-surface-600 transition-colors"
              >
                <span className="block text-sm font-semibold text-zinc-300 hover:text-brand">{cat.name}</span>
                <span className="text-xs text-zinc-600 mt-1">{cat.productCount} products</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-site py-20 text-zinc-500">Loading search...</div>}>
      <SearchResults />
    </Suspense>
  )
}
