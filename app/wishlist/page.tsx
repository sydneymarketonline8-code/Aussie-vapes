import type { Metadata } from 'next'
import ComingSoonPage from '@/components/layout/ComingSoonPage'

export const metadata: Metadata = {
  title: 'My Vapes Near Me Wishlist',
  description: 'Save your favourite Vapes Near Me products for later. Wishlist feature coming soon — for now, bookmark your favourite Vapes Near Me brand and category pages.',
  alternates: { canonical: '/wishlist' },
  robots: { index: false, follow: true },
}

export default function WishlistPage() {
  return (
    <ComingSoonPage
      breadcrumb="Wishlist"
      title="my vapes near me wishlist"
      intro="Build a wishlist of your favourite Vapes Near Me products to come back to later. The wishlist feature is launching soon."
    />
  )
}
