import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aussievapes.com.au'

export const metadata: Metadata = {
  title: "Beginner's Vape Guide Australia — Aussie Vapes Starter Tips",
  description:
    "The complete beginner's vape guide for Australia. How to choose your first vape, nicotine strength, disposable vs pod, TGA prescription model — Aussie Vapes walks you through everything.",
  keywords: [
    'beginners vape guide australia',
    'aussie vapes beginners',
    'first vape australia',
    'how to vape australia',
    'starter vape kit australia',
    'aussie vapes starter guide',
  ],
  alternates: { canonical: '/beginners-guide' },
}

const ARTICLE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "Beginner's Vape Guide Australia — Aussie Vapes",
  description: "The complete beginner's vape guide for Australia. How to choose your first vape, nicotine strength, disposable vs pod, TGA prescription model.",
  author: { '@type': 'Organization', name: 'Aussie Vapes' },
  publisher: {
    '@type': 'Organization',
    name: 'Aussie Vapes',
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
  },
  datePublished: '2026-01-01',
  dateModified: '2026-05-14',
  mainEntityOfPage: `${SITE_URL}/beginners-guide`,
}

export default function BeginnersGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSON_LD) }} />

      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Aussie Vapes', href: '/' }, { label: "Beginner's Guide" }]} />
          <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mt-4 mb-2">
            Aussie Vapes Guides
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-1 mb-3 lowercase">
            beginner&apos;s vape guide for australia
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">
            New to vaping? The Aussie Vapes team has put together this comprehensive beginner&apos;s guide to help you
            choose your first device, understand AU regulations, and avoid the most common mistakes new vapers make.
          </p>
        </div>
      </section>

      <article className="container-site py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">step 1: understand why you&apos;re vaping</h2>
            <p className="text-body leading-relaxed mb-3">
              Aussie Vapes products are designed for adult smokers (18+) looking for a less harmful alternative to
              cigarettes. The Royal College of Physicians (UK) estimates vaping is around 95% less harmful than smoking
              tobacco. The TGA permits prescription vaping access as a recognised smoking cessation tool in Australia.
            </p>
            <p className="text-body leading-relaxed">
              If you&apos;ve never smoked and never vaped, you should not start. Nicotine is addictive. The advice in
              this Aussie Vapes guide assumes you&apos;re an existing smoker or vaper.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">step 2: choose your device type</h2>
            <p className="text-body leading-relaxed mb-4">
              For Australian beginners, there are two main starting points:
            </p>

            <div className="space-y-4">
              <div className="bg-soft-100 border-l-4 border-price p-5 rounded-sm">
                <h3 className="font-display text-lg font-bold text-ink mb-2">Option A: Disposable Vape</h3>
                <p className="text-sm text-body leading-relaxed mb-2">
                  <strong>Best for:</strong> Brand-new vapers who want zero setup, zero maintenance, and a low upfront cost.
                  Pull it out of the box, vape it, dispose when done.
                </p>
                <p className="text-sm text-body leading-relaxed">
                  <strong>Aussie Vapes recommends starting with:</strong> the <Link href="/product/iget-bar" className="text-price font-semibold hover:underline">IGET Bar 3500</Link>, <Link href="/brand/gunnpod" className="text-price font-semibold hover:underline">Gunnpod 2000</Link>, or <Link href="/brand/hqd" className="text-price font-semibold hover:underline">HQD Cuvie Plus</Link>. Spend $20-$30 for your first device, try several flavours, and decide if vaping suits you before investing in a pod system.
                </p>
              </div>

              <div className="bg-soft-100 border-l-4 border-success p-5 rounded-sm">
                <h3 className="font-display text-lg font-bold text-ink mb-2">Option B: Refillable Pod System</h3>
                <p className="text-sm text-body leading-relaxed mb-2">
                  <strong>Best for:</strong> Beginners who already know they&apos;ll be vaping long-term and want to save money. Higher upfront cost but 50-70% cheaper per week than disposables.
                </p>
                <p className="text-sm text-body leading-relaxed">
                  <strong>Aussie Vapes recommends:</strong> A simple draw-activated pod system paired with 25mg or 50mg nic salt e-liquid. Browse our <Link href="/category/pod-systems" className="text-price font-semibold hover:underline">Pod Systems range</Link>.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">step 3: choose your nicotine strength</h2>
            <p className="text-body leading-relaxed mb-3">
              All disposable vapes sold legally in Australia (including every Aussie Vapes product) use 20mg/mL salt
              nicotine — the TGA-compliant standard. For pod systems with refillable nic salt e-liquid:
            </p>
            <ul className="space-y-2 text-sm text-body mb-3">
              <li>• <strong>Under 10 cigarettes/day:</strong> 25mg salt nic</li>
              <li>• <strong>10-20 cigarettes/day:</strong> 35-50mg salt nic</li>
              <li>• <strong>20+ cigarettes/day:</strong> 50mg salt nic</li>
            </ul>
            <p className="text-body leading-relaxed">
              If unsure, the Aussie Vapes team recommends starting at the higher strength and tapering down. Lower
              strengths feel weaker but are smoother on the throat.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">step 4: pick flavours you&apos;ll actually enjoy</h2>
            <p className="text-body leading-relaxed mb-3">
              Flavour matters more than you&apos;d expect — if you don&apos;t enjoy the flavour, you won&apos;t stick
              with vaping. Aussie Vapes recommends starting with these proven beginner flavours:
            </p>
            <ul className="space-y-2 text-sm text-body">
              <li>• <strong>If you smoke menthol cigarettes:</strong> Cool Mint, Lush Ice, Mint</li>
              <li>• <strong>If you smoke regular cigarettes:</strong> Classic Tobacco, Tobacco Mint</li>
              <li>• <strong>If you want a clean break from cigarette taste:</strong> Watermelon Ice, Mango Ice, Strawberry Ice, Blueberry Raspberry</li>
              <li>• <strong>For sweet-tooth vapers:</strong> Bubblegum, Cola Ice, Pineapple Coconut, Vanilla Custard</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">step 5: know the aussie vapes basics</h2>
            <ul className="space-y-3 text-sm text-body">
              <li>
                <strong>Charge it:</strong> If your Aussie Vapes device is rechargeable, give it a 30-minute top-up
                charge before first use even if it&apos;s pre-charged.
              </li>
              <li>
                <strong>Activate:</strong> Most disposables activate automatically when you inhale. Some have an
                activation tab on the bottom — pull it before first use.
              </li>
              <li>
                <strong>Draw style:</strong> Take slow, gentle puffs lasting 2-3 seconds. Don&apos;t inhale hard — vapes
                aren&apos;t cigarettes. Wait 5-10 seconds between puffs for the coil to recover.
              </li>
              <li>
                <strong>Storage:</strong> Keep your Aussie Vapes device upright at room temperature. Avoid leaving in
                hot cars or direct sunlight.
              </li>
              <li>
                <strong>End of life:</strong> When the flavour starts tasting burnt or the device produces less vapour,
                it&apos;s done. Dispose responsibly at a battery recycling drop-off — never bin lithium batteries.
              </li>
            </ul>
          </section>

          <section className="bg-warning/10 border-l-4 border-warning p-5 rounded-sm">
            <h2 className="font-display text-lg font-bold text-ink mb-2">⚠️ AU Legal Reminder</h2>
            <p className="text-sm text-body leading-relaxed">
              Nicotine vaping products require a valid Australian prescription. You confirm prescription status at
              Aussie Vapes checkout. Vaping is for adults 18+ only — Aussie Vapes does not sell to minors.
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit space-y-6">
          <div className="bg-white border border-line rounded-sm p-6">
            <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3 pb-2 border-b border-line">
              Aussie Vapes Starter Picks
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/brand/iget" className="text-body hover:text-price"><strong>IGET</strong> — best overall beginner</Link></li>
              <li><Link href="/brand/gunnpod" className="text-body hover:text-price"><strong>Gunnpod</strong> — original AU disposable</Link></li>
              <li><Link href="/brand/hqd" className="text-body hover:text-price"><strong>HQD</strong> — clean flavours, ex-smoker favourite</Link></li>
              <li><Link href="/brand/lost-mary" className="text-body hover:text-price"><strong>Lost Mary</strong> — sleek modern design</Link></li>
            </ul>
          </div>
          <div className="bg-soft-100 border border-line rounded-sm p-6">
            <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3">More Aussie Vapes Reading</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vaping-laws-australia" className="text-body hover:text-price">AU Vaping Laws Explained</Link></li>
              <li><Link href="/category/disposable-vapes" className="text-body hover:text-price">Disposable Vapes Range</Link></li>
              <li><Link href="/category/pod-systems" className="text-body hover:text-price">Pod Systems Range</Link></li>
              <li><Link href="/faq" className="text-body hover:text-price">Aussie Vapes FAQ</Link></li>
              <li><Link href="/contact" className="text-body hover:text-price">Talk to Aussie Vapes Support</Link></li>
            </ul>
          </div>
        </aside>
      </article>
    </>
  )
}
