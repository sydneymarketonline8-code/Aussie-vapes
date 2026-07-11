import type { Metadata } from 'next'
import { Dosis, Exo_2 } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import CartDrawer from '@/components/cart/CartDrawer'
import AgeGate from '@/components/ui/AgeGate'
import LiveChat from '@/components/layout/LiveChat'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PublicChrome from '@/components/layout/PublicChrome'
import { buildSiteMetadata, organizationJsonLd, websiteJsonLd } from '@/lib/seo'

const dosis = Dosis({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = buildSiteMetadata()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${dosis.variable} ${exo2.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <PublicChrome>
            <AgeGate />
            <AnnouncementBar />
            <Header />
          </PublicChrome>
          <main className="flex-1">{children}</main>
          <PublicChrome>
            <Footer />
            <CartDrawer />
            <LiveChat />
            <WhatsAppButton />
          </PublicChrome>
        </CartProvider>
      </body>
    </html>
  )
}
