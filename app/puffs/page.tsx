import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { PUFF_RANGES, getPuffRangeCounts } from '@/lib/puff-ranges'

export const metadata: Metadata = {
  title: 'Shop VapeHub Vapes Australia By Puff Count — Starter to Ultra-Puff | VapeHub Vapes Australia',
  description:
    'Browse VapeHub Vapes Australia by puff count. Starter (under 2,500), mid-range (2,500-6,000), high-puff (6,000-12,000) and ultra-puff (12,000+) ranges. Same-day Sydney dispatch.',
  keywords: [
    'shop by puff count australia',
    'vapehub vapes australia by puff count',
    'disposable vape puff count australia',
    'high puff vape australia',
    'mid range vape australia',
  ],
  alternates: { canonical: '/puffs' },
}

export default function PuffsIndexPage() {
  const counts = getPuffRangeCounts()

  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'VapeHub Vapes Australia', href: '/' }, { label: 'Shop By Puff Count' }]} />
          <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mt-4 mb-2">
            VapeHub Vapes Australia — Shop By Puff Count
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-1 mb-3 lowercase">
            vapehub vapes australia by puff count
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">
            Find the right Vape for how long you want a device to last. From compact starter vapes under 2,500
            puffs to ultra-puff 25,000-puff marathon devices — pick the puff range that suits your style.
          </p>
        </div>
      </section>

      <section className="container-site py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PUFF_RANGES.map((r) => (
            <Link
              key={r.slug}
              href={`/puffs/${r.slug}`}
              className="group bg-white border border-line rounded-sm p-6 hover:border-ink hover:shadow-md transition-all flex flex-col"
            >
              <r.icon className="h-12 w-12 text-ink mb-3" />
              <h2 className="font-display text-lg font-bold text-ink uppercase tracking-wide group-hover:text-price transition-colors mb-1">
                {r.shortName}
              </h2>
              <p className="text-xs text-mute font-display uppercase tracking-wider font-bold mb-3">
                {counts[r.slug] ?? 0} products
              </p>
              <p className="text-body text-sm leading-relaxed flex-1">{r.description}</p>
              <span className="mt-4 pt-3 border-t border-line font-display text-xs uppercase tracking-widest font-bold text-ink group-hover:text-price transition-colors">
                Shop {r.shortName} →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
