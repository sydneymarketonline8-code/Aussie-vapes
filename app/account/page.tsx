import type { Metadata } from 'next'
import ComingSoonPage from '@/components/layout/ComingSoonPage'

export const metadata: Metadata = {
  title: 'My Aussie Vapes Account',
  description: 'Sign in to your Aussie Vapes account to manage orders, addresses and preferences. Customer account portal coming soon.',
  alternates: { canonical: '/account' },
  robots: { index: false, follow: true },
}

export default function AccountPage() {
  return (
    <ComingSoonPage
      breadcrumb="My Account"
      title="my aussie vapes account"
      intro="Sign in to manage your Aussie Vapes orders, shipping addresses, prescription info and saved payment methods. Our full self-service account portal is launching soon."
      body="In the meantime, every Aussie Vapes order can be tracked via the link in your confirmation email, and our support team can help with any account or order question within 4 business hours."
    />
  )
}
