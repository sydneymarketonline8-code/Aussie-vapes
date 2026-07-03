import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ScaleIcon } from '@heroicons/react/24/outline'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vapesaustralia.com.au'

export const metadata: Metadata = {
  title: 'Vaping Laws In Australia 2026 — Vapes Australia Compliance Guide',
  description:
    "Complete guide to Australian vaping laws in 2026. TGA prescription model, legal nicotine strengths, age limits, importation rules — Vapes Australia breaks it all down.",
  keywords: [
    'vaping laws australia',
    'australian vape laws',
    'tga vape rules',
    'vape prescription australia',
    'vapes australia laws',
    'is vaping legal australia',
    'nicotine vape law australia',
  ],
  alternates: { canonical: '/vaping-laws-australia' },
}

const ARTICLE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Vaping Laws In Australia 2026 — Vapes Australia Compliance Guide',
  description: 'Complete guide to Australian vaping laws in 2026. TGA prescription model, legal nicotine strengths, age limits and importation rules.',
  author: { '@type': 'Organization', name: 'Vapes Australia' },
  publisher: {
    '@type': 'Organization',
    name: 'Vapes Australia',
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
  },
  datePublished: '2026-01-01',
  dateModified: '2026-05-14',
  mainEntityOfPage: `${SITE_URL}/vaping-laws-australia`,
}

export default function VapingLawsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSON_LD) }} />

      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Vapes Australia', href: '/' }, { label: 'AU Vaping Laws' }]} />
          <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mt-4 mb-2">
            Compliance Guide · Updated 2026
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-1 mb-3 lowercase">
            vaping laws in australia
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">
            Australia&apos;s vaping laws are unique and frequently updated. This Vapes Australia guide explains the current
            legal framework — the TGA prescription model, legal nicotine strengths, importation rules and what it all
            means for you as a consumer.
          </p>
        </div>
      </section>

      <article className="container-site py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8 prose-content">
          <section>
            <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">the tga prescription model</h2>
            <p className="text-body leading-relaxed mb-3">
              Since October 2021, nicotine-containing vaping products in Australia have been regulated under the TGA
              Therapeutic Goods (Standard for Nicotine Vaping Products) (TGO 110) Order 2021. The headline rule:
              nicotine vapes are <strong>prescription-only</strong>.
            </p>
            <p className="text-body leading-relaxed">
              This means you legally need a valid prescription from an Australian doctor to possess, purchase or import
              nicotine vaping products. The system was designed to position vaping as a smoking-cessation tool while
              limiting recreational use, particularly by young people.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">legal nicotine strengths</h2>
            <p className="text-body leading-relaxed mb-3">
              Under TGO 110, the maximum legal nicotine concentration in Australia is <strong>100mg/mL</strong>, but
              the practical maximum for retail-style consumer products is <strong>50mg/mL</strong>. Most disposable
              vapes — including every Vapes Australia disposable — are capped at <strong>20mg/mL (2%)</strong>, which is
              the TGA-compliant standard set as the SP2S (Schedule 2/3 transition) limit.
            </p>
            <p className="text-body leading-relaxed">
              Devices marketed as &quot;50mg&quot; that you might see on overseas sites are not TGA-compliant for
              direct AU consumer sale. Vapes Australia only stocks compliant products.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">age restrictions</h2>
            <p className="text-body leading-relaxed">
              Vaping products — both nicotine and non-nicotine — can only be sold to adults aged <strong>18 years or
              older</strong>. Vapes Australia enforces an age-gate on every site visit and prescription confirmation at
              checkout. Selling vapes to minors is a serious offence under Australian law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">importation rules</h2>
            <p className="text-body leading-relaxed mb-3">
              Personal importation of nicotine vaping products requires a valid Australian prescription. Without one,
              Australian Border Force can seize the shipment and issue penalties.
            </p>
            <p className="text-body leading-relaxed">
              Vapes Australia is a domestic Australian retailer — we don&apos;t ship internationally and your purchase
              never crosses a border. This eliminates customs risk entirely.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">where you can vape</h2>
            <p className="text-body leading-relaxed mb-3">
              Australian states and territories have varying rules on where vaping is permitted in public:
            </p>
            <ul className="space-y-2 text-sm text-body">
              <li>• <strong>Indoor public spaces:</strong> Vaping is banned wherever smoking is banned (almost everywhere)</li>
              <li>• <strong>Cars with minors present:</strong> Banned in all states/territories</li>
              <li>• <strong>Within 4m of pub/restaurant entrances:</strong> Banned in most states</li>
              <li>• <strong>Playgrounds, schools, sports grounds:</strong> Banned</li>
              <li>• <strong>Beaches:</strong> Banned in NSW, WA, ACT, parts of VIC and QLD</li>
            </ul>
            <p className="text-body leading-relaxed mt-3">
              Vapes Australia recommends vaping only in your home or designated outdoor smoking areas. Check your specific
              state or territory laws for definitive guidance.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">recent changes & 2026 outlook</h2>
            <p className="text-body leading-relaxed mb-3">
              The Australian vaping legal landscape has changed multiple times in recent years. Key recent developments:
            </p>
            <ul className="space-y-2 text-sm text-body">
              <li>• <strong>July 2024:</strong> Disposable nicotine vapes restricted to pharmacy sale (later partially walked back)</li>
              <li>• <strong>2025:</strong> Adults 18+ no longer need a prescription for low-strength nicotine vapes purchased at pharmacy</li>
              <li>• <strong>Mid-2025:</strong> Online consumer retailers like Vapes Australia continue operating under prescription model with prescription confirmation at checkout</li>
            </ul>
            <p className="text-body leading-relaxed mt-3">
              The regulatory environment continues to evolve. Vapes Australia monitors all changes and updates compliance
              processes accordingly. If you have specific legal questions, consult an Australian lawyer or pharmacist.
            </p>
          </section>

          <section className="bg-soft-100 border border-line p-5 rounded-sm">
            <h2 className="font-display text-lg font-bold text-ink mb-2 flex items-center gap-2">
              <ScaleIcon className="h-5 w-5 text-mute" />
              Disclaimer
            </h2>
            <p className="text-sm text-body leading-relaxed">
              This Vapes Australia guide is general information only and is not legal advice. Australian vaping laws are
              subject to change and vary by state and territory. For specific legal guidance, consult an Australian
              lawyer or your state health department.
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit space-y-6">
          <div className="bg-white border border-line rounded-sm p-6">
            <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3 pb-2 border-b border-line">
              At A Glance
            </h3>
            <ul className="space-y-3 text-sm text-body">
              <li>✓ Vaping legal for adults 18+</li>
              <li>✓ Nicotine vapes require prescription</li>
              <li>✓ Max 20mg/mL in disposables (AU-compliant)</li>
              <li>✓ No international shipping</li>
              <li>✓ Cannot vape indoors in public</li>
              <li>✓ TGA framework: TGO 110 Order 2021</li>
            </ul>
          </div>
          <div className="bg-soft-100 border border-line rounded-sm p-6">
            <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3">Related Vapes Australia Pages</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/beginners-guide" className="text-body hover:text-price">Beginner&apos;s Vape Guide</Link></li>
              <li><Link href="/faq" className="text-body hover:text-price">Vapes Australia FAQ</Link></li>
              <li><Link href="/category/disposable-vapes" className="text-body hover:text-price">Compliant Disposable Vapes</Link></li>
              <li><Link href="/contact" className="text-body hover:text-price">Talk to Vapes Australia</Link></li>
            </ul>
          </div>
        </aside>
      </article>
    </>
  )
}
