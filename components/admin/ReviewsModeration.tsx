'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type AdminReview, type ReviewStatus } from '@/lib/admin-mock-data'
import { StarIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'

const TABS: { key: 'pending' | 'approved' | 'all'; label: string }[] = [
  { key: 'pending', label: 'Pending Approval' },
  { key: 'approved', label: 'Approved' },
  { key: 'all', label: 'All' },
]

const STATUS_STYLES: Record<ReviewStatus, string> = {
  pending: 'bg-warning/15 text-warning',
  approved: 'bg-success/15 text-success',
  rejected: 'bg-price/15 text-price',
}

export default function ReviewsModeration({ reviews }: { reviews: AdminReview[] }) {
  const [tab, setTab] = useState<'pending' | 'approved' | 'all'>('pending')

  const counts = useMemo(() => {
    return {
      pending: reviews.filter((r) => r.status === 'pending').length,
      approved: reviews.filter((r) => r.status === 'approved').length,
      all: reviews.length,
    }
  }, [reviews])

  const filtered = useMemo(() => {
    if (tab === 'all') return reviews
    if (tab === 'pending') return reviews.filter((r) => r.status === 'pending')
    return reviews.filter((r) => r.status === 'approved')
  }, [reviews, tab])

  return (
    <div className="bg-white border border-line rounded-sm">
      <div className="flex flex-wrap gap-1 px-3 pt-3 border-b border-line bg-soft-50">
        {TABS.map(({ key, label }) => {
          const active = tab === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2 font-display text-xs font-bold uppercase tracking-wider border-b-2 -mb-px transition-colors ${
                active
                  ? 'border-price text-ink bg-white'
                  : 'border-transparent text-mute hover:text-ink'
              }`}
            >
              {label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-sm ${active ? 'bg-price/10 text-price' : 'bg-soft-200 text-mute'}`}>
                {counts[key]}
              </span>
            </button>
          )
        })}
      </div>

      <ul className="divide-y divide-line">
        {filtered.map((r) => (
          <li key={r.id} className="p-5">
            <div className="flex items-start gap-4">
              <div className="relative h-14 w-14 flex-shrink-0 bg-soft-100 border border-line rounded-sm overflow-hidden">
                <Image
                  src={r.productImage}
                  alt={r.productName}
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Link
                    href={`/admin/products/${r.productSlug}`}
                    className="font-display font-bold text-ink hover:text-price"
                  >
                    {r.productName}
                  </Link>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-sm text-[10px] font-display font-bold uppercase tracking-wider ${STATUS_STYLES[r.status]}`}
                  >
                    {r.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <StarIcon
                        key={n}
                        className={`h-3.5 w-3.5 ${n <= r.rating ? 'text-warning' : 'text-line'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-mute">
                    by <strong className="text-body">{r.reviewerName}</strong> · {new Date(r.createdAt).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <h4 className="font-display font-bold text-ink text-sm">{r.title}</h4>
                <p className="text-sm text-body mt-1 leading-relaxed">{r.body}</p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  type="button"
                  disabled
                  title="Requires backend"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-success/70 text-white font-display text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                >
                  <CheckIcon className="h-3.5 w-3.5" />
                  Approve
                </button>
                <button
                  type="button"
                  disabled
                  title="Requires backend"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-price/70 text-white font-display text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                >
                  <XMarkIcon className="h-3.5 w-3.5" />
                  Reject
                </button>
              </div>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-5 py-12 text-center text-mute text-sm">
            No reviews in this view.
          </li>
        )}
      </ul>
    </div>
  )
}
