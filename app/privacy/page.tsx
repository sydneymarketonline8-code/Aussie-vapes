import type { Metadata } from 'next'
import InfoPageShell from '@/components/layout/InfoPageShell'

export const metadata: Metadata = {
  title: 'Vapes Australia Privacy Policy',
  description:
    "How Vapes Australia collects, uses, stores and protects your personal information. Compliant with the Australian Privacy Act 1988.",
  keywords: ['vapes australia privacy policy', 'vapes australia privacy', 'australian vape privacy policy'],
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <InfoPageShell
      title="vapes australia privacy policy"
      intro="Vapes Australia respects your privacy. This page explains how we collect, use, store and protect your personal information in accordance with the Australian Privacy Act 1988 and the Australian Privacy Principles (APPs)."
      sections={[
        {
          heading: 'information we collect',
          body: "Vapes Australia collects personal information you provide directly — name, email, phone, billing/shipping address, payment details (handled by our PCI-compliant payment processor, not stored by us), prescription confirmation, and date-of-birth verification.",
        },
        {
          heading: 'how vapes australia uses your information',
          list: [
            'Process and dispatch your Vapes Australia orders',
            'Send order confirmations, shipping updates and delivery notifications',
            'Verify your age (18+) and prescription status as required by AU law',
            'Respond to your customer support enquiries',
            'Send marketing emails ONLY if you opt-in (you can unsubscribe at any time)',
            'Improve the Vapes Australia website and customer experience',
            'Comply with Australian legal and regulatory obligations',
          ],
        },
        {
          heading: 'cookies and tracking',
          body: "Vapes Australia uses cookies to remember your cart, your age-gate confirmation, and (with your consent) analytics tools like Google Analytics. You can disable cookies in your browser settings, though this may affect site functionality.",
        },
        {
          heading: 'sharing of information',
          body: "Vapes Australia does NOT sell your personal information. We share only what's necessary with: couriers (for delivery), payment processors (for transactions), and Australian government bodies (only when legally required, e.g. ATO).",
        },
        {
          heading: 'data security',
          body: "All data transmitted to Vapes Australia is encrypted using SSL/TLS. Payment information is processed by PCI-DSS compliant processors and never stored on our servers. Customer records are stored on secure Australian-based infrastructure.",
        },
        {
          heading: 'your rights',
          list: [
            'Access the personal information Vapes Australia holds about you (free of charge, within 30 days)',
            'Correct any inaccurate or outdated information',
            'Request deletion of your data (subject to legal record-keeping requirements)',
            'Opt out of marketing communications at any time',
            'Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)',
          ],
        },
        {
          heading: 'contact vapes australia about privacy',
          body: "Privacy questions, data access requests or complaints can be sent to privacy@vapesaustralia.com.au. We aim to respond within 5 business days. For unresolved complaints, contact the OAIC at oaic.gov.au.",
        },
        {
          heading: 'policy updates',
          body: 'This policy was last updated in 2026. Vapes Australia may update this policy from time to time — material changes will be notified via email to registered customers.',
        },
      ]}
    />
  )
}
