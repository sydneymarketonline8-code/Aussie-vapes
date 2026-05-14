import Link from 'next/link'
import clsx from 'clsx'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export const PAGE_SIZE = 30

interface PaginationProps {
  currentPage: number
  totalItems: number
  basePath: string
  pageSize?: number
  queryParam?: string
  /** Extra search params to preserve (e.g. q=foo&sort=price-asc). */
  extraQuery?: Record<string, string | undefined>
}

function buildHref(
  basePath: string,
  page: number,
  queryParam: string,
  extraQuery: Record<string, string | undefined>
): string {
  const params: string[] = []
  for (const [k, v] of Object.entries(extraQuery)) {
    if (v != null && v !== '') params.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
  }
  if (page > 1) params.push(`${queryParam}=${page}`)
  return params.length ? `${basePath}?${params.join('&')}` : basePath
}

function pageNumbersToRender(current: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | 'gap')[] = [1]
  if (current > 4) pages.push('gap')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let p = start; p <= end; p++) pages.push(p)
  if (current < total - 3) pages.push('gap')
  pages.push(total)
  return pages
}

export default function Pagination({
  currentPage,
  totalItems,
  basePath,
  pageSize = PAGE_SIZE,
  queryParam = 'page',
  extraQuery = {},
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  if (totalPages <= 1) return null

  const safePage = Math.min(Math.max(1, currentPage), totalPages)
  const pages = pageNumbersToRender(safePage, totalPages)
  const prevHref = buildHref(basePath, safePage - 1, queryParam, extraQuery)
  const nextHref = buildHref(basePath, safePage + 1, queryParam, extraQuery)

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t border-line"
    >
      <p className="text-sm text-mute">
        Showing page <strong className="text-ink font-display">{safePage}</strong> of{' '}
        <strong className="text-ink font-display">{totalPages}</strong>{' '}
        <span className="hidden sm:inline">·{' '}
          <span className="text-body">
            {(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, totalItems)} of{' '}
            {totalItems.toLocaleString()} products
          </span>
        </span>
      </p>

      <ul className="flex items-center gap-1">
        {/* Prev */}
        <li>
          {safePage > 1 ? (
            <Link
              href={prevHref}
              rel="prev"
              aria-label="Previous page"
              className="flex items-center gap-1 px-3 py-2 rounded-sm text-xs font-display font-bold uppercase tracking-wider border border-line text-body bg-white hover:border-ink hover:bg-ink hover:text-white transition-colors"
            >
              <ChevronLeftIcon className="h-4 w-4" /> Prev
            </Link>
          ) : (
            <span className="flex items-center gap-1 px-3 py-2 rounded-sm text-xs font-display font-bold uppercase tracking-wider border border-line text-mute bg-soft-100 cursor-not-allowed">
              <ChevronLeftIcon className="h-4 w-4" /> Prev
            </span>
          )}
        </li>

        {pages.map((p, i) =>
          p === 'gap' ? (
            <li key={`gap-${i}`} className="px-2 text-mute" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={p}>
              <Link
                href={buildHref(basePath, p, queryParam, extraQuery)}
                aria-label={`Page ${p}`}
                aria-current={p === safePage ? 'page' : undefined}
                className={clsx(
                  'flex items-center justify-center w-10 h-10 rounded-sm text-sm font-display font-bold tracking-wider border transition-colors',
                  p === safePage
                    ? 'border-ink bg-ink text-white'
                    : 'border-line text-body bg-white hover:border-ink'
                )}
              >
                {p}
              </Link>
            </li>
          )
        )}

        {/* Next */}
        <li>
          {safePage < totalPages ? (
            <Link
              href={nextHref}
              rel="next"
              aria-label="Next page"
              className="flex items-center gap-1 px-3 py-2 rounded-sm text-xs font-display font-bold uppercase tracking-wider border border-line text-body bg-white hover:border-ink hover:bg-ink hover:text-white transition-colors"
            >
              Next <ChevronRightIcon className="h-4 w-4" />
            </Link>
          ) : (
            <span className="flex items-center gap-1 px-3 py-2 rounded-sm text-xs font-display font-bold uppercase tracking-wider border border-line text-mute bg-soft-100 cursor-not-allowed">
              Next <ChevronRightIcon className="h-4 w-4" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}

/** Slice helper for pagination. */
export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE): T[] {
  const safePage = Math.max(1, page)
  const start = (safePage - 1) * pageSize
  return items.slice(start, start + pageSize)
}

/** Parse ?page=N safely from search params. */
export function parsePage(value: string | string[] | undefined): number {
  if (!value) return 1
  const v = Array.isArray(value) ? value[0] : value
  const n = parseInt(v, 10)
  if (!Number.isFinite(n) || n < 1) return 1
  return n
}
