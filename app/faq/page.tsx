import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Aussie Vape Hub FAQ — All Your Questions Answered',
  description:
    "Complete FAQ for Aussie Vape Hub. Shipping, returns, payment, age verification, AU vaping laws, product authenticity and more. Australia's #1 online vape store.",
  keywords: [
    'aussie vape hub faq',
    'aussie vape hub questions',
    'aussie vape hub help',
    'aussie vape hub support',
    'how to buy vape australia',
    'vape shipping australia faq',
  ],
  alternates: { canonical: '/faq' },
}

const FAQ_GROUPS: { title: string; items: { question: string; answer: string }[] }[] = [
  {
    title: 'Ordering & Payment',
    items: [
      {
        question: 'How do I place an order at Aussie Vape Hub?',
        answer:
          "Browse the Aussie Vape Hub catalogue, add items to your cart, click Checkout, fill in your shipping address and payment details, confirm your age and prescription, and submit. You'll get a confirmation email within seconds.",
      },
      {
        question: 'What payment methods does Aussie Vape Hub accept?',
        answer:
          'Aussie Vape Hub accepts Visa, Mastercard, American Express, and PayPal. All payments are processed by our PCI-DSS compliant payment processor. We do not store card details.',
      },
      {
        question: 'Is it safe to buy from Aussie Vape Hub?',
        answer:
          'Yes — Aussie Vape Hub uses SSL encryption sitewide, PCI-compliant payment processing, and we never store card details. Plus our 30-day return guarantee and authenticity guarantee protect every purchase.',
      },
      {
        question: 'Can I order over the phone?',
        answer:
          "Aussie Vape Hub is an online-only store. We don't take phone orders for security reasons, but our support team is happy to help you place an online order if you call us at +61 468 188 347.",
      },
    ],
  },
  {
    title: 'Shipping & Delivery',
    items: [
      {
        question: 'How fast does Aussie Vape Hub ship?',
        answer:
          'Same-day weekday dispatch on orders placed before 2pm AEST. Standard delivery is 3-7 business days to most AU addresses. Express is 1-3 business days.',
      },
      {
        question: 'Do you offer free shipping?',
        answer:
          'Yes — Aussie Vape Hub offers free standard shipping on all Australian orders over $300. Below that, standard shipping is $9.95 flat.',
      },
      {
        question: 'Where does Aussie Vape Hub ship to?',
        answer:
          'Every Australian state and territory — NSW, VIC, QLD, WA, SA, TAS, ACT, NT. Aussie Vape Hub does not ship internationally.',
      },
      {
        question: 'Is Aussie Vape Hub packaging discreet?',
        answer:
          "Yes — every Aussie Vape Hub order ships in plain, unbranded packaging. The sender name on the courier label reads 'AV Australia' rather than 'Aussie Vape Hub' for full privacy.",
      },
    ],
  },
  {
    title: 'Products & Authenticity',
    items: [
      {
        question: 'Are Aussie Vape Hub products authentic?',
        answer:
          'Yes — every product sold by Aussie Vape Hub is sourced through authorised distribution channels. We scan authenticity codes on every batch and stand behind every device with a counterfeit guarantee.',
      },
      {
        question: 'What brands does Aussie Vape Hub carry?',
        answer:
          'Aussie Vape Hub stocks 40+ brands including IGET, Alfakher Crown Bar, HQD, Gunnpod, Lost Mary, Vozol, RELX, Elux, Mr Fog, Serein, JNR, AliBarBar, Kuz, X-Qlusive and many more. See our full brand directory.',
      },
      {
        question: 'How do I verify my Aussie Vape Hub product is genuine?',
        answer:
          "Most disposable vapes ship with a scratch-off authenticity code on the packaging. Scratch the panel and enter the code at the brand's official verification site. If verification fails, contact Aussie Vape Hub immediately for a free replacement.",
      },
    ],
  },
  {
    title: 'AU Vaping Laws & Compliance',
    items: [
      {
        question: 'Is buying vapes from Aussie Vape Hub legal?',
        answer:
          'Yes — Aussie Vape Hub operates within the TGA prescription model. Nicotine-containing vapes require you to confirm a valid Australian prescription at checkout. Non-nicotine products have no prescription requirement.',
      },
      {
        question: 'Do I need a prescription to buy from Aussie Vape Hub?',
        answer:
          'For nicotine-containing products, yes — Australian law requires a prescription. You confirm prescription status at checkout. Non-nicotine vape products are not subject to this requirement.',
      },
      {
        question: 'What is the maximum nicotine strength legally sold in Australia?',
        answer:
          'The Australian TGA permits up to 50mg/mL nicotine in e-liquid (with prescription). Most disposable vapes are capped at 20mg/mL (2%) which is the AU-compliant standard.',
      },
    ],
  },
  {
    title: 'Returns & Issues',
    items: [
      {
        question: 'What is the Aussie Vape Hub return policy?',
        answer:
          "30-day returns on unopened products. Faulty or counterfeit devices replaced free of charge. See our full Returns Policy for details.",
      },
      {
        question: 'My Aussie Vape Hub order arrived faulty — what now?',
        answer:
          'Contact info@aussievapehub.com.au within 7 days of delivery with your order number and a short video/photo of the issue. We typically dispatch replacements within 1 business day of approval.',
      },
      {
        question: 'How long do refunds take?',
        answer:
          'Once Aussie Vape Hub receives and inspects your return (1-3 business days), refunds are processed to your original payment method. Bank processing typically takes another 5-10 business days to appear in your account.',
      },
    ],
  },
]

export default function FaqPage() {
  const allFaqs = FAQ_GROUPS.flatMap((g) => g.items)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(allFaqs)) }}
      />

      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Aussie Vape Hub', href: '/' }, { label: 'FAQ' }]} />
          <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mt-4 mb-2">
            Aussie Vape Hub FAQ
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-1 mb-3 lowercase">
            aussie vape hub — frequently asked questions
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">
            Everything you need to know about ordering from Aussie Vape Hub — shipping, returns, authenticity, AU vaping
            laws and more. Can&apos;t find what you need? <Link href="/contact" className="text-price font-semibold hover:underline">Contact our team.</Link>
          </p>
        </div>
      </section>

      <section className="container-site py-14 max-w-4xl">
        {FAQ_GROUPS.map((g) => (
          <div key={g.title} className="mb-10">
            <h2 className="font-display text-xl font-bold text-ink mb-4 uppercase tracking-wide pb-2 border-b border-line">
              {g.title}
            </h2>
            <div className="space-y-3">
              {g.items.map((f, i) => (
                <details key={i} className="group bg-white border border-line rounded-sm overflow-hidden">
                  <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4 font-display font-bold text-ink hover:bg-soft-100 transition-colors">
                    <span>{f.question}</span>
                    <span className="font-display text-price text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                  </summary>
                  <div className="p-5 pt-0 text-body leading-relaxed text-sm">{f.answer}</div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-10 p-8 rounded-sm bg-ink text-white text-center">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide mb-2">
            Still need help?
          </h2>
          <p className="text-white/80 text-sm mb-5 max-w-lg mx-auto">
            The Aussie Vape Hub support team is here Mon–Fri 9am–5pm AEST.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-sale">Contact Aussie Vape Hub</Link>
            <a href="mailto:info@aussievapehub.com.au" className="btn-secondary bg-white">Email Us</a>
          </div>
        </div>
      </section>
    </>
  )
}
