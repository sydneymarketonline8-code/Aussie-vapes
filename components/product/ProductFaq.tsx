import type { Product } from '@/types'

export interface ProductFaqItem {
  question: string
  answer: string
}

/**
 * Generate 5-6 contextual FAQs from a Product. Used both for on-page rendering
 * and FAQPage JSON-LD on the product page.
 */
export function buildProductFaqs(product: Product, categoryName?: string): ProductFaqItem[] {
  const faqs: ProductFaqItem[] = []
  const puffMatch = product.name.match(/(\d{3,6})\s*(?:k|K)?\s*PUFFS?/i)
  const puffs = puffMatch ? parseInt(puffMatch[1], 10) : null
  const isRechargeable = puffs ? puffs >= 5000 : /rechargeable|usb-c|usb c/i.test(product.description)
  const isPack = /(\d+)\s*-?\s*pack|\d+\s*items?|bundle/i.test(product.name)
  const packMatch = product.name.match(/(\d+)\s*-?\s*pack/i)
  const packSize = packMatch ? parseInt(packMatch[1], 10) : null
  const ratingDesc =
    product.rating >= 4.7
      ? 'highly rated'
      : product.rating >= 4.3
      ? 'well rated'
      : 'rated'

  // 1. Is it good?
  faqs.push({
    question: `Is the ${product.name} a good ${categoryName ? categoryName.toLowerCase() : 'vape'}?`,
    answer:
      `Yes — the ${product.name} is ${ratingDesc} by Vapes Australia customers, averaging ${product.rating.toFixed(
        1
      )}/5 across ${product.reviewCount.toLocaleString()} reviews. ${product.shortDescription} It's stocked authentic at Vapes Australia and dispatched same-day from our Sydney warehouse.`,
  })

  // 2. How long does it last? (only for puff-count disposables)
  if (puffs) {
    const lo = Math.round((puffs / 700) * 0.8)
    const hi = Math.round((puffs / 500) * 0.9)
    faqs.push({
      question: `How long does the ${product.name} last?`,
      answer:
        `For a moderate Australian vaper averaging 500-700 puffs per day, the ${product.name}'s ${puffs.toLocaleString()}-puff capacity typically lasts ${lo}-${hi} days. Heavy vapers will get fewer days; light vapers will get more.`,
    })
  }

  // 3. Is it rechargeable?
  if (puffs && puffs >= 600) {
    faqs.push({
      question: `Is the ${product.name} rechargeable?`,
      answer: isRechargeable
        ? `Yes — the ${product.name} is USB-C rechargeable. The battery doesn't outlast the e-liquid, so you can vape it down to the last drop. A charging cable is typically included in the box.`
        : `The ${product.name} is a non-rechargeable disposable. The device is designed to last the full puff count without needing a top-up charge and is then safely disposed of.`,
    })
  }

  // 4. Pack-specific
  if (isPack && packSize) {
    faqs.push({
      question: `What's included in the ${product.name}?`,
      answer:
        `The ${product.name} includes ${packSize}× ${product.brand} devices in one bundle, dispatched together from the Vapes Australia Sydney warehouse. Pack pricing saves you ${
          packSize >= 10 ? '18-25%' : packSize >= 5 ? '12-18%' : '8-12%'
        } per device versus single-unit purchases.`,
    })
  }

  // 5. Flavour info
  if (product.flavours && product.flavours.length > 0) {
    const flavList = product.flavours.slice(0, 3).join(', ')
    faqs.push({
      question: `What flavours does the ${product.name} come in?`,
      answer:
        product.flavours.length === 1
          ? `The ${product.name} comes in ${flavList}. See the flavour selector above to confirm availability.`
          : `The ${product.name} is available in ${product.flavours.length} flavour profile${product.flavours.length === 1 ? '' : 's'} including ${flavList}. Use the flavour selector above to choose yours.`,
    })
  }

  // 6. Authenticity / where to buy
  faqs.push({
    question: `Where can I buy the ${product.name} in Australia?`,
    answer:
      `Vapes Australia is the largest authorised AU stockist of ${product.brand} products. Every ${product.name} sold by Vapes Australia is sourced through authorised distribution channels, carries the brand's authenticity verification code, and is dispatched same-day from our Sydney warehouse on weekday orders before 2pm AEST. Free shipping on orders over $300.`,
  })

  // 7. AU compliance
  faqs.push({
    question: `Is the ${product.name} TGA compliant?`,
    answer:
      `Yes — the ${product.name} sold by Vapes Australia is TGA-compliant 20mg/mL (2%) salt nicotine and operates within Australia's prescription model for nicotine vaping products. You confirm prescription status at checkout.`,
  })

  return faqs
}

interface ProductFaqProps {
  product: Product
  categoryName?: string
}

export default function ProductFaq({ product, categoryName }: ProductFaqProps) {
  const faqs = buildProductFaqs(product, categoryName)
  if (!faqs.length) return null

  return (
    <section className="mt-12 bg-white border border-line rounded-sm p-6">
      <div className="flex items-end justify-between border-b border-line pb-3 mb-5">
        <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide">
          {product.name} FAQ
        </h2>
        <span className="font-display text-xs uppercase tracking-widest font-bold text-mute">
          {faqs.length} answers
        </span>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details key={i} className="group bg-soft-100 border border-line rounded-sm overflow-hidden">
            <summary className="cursor-pointer list-none p-4 flex items-start justify-between gap-4 font-display font-bold text-ink hover:bg-soft-200 transition-colors text-sm">
              <span>{faq.question}</span>
              <span className="font-display text-price text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
            </summary>
            <div className="p-4 pt-0 text-body leading-relaxed text-sm">{faq.answer}</div>
          </details>
        ))}
      </div>
    </section>
  )
}
