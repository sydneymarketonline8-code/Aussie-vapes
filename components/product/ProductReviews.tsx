'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutline } from '@heroicons/react/24/outline'
import type { PublicReview } from '@/lib/storefront-reviews'
import { submitReview } from '@/app/product/[slug]/review-actions'

interface ProductReviewsProps {
  productId: string
  productSlug: string
  productName: string
  reviews: PublicReview[]
}

export default function ProductReviews({ productId, productSlug, productName, reviews }: ProductReviewsProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    body: '',
  })

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitted(false)
    startTransition(async () => {
      const result = await submitReview({
        productId,
        productSlug,
        reviewerName: form.name,
        reviewerEmail: form.email,
        rating: form.rating,
        title: form.title,
        body: form.body,
      })
      if (!result.ok) {
        setError(result.error)
        return
      }
      setSubmitted(true)
      setForm({ name: '', email: '', rating: 5, title: '', body: '' })
      router.refresh()
    })
  }

  return (
    <section className="mt-16 pt-12 border-t border-line">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="section-heading">customer reviews</h2>
          <p className="text-mute text-sm mt-1">
            {reviews.length > 0
              ? `${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'} from verified Aussie Vapes customers`
              : 'Be the first to leave a review.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="btn-primary text-xs px-4 py-2"
        >
          {open ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {open && (
        <form
          onSubmit={onSubmit}
          className="bg-soft-100 border border-line rounded-sm p-5 mb-6 space-y-4"
        >
          <div>
            <label className="block font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-1">
              Your rating *
            </label>
            <RatingPicker value={form.rating} onChange={(v) => set('rating', v)} disabled={pending} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="rv-name" className="block font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-1">
                Your name *
              </label>
              <input
                id="rv-name"
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                disabled={pending}
                required
                className="w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body"
              />
            </div>
            <div>
              <label htmlFor="rv-email" className="block font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-1">
                Email (optional)
              </label>
              <input
                id="rv-email"
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                disabled={pending}
                placeholder="So we can follow up if there's an issue"
                className="w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body"
              />
            </div>
          </div>
          <div>
            <label htmlFor="rv-title" className="block font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-1">
              Title
            </label>
            <input
              id="rv-title"
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              disabled={pending}
              placeholder="Summarise your experience"
              className="w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body"
            />
          </div>
          <div>
            <label htmlFor="rv-body" className="block font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-1">
              Your review *
            </label>
            <textarea
              id="rv-body"
              rows={5}
              value={form.body}
              onChange={(e) => set('body', e.target.value)}
              disabled={pending}
              required
              placeholder={`Share your experience with the ${productName}…`}
              className="w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body resize-y"
            />
          </div>

          {error && (
            <div className="p-3 rounded-sm bg-sale/10 border border-sale text-sm text-sale">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-mute">Reviews are moderated before they appear publicly.</p>
            <button
              type="submit"
              disabled={pending}
              className="btn-primary text-sm px-5 py-2 disabled:opacity-60"
            >
              {pending ? 'Submitting…' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}

      {submitted && !open && (
        <div className="p-4 mb-6 rounded-sm bg-success/10 border border-success text-sm text-success">
          Thanks — your review has been submitted and will appear once a moderator approves it.
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-mute text-sm bg-white border border-line rounded-sm p-6 text-center">
          No reviews yet for the {productName}.
        </p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((r) => (
            <li key={r.id} className="bg-white border border-line rounded-sm p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <StarRow rating={r.rating} />
                    {r.title && <span className="font-display font-bold text-ink text-sm">{r.title}</span>}
                  </div>
                  <p className="text-xs text-mute mt-1">
                    by <strong className="text-body">{r.reviewerName}</strong>
                    {r.isVerifiedBuyer && <span className="ml-1.5 inline-block text-[9px] font-display font-bold uppercase tracking-widest bg-success/15 text-success px-1.5 py-0.5 rounded-sm">Verified</span>}
                    {' · '}
                    {new Date(r.createdAt).toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <p className="text-sm text-body leading-relaxed">{r.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function RatingPicker({
  value,
  onChange,
  disabled,
}: {
  value: number
  onChange: (v: number) => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          disabled={disabled}
          aria-label={`${n} star${n === 1 ? '' : 's'}`}
          className="p-0.5"
        >
          {n <= value ? (
            <StarIcon className="h-7 w-7 text-warning" />
          ) : (
            <StarOutline className="h-7 w-7 text-mute hover:text-warning transition-colors" />
          )}
        </button>
      ))}
      <span className="ml-2 font-display text-sm font-bold text-ink">{value} / 5</span>
    </div>
  )
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} className={`h-4 w-4 ${n <= rating ? 'text-warning' : 'text-line'}`} />
      ))}
    </div>
  )
}
