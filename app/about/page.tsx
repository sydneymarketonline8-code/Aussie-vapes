import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export const metadata: Metadata = {
  title: 'About Vapes Australia — Australia\'s #1 Online Vape Store',
  description:
    "Discover Vapes Australia — Australia's largest authorised online vape retailer. 2,000+ authentic disposable vapes, pod systems and e-liquids shipped same-day from Sydney.",
  keywords: [
    'about vapes australia',
    'vapes australia story',
    'vapes australia australia',
    'vapes australia sydney',
    'who is vapes australia',
    'vapes australia about us',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Vapes Australia — Australia\'s #1 Online Vape Store',
    description:
      "Discover Vapes Australia — Australia's largest authorised online vape retailer.",
  },
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Vapes Australia', href: '/' }, { label: 'About Us' }]} />
          <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mt-4 mb-2">
            About Vapes Australia
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink lowercase mb-4">
            australia&apos;s #1 online vape store
          </h1>
          <p className="text-body text-base leading-relaxed max-w-2xl">
            <strong>Vapes Australia</strong> is built by Australians, for Australians. We&apos;re the largest authorised
            online vape retailer in Australia — stocking 2,000+ authentic devices across 40+ brands, all dispatched
            same-day from our Sydney warehouse.
          </p>
        </div>
      </section>

      <section className="container-site py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink mb-4 lowercase">our story</h2>
            <div className="space-y-4 text-body leading-relaxed">
              <p>
                Vapes Australia was founded with a simple mission: bring authentic, well-priced vape products to
                Australian adult smokers looking for a safer alternative to cigarettes. We saw a market crowded with
                grey imports, counterfeit devices, and overseas sellers who didn&apos;t understand the unique TGA
                prescription model. So we built Vapes Australia — locally operated, locally stocked, and entirely
                compliant with Australian regulations.
              </p>
              <p>
                Today, Vapes Australia serves customers in every state and territory. From our Sydney warehouse we
                dispatch same-day on weekday orders before 2pm AEST. We carry the brands Australians actually buy —
                IGET, Alfakher Crown Bar, HQD, Gunnpod, Lost Mary, Vozol, RELX, Elux — and dozens of smaller specialist
                brands too. Every device is sourced through authorised distribution channels, verified for
                authenticity, and backed by a 30-day return guarantee.
              </p>
              <p>
                We&apos;re proud to be Australian-owned and Australian-operated. Customer support is real humans based
                in Sydney, available Mon–Fri 9am–5pm AEST. We don&apos;t outsource, we don&apos;t drop-ship, and we
                don&apos;t cut corners on authenticity.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-ink mb-4 lowercase">what makes vapes australia different</h2>
            <ul className="space-y-3 text-body">
              {[
                { t: 'Authentic stock only', b: "Every Vapes Australia product is sourced through authorised distribution channels. We verify batch codes and stand behind every device sold." },
                { t: 'Same-day Sydney dispatch', b: 'Order before 2pm AEST on a weekday and your Vapes Australia order ships the same day from our Sydney warehouse.' },
                { t: 'Free Aussie-wide shipping over $300', b: 'Discreet plain packaging, fast couriers, every state and territory.' },
                { t: 'Real Australian support', b: 'Live humans in Sydney, Mon-Fri 9am-5pm AEST. Email, chat or phone — no offshore call centres.' },
                { t: '30-day return policy', b: 'Not happy with your Vapes Australia purchase? Return unopened devices within 30 days for a full refund.' },
                { t: 'Largest in-stock range in AU', b: '2,000+ devices across 40+ brands. If a popular AU vape exists, Vapes Australia stocks it.' },
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

          <div>
            <h2 className="font-display text-2xl font-bold text-ink mb-4 lowercase">tga compliance and harm reduction</h2>
            <div className="space-y-4 text-body leading-relaxed text-sm">
              <p>
                Vapes Australia operates entirely within Australia&apos;s TGA prescription framework for nicotine vaping
                products. Every nicotine-containing product sold requires the customer to confirm a valid Australian
                prescription at checkout. We never knowingly sell to under-18s and our age-gate is enforced on every
                visit.
              </p>
              <p>
                We support harm-reduction as a public health goal. The Royal College of Physicians (UK) has
                consistently estimated vaping is approximately 95% less harmful than smoking combustible cigarettes.
                That estimate has made vaping a recognised smoking cessation tool in many jurisdictions — and the
                Australian TGA has cautiously aligned by permitting prescription-model access.
              </p>
              <p>
                That said, nicotine is addictive and vaping is not risk-free. Vapes Australia products are for adults 18+
                who are already smokers or vapers transitioning away from cigarettes. If you don&apos;t smoke and have
                never vaped, you should not start.
              </p>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit space-y-6">
          <div className="bg-soft-100 border border-line rounded-sm p-6">
            <h3 className="font-display text-base font-bold text-ink uppercase tracking-wider mb-4 pb-3 border-b border-line">
              Vapes Australia At A Glance
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-display text-[11px] uppercase tracking-wider text-mute font-bold">Founded</dt>
                <dd className="font-display font-semibold text-ink">2023</dd>
              </div>
              <div>
                <dt className="font-display text-[11px] uppercase tracking-wider text-mute font-bold">Headquarters</dt>
                <dd className="font-display font-semibold text-ink">Sydney, NSW</dd>
              </div>
              <div>
                <dt className="font-display text-[11px] uppercase tracking-wider text-mute font-bold">Products</dt>
                <dd className="font-display font-semibold text-ink">2,000+</dd>
              </div>
              <div>
                <dt className="font-display text-[11px] uppercase tracking-wider text-mute font-bold">Brands</dt>
                <dd className="font-display font-semibold text-ink">40+</dd>
              </div>
              <div>
                <dt className="font-display text-[11px] uppercase tracking-wider text-mute font-bold">Customer Rating</dt>
                <dd className="font-display font-semibold text-ink">4.8 / 5</dd>
              </div>
              <div>
                <dt className="font-display text-[11px] uppercase tracking-wider text-mute font-bold">Reviews</dt>
                <dd className="font-display font-semibold text-ink">10,000+</dd>
              </div>
            </dl>
            <div className="mt-5 pt-5 border-t border-line">
              <Link href="/contact" className="btn-primary w-full text-center">Get In Touch</Link>
            </div>
          </div>

          <div className="bg-white border border-line rounded-sm p-6">
            <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/brands" className="text-body hover:text-price">All Vapes Australia Brands</Link></li>
              <li><Link href="/category/disposable-vapes" className="text-body hover:text-price">Disposable Vapes</Link></li>
              <li><Link href="/shipping" className="text-body hover:text-price">Shipping Policy</Link></li>
              <li><Link href="/returns" className="text-body hover:text-price">Returns &amp; Refunds</Link></li>
              <li><Link href="/faq" className="text-body hover:text-price">FAQ</Link></li>
              <li><Link href="/vaping-laws-australia" className="text-body hover:text-price">AU Vaping Laws</Link></li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  )
}
