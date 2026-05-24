import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { MapPinIcon, ClockIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Aussie Vapes Store Locator — Sydney HQ + Australia-Wide Delivery',
  description:
    "Aussie Vapes operates from a single Sydney warehouse for fast Australia-wide dispatch. We deliver to every state and territory rather than maintain retail stores.",
  keywords: [
    'aussie vapes store',
    'aussie vapes sydney',
    'aussie vapes location',
    'vape store near me australia',
    'aussie vapes warehouse',
  ],
  alternates: { canonical: '/store' },
}

const CITIES = [
  { name: 'Sydney', slug: 'sydney', metro: 'NSW', note: 'Aussie Vapes HQ — fastest dispatch' },
  { name: 'Melbourne', slug: 'melbourne', metro: 'VIC', note: '2-4 business days standard' },
  { name: 'Brisbane', slug: 'brisbane', metro: 'QLD', note: '2-4 business days standard' },
  { name: 'Perth', slug: 'perth', metro: 'WA', note: '4-7 business days standard' },
  { name: 'Adelaide', slug: 'adelaide', metro: 'SA', note: '3-5 business days standard' },
]

export default function StorePage() {
  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Aussie Vapes', href: '/' }, { label: 'Store Locator' }]} />
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-4 mb-3 lowercase">
            aussie vapes store locator
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">
            Aussie Vapes operates as an online-only retailer to bring you the largest range at the lowest prices.
            We dispatch from a single Sydney warehouse to every Australian state and territory — typically same-day
            on weekday orders before 2pm AEST.
          </p>
        </div>
      </section>

      <section className="container-site py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white border border-line rounded-sm p-8 space-y-5">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-2">Aussie Vapes HQ</p>
            <h2 className="font-display text-3xl font-bold text-ink uppercase">Sydney Warehouse</h2>
          </div>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3"><MapPinIcon className="h-5 w-5 text-ink flex-shrink-0 mt-0.5" /><span><strong>Sydney, NSW, Australia</strong><br /><span className="text-mute">Pick-up by appointment only (B2B / wholesale orders)</span></span></li>
            <li className="flex items-start gap-3"><ClockIcon className="h-5 w-5 text-ink flex-shrink-0 mt-0.5" /><span><strong>Dispatch Hours:</strong> Mon-Fri 9am-5pm AEST</span></li>
            <li className="flex items-start gap-3"><PhoneIcon className="h-5 w-5 text-ink flex-shrink-0 mt-0.5" /><a href="tel:+61480831679" className="hover:text-price"><strong>+61 480 831 679</strong></a></li>
            <li className="flex items-start gap-3"><EnvelopeIcon className="h-5 w-5 text-ink flex-shrink-0 mt-0.5" /><a href="mailto:info@aussievapes.com.au" className="hover:text-price"><strong>info@aussievapes.com.au</strong></a></li>
          </ul>

          <div className="pt-5 border-t border-line">
            <Link href="/contact" className="btn-primary w-full text-center">Get Directions or Book Visit</Link>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-ink mb-4 lowercase">aussie vapes delivers to</h2>
          <ul className="space-y-3">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/aussie-vapes/${c.slug}`}
                  className="bg-white border border-line rounded-sm p-4 flex items-center justify-between hover:border-ink hover:shadow-sm transition-all"
                >
                  <div>
                    <p className="font-display font-bold text-ink">Aussie Vapes {c.name}, {c.metro}</p>
                    <p className="text-xs text-mute">{c.note}</p>
                  </div>
                  <span className="text-price font-display text-xs uppercase tracking-widest font-bold">View →</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-mute">
            Aussie Vapes also ships to every regional postcode in Australia. Estimate delivery on the{' '}
            <Link href="/shipping" className="text-price font-semibold hover:underline">shipping policy page</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
