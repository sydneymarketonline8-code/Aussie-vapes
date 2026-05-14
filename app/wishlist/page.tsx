import type { Metadata } from 'next'
import ComingSoonPage from '@/components/layout/ComingSoonPage'

export const metadata: Metadata = {
  title: 'My Aussie Vapes Wishlist',
  description: 'Save your favourite Aussie Vapes products for later. Wishlist feature coming soon — for now, bookmark your favourite Aussie Vapes brand and category pages.',
  alternates: { canonical: '/wishlist' },
  robots: { index: false, follow: true },
}

export default function WishlistPage() {
  return (
    <ComingSoonPage
      breadcrumb="Wishlist"
      title="my aussie vapes wishlist"
      intro="Build a wishlist of your favourite Aussie Vapes products to come back to later. The wishlist feature is launching soon."
    />
  )
}
