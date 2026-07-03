import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export const metadata: Metadata = {
  title: 'Vapes Australia Bulk & Wholesale — B2B Vape Supply Australia',
  description:
    "Vapes Australia supplies bulk and wholesale vape orders to Australian businesses. Convenience stores, tobacconists, event organisers and resellers welcome.",
  keywords: [
    'vapes australia wholesale',
    'vapes australia bulk',
    'vape wholesale australia',
    'bulk vape orders australia',
    'b2b vape supplier australia',
  ],
  alternates: { canonical: '/bulk' },
}

export default function BulkPage() {
  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Vapes Australia', href: '/' }, { label: 'Bulk & Wholesale' }]} />
          <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mt-4 mb-2">
            B2B / Wholesale
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-1 mb-3 lowercase">
            vapes australia bulk &amp; wholesale
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">
            Australian retailer, tobacconist, convenience store or event organiser? Vapes Australia supplies bulk
            quantities of authentic disposable vapes, pod systems and accessories at wholesale prices, with same-day
            Sydney dispatch and dedicated account management.
          </p>
        </div>
      </section>

      <section className="container-site py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink mb-4 lowercase">why work with vapes australia</h2>
          <ul className="space-y-3 text-body">
            {[
              { t: 'Authorised AU distributor', b: 'Every Vapes Australia wholesale product is sourced through authorised channels with full batch authentication.' },
              { t: 'Tiered wholesale pricing', b: 'Volume discounts unlock at $1k / $5k / $10k AUD monthly purchase tiers.' },
              { t: 'Net-30 terms (approved accounts)', b: 'Approved Vapes Australia wholesale partners can apply for net-30 payment terms.' },
              { t: 'Dedicated account manager', b: 'Direct line to a real Vapes Australia contact — not a ticketing system.' },
              { t: 'Bulk pack discounts', b: '3-pack, 5-pack, 10-pack and 20-pack carton pricing already in catalogue.' },
              { t: 'Compliance support', b: 'We help Australian retailers stay aligned with TGA and state regulations.' },
            ].map((p) => (
              <li key={p.t} className="flex gap-3">
                <CheckCircleIcon className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-bold text-ink">{p.t}</p>
                  <p className="text-sm">{p.b}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-line rounded-sm p-6">
          <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide mb-4">Apply for an Vapes Australia Wholesale Account</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="bulk-business" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Business Name *</label>
              <input id="bulk-business" name="business" type="text" required className="input-base" />
            </div>
            <div>
              <label htmlFor="bulk-abn" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">ABN *</label>
              <input id="bulk-abn" name="abn" type="text" required className="input-base" placeholder="00 000 000 000" />
            </div>
            <div>
              <label htmlFor="bulk-name" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Contact Name *</label>
              <input id="bulk-name" name="name" type="text" required className="input-base" />
            </div>
            <div>
              <label htmlFor="bulk-email" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Email *</label>
              <input id="bulk-email" name="email" type="email" required className="input-base" />
            </div>
            <div>
              <label htmlFor="bulk-monthly" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Estimated Monthly Spend *</label>
              <select id="bulk-monthly" name="monthly" required className="input-base">
                <option>$1,000 – $5,000</option>
                <option>$5,000 – $10,000</option>
                <option>$10,000 – $25,000</option>
                <option>$25,000+</option>
              </select>
            </div>
            <button type="submit" className="btn-sale w-full">Apply For Wholesale Access</button>
            <p className="text-xs text-mute text-center">Vapes Australia typically responds to wholesale applications within 1 business day.</p>
          </form>
        </div>
      </section>
    </>
  )
}
