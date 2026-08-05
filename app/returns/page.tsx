import type { Metadata } from 'next'
import InfoPageShell from '@/components/layout/InfoPageShell'

export const metadata: Metadata = {
  title: 'Aussie Vape Hub Returns & Refunds — 30-Day Guarantee',
  description:
    "Aussie Vape Hub offers a 30-day return guarantee on unopened products. Faulty or counterfeit devices replaced free of charge. Read the full Aussie Vape Hub returns policy.",
  keywords: ['aussie vape hub returns', 'aussie vape hub refunds', 'vape return policy australia', 'aussie vape hub warranty', 'faulty vape replacement australia'],
  alternates: { canonical: '/returns' },
}

export default function ReturnsPage() {
  return (
    <InfoPageShell
      eyebrow="Aussie Vape Hub Returns"
      title="aussie vape hub returns &amp; refunds"
      intro="Aussie Vape Hub stands behind every device we sell with a 30-day return guarantee on unopened products and a no-fuss replacement policy on faulty hardware. We want every Aussie Vape Hub customer to be fully satisfied with their purchase."
      sections={[
        {
          heading: 'our 30-day guarantee',
          body: "Not happy with your Aussie Vape Hub order? Return any unopened, unused product within 30 days of receiving it for a full refund. The product must be in its original packaging with all tamper seals intact. Original shipping fees are non-refundable.",
        },
        {
          heading: 'faulty or defective devices',
          paragraphs: [
            "If you receive a faulty or defective Aussie Vape Hub device — for example a vape that doesn't fire, leaks before first use, or has a manufacturer defect — we'll replace it free of charge.",
            'Contact us within 7 days of delivery with your order number, a description of the fault, and a short video or photo showing the issue. We typically dispatch replacement Aussie Vape Hub devices within one business day of approval.',
          ],
        },
        {
          heading: 'counterfeit or authenticity issues',
          body: "Every Aussie Vape Hub product is sourced through authorised distribution channels. If you ever receive a product that fails its authenticity scratch-code check, we'll replace it free of charge AND give you a 20% credit toward your next Aussie Vape Hub order as compensation for the inconvenience.",
        },
        {
          heading: 'what cannot be returned',
          list: [
            'Opened or used disposable vapes (health and safety regulations)',
            'Opened or used e-liquid bottles',
            'Opened nicotine pouches',
            'Sale items marked "final sale" at the time of purchase',
            'Products returned after the 30-day window',
            'Products without original packaging or with broken tamper seals',
          ],
        },
        {
          heading: 'how to start a return',
          list: [
            'Email returns@vapehubvapesaustralia.com.au with your order number and reason for return',
            'A member of the Aussie Vape Hub team will reply within one business day with a Return Authorisation (RA) number',
            'Pack the unopened item in its original packaging and include the RA number on the outside',
            'Post to the Sydney return address provided in your RA email',
            'Once received and inspected (1-3 business days), refund is processed to your original payment method (5-10 business days to appear)',
          ],
        },
        {
          heading: 'return shipping',
          body: "Customers are responsible for return postage on change-of-mind returns. For faulty or counterfeit Aussie Vape Hub products, we cover return postage with a pre-paid Australia Post label.",
        },
      ]}
      cta={{ label: 'Contact Aussie Vape Hub Support', href: '/contact' }}
    />
  )
}
