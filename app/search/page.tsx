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
        <form method="get" action="/search" className="flex max-w-xl border-2 border-ink rounded-sm overflow-hidden">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-mute" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search vapes, brands, flavours..."
              className="w-full bg-white pl-10 pr-4 py-3 text-sm text-body placeholder:text-mute focus:outline-none"
              autoFocus
            />
          </div>
          <button type="submit" className="bg-ink hover:bg-ink-dark text-white px-6 font-display uppercase tracking-wider font-bold text-sm">Search</button>
        </form>
      </div>

      {query ? (
        <>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2 lowercase">
            {results.length > 0 ? (
              <>search results for &ldquo;<span className="text-price">{query}</span>&rdquo;</>
            ) : (
              <>no results for &ldquo;<span className="text-mute">{query}</span>&rdquo;</>
            )}
          </h1>
          <p className="text-body text-sm mb-8">
            <span className="font-display font-bold text-ink">{results.length.toLocaleString()}</span> product{results.length !== 1 ? 's' : ''} found
          </p>

          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <div className="text-center py-10">
              <p className="text-body mb-6">
                Try a different search term, or browse by category:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="px-4 py-2 rounded-sm border border-line text-sm font-display uppercase tracking-wider font-bold text-body hover:border-ink hover:bg-ink hover:text-white transition-colors"
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
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2 lowercase">search aussievapes</h1>
          <p className="text-body text-sm mb-8">Browse popular categories or type a product name above.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="bg-white border border-line rounded-sm p-4 text-center hover:border-ink hover:shadow-md transition-all"
              >
                <span className="block font-display text-sm font-bold uppercase tracking-wider text-ink hover:text-price">{cat.name}</span>
                <span className="text-xs text-mute mt-1">{cat.productCount.toLocaleString()} products</span>
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
    <Suspense fallback={<div className="container-site py-20 text-mute">Loading search...</div>}>
      <SearchResults />
    </Suspense>
  )
}
