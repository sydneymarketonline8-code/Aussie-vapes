import Link from 'next/link'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import NewsletterForm from './NewsletterForm'

const shop = [
  { label: 'Disposable Vapes', href: '/category/disposable-vapes' },
  { label: 'Pod Systems', href: '/category/pod-systems' },
  { label: 'Nicotine Salts', href: '/category/nicotine-salts' },
  { label: 'E-Liquids', href: '/category/e-liquids' },
  { label: 'Accessories', href: '/category/accessories' },
  { label: 'Sale', href: '/sale' },
]

const support = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Order Tracking', href: '/track' },
  { label: 'Shipping Policy', href: '/shipping' },
  { label: 'Returns & Refunds', href: '/returns' },
  { label: 'Beginners Guide', href: '/beginners-guide' },
  { label: 'FAQ', href: '/faq' },
]

const account = [
  { label: 'My Account', href: '/account' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Order History', href: '/account/orders' },
  { label: 'About Us', href: '/about' },
  { label: 'Vaping Laws AU', href: '/vaping-laws-australia' },
  { label: 'Blog', href: '/blog' },
]

const legal = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap.xml' },
]

export default function Footer() {
  return (
    <footer className="mt-20 bg-soft-100 border-t border-line">
      {/* Newsletter strip */}
      <div className="bg-ink text-white">
        <div className="container-site py-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">Subscribe & Save</h3>
            <p className="text-sm text-white/70 mt-1">Get 10% off your first order plus exclusive deals straight to your inbox.</p>
          </div>
          <div className="lg:max-w-md w-full lg:ml-auto">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="container-site py-14 grid grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand + contact */}
        <div className="col-span-2">
          <Link href="/" className="inline-block mb-4">
            <span className="font-display text-2xl font-bold tracking-tight text-ink leading-none">
              VAPEVAULT
              <span className="block text-[10px] tracking-[0.3em] text-price font-semibold mt-1">
                AUSTRALIA
              </span>
            </span>
          </Link>
          <p className="text-body text-sm leading-relaxed mb-5 max-w-md">
            Australia&apos;s premium online vape destination. Disposable vapes, pod systems, nicotine salts and e-liquids — shipped fast from Australian stock.
          </p>

          <ul className="space-y-2.5 text-sm">
            <li className="flex items-start gap-2 text-body">
              <MapPinIcon className="h-4 w-4 text-price flex-shrink-0 mt-0.5" />
              Sydney, NSW, Australia
            </li>
            <li className="flex items-start gap-2 text-body">
              <PhoneIcon className="h-4 w-4 text-price flex-shrink-0 mt-0.5" />
              <a href="tel:+61000000000" className="hover:text-price">+61 0000 0000</a>
            </li>
            <li className="flex items-start gap-2 text-body">
              <EnvelopeIcon className="h-4 w-4 text-price flex-shrink-0 mt-0.5" />
              <a href="mailto:info@vapevaultau.com.au" className="hover:text-price">info@vapevaultau.com.au</a>
            </li>
            <li className="flex items-start gap-2 text-body">
              <ClockIcon className="h-4 w-4 text-price flex-shrink-0 mt-0.5" />
              Mon-Fri 9am–5pm AEST
            </li>
          </ul>

          <div className="flex gap-3 mt-5">
            {[
              { label: 'Instagram', href: 'https://instagram.com', icon: '📸' },
              { label: 'Facebook', href: 'https://facebook.com', icon: '📘' },
              { label: 'TikTok', href: 'https://tiktok.com', icon: '🎵' },
              { label: 'YouTube', href: 'https://youtube.com', icon: '▶' },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-10 w-10 flex items-center justify-center rounded-sm bg-white border border-line hover:bg-ink hover:text-white hover:border-ink transition-colors text-base"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Shop column */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-4 pb-2 border-b border-line">Shop</h3>
          <ul className="space-y-2.5">
            {shop.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-body hover:text-price transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support column */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-4 pb-2 border-b border-line">Support</h3>
          <ul className="space-y-2.5">
            {support.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-body hover:text-price transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account column */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-4 pb-2 border-b border-line">Account</h3>
          <ul className="space-y-2.5">
            {account.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-body hover:text-price transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trust badges */}
      <div className="border-t border-line bg-white">
        <div className="container-site py-5 flex flex-wrap items-center justify-center gap-6 text-xs text-mute font-display uppercase tracking-wider font-semibold">
          {['🔒 Secure SSL Checkout', '🚚 Fast AU Dispatch', '✅ Age Verified Store', '🇦🇺 Australian Owned', '📦 Easy Returns', '💳 Multiple Payment Options'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-line bg-ink text-white">
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/70 text-center sm:text-left">
            © {new Date().getFullYear()} VapeVault AU. All rights reserved. ABN: 00 000 000 000
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {legal.map(({ label, href }) => (
              <Link key={href} href={href} className="text-xs text-white/70 hover:text-price transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="container-site pb-4">
          <p className="text-[10px] text-white/50 text-center leading-relaxed">
            ⚠️ Nicotine products are highly addictive and not risk-free. For adult use only (18+). VapeVault AU does not sell nicotine products without a valid Australian prescription where required by law. Please vape responsibly.
          </p>
        </div>
      </div>
    </footer>
  )
}
