import type { Metadata } from 'next'
import ComingSoonPage from '@/components/layout/ComingSoonPage'

export const metadata: Metadata = {
  title: 'My VapeHub Vapes Australia Wishlist',
  description: 'Save your favourite VapeHub Vapes Australia products for later. Wishlist feature coming soon — for now, bookmark your favourite VapeHub Vapes Australia brand and category pages.',
  alternates: { canonical: '/wishlist' },
  robots: { index: false, follow: true },
}

export default function WishlistPage() {
  return (
    <ComingSoonPage
      breadcrumb="Wishlist"
      title="my vapehub vapes australia wishlist"
      intro="Build a wishlist of your favourite VapeHub Vapes Australia products to come back to later. The wishlist feature is launching soon."
    />
  )
}
