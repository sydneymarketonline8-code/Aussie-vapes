'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const PAGE_SIZE = 25

interface AdminProductTableProps {
  products: Product[]
}

export default function AdminProductTable({ products }: AdminProductTableProps) {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [stock, setStock] = useState<'all' | 'in' | 'low' | 'out'>('all')
  const [page, setPage] = useState(1)

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category))
    return Array.from(set).sort()
  }, [products])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (stock === 'in' && !p.inStock) return false
      if (stock === 'out' && p.inStock) return false
      if (stock === 'low' && (p.stockCount == null || p.stockCount >= 20)) return false
      if (term) {
        const hay = `${p.name} ${p.brand} ${p.sku} ${p.id}`.toLowerCase()
        if (!hay.includes(term)) return false
      }
      return true
    })
  }, [products, q, category, stock])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const slice = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <div className="bg-white border border-line rounded-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4 border-b border-line">
        <div className="relative flex-1 min-w-[220px]">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setPage(1)
            }}
            placeholder="Search name, brand, SKU, ID…"
            className="w-full bg-white border border-line rounded-sm pl-9 pr-3 py-2 text-sm text-body placeholder:text-mute focus:outline-none focus:border-ink"
          />
        </div>
        <select
          aria-label="Filter by category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            setPage(1)
          }}
          className="bg-white border border-line rounded-sm px-3 py-2 text-sm text-body focus:outline-none focus:border-ink"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          aria-label="Filter by stock status"
          value={stock}
          onChange={(e) => {
            setStock(e.target.value as typeof stock)
            setPage(1)
          }}
          className="bg-white border border-line rounded-sm px-3 py-2 text-sm text-body focus:outline-none focus:border-ink"
        >
          <option value="all">All stock</option>
          <option value="in">In stock</option>
          <option value="low">Low stock (&lt; 20)</option>
          <option value="out">Out of stock</option>
        </select>
        <span className="ml-auto text-xs text-mute font-display uppercase tracking-wider">
          {filtered.length.toLocaleString()} of {products.length.toLocaleString()}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-soft-50 text-mute font-display uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-2.5 text-left">Product</th>
              <th className="px-4 py-2.5 text-left">SKU</th>
              <th className="px-4 py-2.5 text-left">Category</th>
              <th className="px-4 py-2.5 text-right">Price</th>
              <th className="px-4 py-2.5 text-right">Stock</th>
              <th className="px-4 py-2.5 text-right">Rating</th>
              <th className="px-4 py-2.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {slice.map((p) => (
              <tr key={p.id} className="hover:bg-soft-50">
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 flex-shrink-0 bg-soft-100 border border-line rounded-sm overflow-hidden">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="40px"
                        className="object-contain p-0.5"
                        unoptimized
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-semibold text-ink line-clamp-1">{p.name}</p>
                      <p className="text-xs text-mute">{p.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 font-mono text-xs text-mute">{p.sku}</td>
                <td className="px-4 py-2 text-xs text-body">{p.category}</td>
                <td className="px-4 py-2 text-right font-display font-bold text-price">
                  ${p.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-right">
                  {p.stockCount != null ? (
                    <span
                      className={
                        p.stockCount < 20
                          ? 'font-display font-bold text-warning'
                          : 'font-display text-ink'
                      }
                    >
                      {p.stockCount}
                    </span>
                  ) : (
                    <span className="text-mute text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-2 text-right">
                  <span className="font-display text-ink">{p.rating.toFixed(1)}</span>
                  <span className="text-[10px] text-mute ml-1">({p.reviewCount})</span>
                </td>
                <td className="px-4 py-2 text-right">
                  <Link
                    href={`/admin/products/${p.slug}`}
                    className="font-display text-xs uppercase tracking-widest font-bold text-price hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {slice.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-mute text-sm">
                  No products match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-line">
          <p className="text-xs text-mute font-display">
            Page {safePage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="px-3 py-1.5 rounded-sm text-xs font-display font-bold uppercase tracking-wider border border-line text-body bg-white hover:border-ink disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="px-3 py-1.5 rounded-sm text-xs font-display font-bold uppercase tracking-wider border border-line text-body bg-white hover:border-ink disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
