import type { Metadata } from 'next'
import InfoPageShell from '@/components/layout/InfoPageShell'

export const metadata: Metadata = {
  title: 'Aussie Vape Hub Shipping Policy — Same-Day AU Dispatch',
  description:
    "Aussie Vape Hub ships authentic vapes Australia-wide. Free shipping over $300. Same-day Sydney dispatch on weekday orders before 2pm AEST. Standard & express options.",
  keywords: ['aussie vape hub shipping', 'aussie vape hub delivery', 'vape shipping australia', 'free vape shipping aus', 'same day vape delivery sydney'],
  alternates: { canonical: '/shipping' },
}

export default function ShippingPage() {
  return (
    <InfoPageShell
      eyebrow="Aussie Vape Hub Shipping"
      title="aussie vape hub shipping policy"
      intro="Every Aussie Vape Hub order ships discreetly from our Sydney warehouse. Same-day weekday dispatch on orders placed before 2pm AEST, free standard shipping on orders over $300, and express delivery options to every state and territory."
      sections={[
        {
          heading: 'shipping rates',
          paragraphs: [
            'Aussie Vape Hub offers free standard shipping on all Australian orders over $300. Below that threshold, standard shipping is a flat $9.95 to anywhere in Australia.',
            'Express shipping is available at checkout for $14.95 — typically 1-3 business days to metro Sydney, Melbourne, Brisbane, Adelaide and Perth, slightly longer to regional and remote areas.',
          ],
          list: [
            'Standard: $9.95 (FREE over $300) — 3–7 business days',
            'Express: $14.95 — 1–3 business days to metro',
            'Same-day Sydney metro: Free over $300 (order before 11am AEST weekday)',
          ],
        },
        {
          heading: 'dispatch times',
          paragraphs: [
            'Aussie Vape Hub dispatches same-day on weekday orders placed before 2pm AEST. Orders placed after 2pm, on weekends or on AU public holidays are dispatched the next business day.',
            'You will receive a tracking email as soon as your Aussie Vape Hub order leaves our Sydney warehouse. Tracking links update within 24 hours of dispatch.',
          ],
        },
        {
          heading: 'delivery times by region',
          list: [
            'Sydney metro: 1–2 business days standard, same-day available',
            'Melbourne, Brisbane, Canberra: 2–4 business days',
            'Adelaide: 3–5 business days',
            'Perth, Hobart, Darwin: 4–7 business days',
            'Regional & remote AU: Add 2–5 business days to capital city times',
          ],
        },
        {
          heading: 'discreet packaging',
          body: "Every Aussie Vape Hub order ships in plain, unbranded packaging. The sender name on the courier label reads 'AV Australia' rather than 'Aussie Vape Hub' for full privacy. The package contents are never visible from the outside.",
        },
        {
          heading: 'international shipping',
          body: "Aussie Vape Hub currently ships within Australia only. We do not ship internationally. This is in line with the TGA prescription model for nicotine vaping products.",
        },
        {
          heading: 'lost or delayed orders',
          body: "If your Aussie Vape Hub order hasn't arrived within the expected timeframe, contact our support team at info@vapehubvapesaustralia.com.au with your order number. We track every shipment and will investigate immediately with the courier.",
        },
      ]}
      cta={{ label: 'Track My Order', href: '/track' }}
    />
  )
}
