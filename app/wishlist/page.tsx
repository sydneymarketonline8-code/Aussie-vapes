import type { Metadata } from 'next'
import ComingSoonPage from '@/components/layout/ComingSoonPage'

export const metadata: Metadata = {
  title: 'My Aussie Vape Hub Wishlist',
  description: 'Save your favourite Aussie Vape Hub products for later. Wishlist feature coming soon — for now, bookmark your favourite Aussie Vape Hub brand and category pages.',
  alternates: { canonical: '/wishlist' },
  robots: { index: false, follow: true },
}

export default function WishlistPage() {
  return (
    <ComingSoonPage
      breadcrumb="Wishlist"
      title="my aussie vape hub wishlist"
      intro="Build a wishlist of your favourite Aussie Vape Hub products to come back to later. The wishlist feature is launching soon."
    />
  )
}
