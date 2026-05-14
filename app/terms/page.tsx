import type { Metadata } from 'next'
import InfoPageShell from '@/components/layout/InfoPageShell'

export const metadata: Metadata = {
  title: 'Aussie Vapes Terms of Service',
  description:
    "The terms and conditions governing your use of the Aussie Vapes website and your purchase of products. By using Aussie Vapes you agree to these terms.",
  keywords: ['aussie vapes terms', 'aussie vapes terms of service', 'aussie vapes tos'],
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <InfoPageShell
      title="aussie vapes terms of service"
      intro="These terms govern your use of Aussie Vapes and the purchase of any products from us. By using the Aussie Vapes website or placing an order you agree to be bound by these terms."
      sections={[
        {
          heading: 'eligibility',
          body: "You must be 18 years or older to use Aussie Vapes. We enforce an age-gate on every visit and decline orders from anyone under 18. For nicotine-containing products you must also hold a valid Australian prescription.",
        },
        {
          heading: 'product information',
          body: "Aussie Vapes makes every reasonable effort to ensure product descriptions, prices and images are accurate. However we reserve the right to correct errors and update product information at any time without notice. In the rare event of a pricing error, we will contact you before processing the order.",
        },
        {
          heading: 'orders and payment',
          list: [
            'All Aussie Vapes orders are subject to acceptance and product availability',
            'Prices are displayed in Australian Dollars (AUD) and include GST where applicable',
            'Payment must be made in full at the time of order',
            'We accept major credit cards and PayPal through our PCI-compliant payment processor',
            'Aussie Vapes reserves the right to cancel any order for any reason, including suspected fraud',
          ],
        },
        {
          heading: 'shipping and delivery',
          body: "Shipping is governed by the Aussie Vapes Shipping Policy. While we dispatch promptly, we are not responsible for courier delays once an order has left our warehouse.",
        },
        {
          heading: 'returns and refunds',
          body: "Returns are governed by the Aussie Vapes Returns Policy. Unopened products can be returned within 30 days; faulty products are replaced free of charge.",
        },
        {
          heading: 'prescription requirement',
          body: "Nicotine vaping products sold by Aussie Vapes require the customer to confirm they hold a valid Australian prescription, in compliance with TGA Therapeutic Goods (Standard for Nicotine Vaping Products) (TGO 110) Order 2021. Making false declarations is a serious offence under Australian law.",
        },
        {
          heading: 'intellectual property',
          body: "All content on Aussie Vapes — including text, images, logos, design — is the property of Aussie Vapes or its licensors and is protected by Australian and international copyright law. You may not reproduce, distribute or commercially use any Aussie Vapes content without prior written permission.",
        },
        {
          heading: 'limitation of liability',
          body: "To the maximum extent permitted by Australian law, Aussie Vapes is not liable for indirect, incidental, special or consequential damages arising from the use of our products or website. Nothing in these terms excludes or limits any non-excludable rights you have under Australian Consumer Law.",
        },
        {
          heading: 'governing law',
          body: 'These terms are governed by the laws of New South Wales, Australia. Any disputes will be resolved in NSW courts.',
        },
        {
          heading: 'changes to these terms',
          body: 'Aussie Vapes may update these terms from time to time. Continued use of the Aussie Vapes website after changes are posted constitutes acceptance of the updated terms.',
        },
      ]}
    />
  )
}
