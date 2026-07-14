import Link from 'next/link'
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  LockClosedIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowUturnLeftIcon,
  CreditCardIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline'
import NewsletterForm from './NewsletterForm'

const shop = [
  { label: 'Disposable Vapes', href: '/category/disposable-vapes' },
  { label: 'Pod Systems', href: '/category/pod-systems' },
  { label: 'Nicotine Salts', href: '/category/nicotine-salts' },
  { label: 'E-Liquids', href: '/category/e-liquids' },
  { label: 'Vape Packs', href: '/packs' },
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
  { label: 'About Vapes Australia', href: '/about' },
  { label: 'Vaping Laws AU', href: '/vaping-laws-australia' },
  { label: 'Bulk & Wholesale', href: '/bulk' },
  { label: 'Blog', href: '/blog' },
]

const locations = [
  { label: 'Vapes Australia Sydney', href: '/vapes-australia/sydney' },
  { label: 'Vapes Australia Melbourne', href: '/vapes-australia/melbourne' },
  { label: 'Vapes Australia Brisbane', href: '/vapes-australia/brisbane' },
  { label: 'Vapes Australia Perth', href: '/vapes-australia/perth' },
  { label: 'Vapes Australia Adelaide', href: '/vapes-australia/adelaide' },
  { label: 'All Locations', href: '/vapes-australia' },
]

const legal = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap-html' },
]

export default function Footer() {
  return (
    <footer className="mt-20 bg-soft-100 border-t border-line">
      {/* Newsletter strip */}
      <div className="bg-ink text-white">
        <div className="container-site py-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">Join the Vapes Australia Club</h3>
            <p className="text-sm text-white/70 mt-1">Get 10% off your first Vapes Australia order plus exclusive deals straight to your inbox.</p>
          </div>
          <div className="lg:max-w-md w-full lg:ml-auto">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Packs strip */}
      <div className="border-t border-line bg-ink text-white">
        <div className="container-site py-6">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold text-center mb-3">Vape Packs</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/packs" className="font-display text-sm font-bold uppercase tracking-wider text-white hover:text-price transition-colors">
              All Vape Packs
            </Link>
            <Link href="/packs/disposable-vape-packs" className="font-display text-sm font-bold uppercase tracking-wider text-white hover:text-price transition-colors">
              Disposable Vape Packs
            </Link>
            <Link href="/packs/multi-buy-packs" className="font-display text-sm font-bold uppercase tracking-wider text-white hover:text-price transition-colors">
              Multi-Buy Packs
            </Link>
            <Link href="/packs/bundle-deals" className="font-display text-sm font-bold uppercase tracking-wider text-white hover:text-price transition-colors">
              Bundle Deals
            </Link>
            <Link href="/packs/brand-packs" className="font-display text-sm font-bold uppercase tracking-wider text-white hover:text-price transition-colors">
              Brand Packs
            </Link>
            <Link href="/packs/bulk-vape-packs" className="font-display text-sm font-bold uppercase tracking-wider text-white hover:text-price transition-colors">
              Bulk Vape Packs
            </Link>
          </div>
        </div>
      </div>

      {/* Top brands strip */}
      <div className="border-t border-line bg-white">
        <div className="container-site py-6">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-mute font-bold text-center mb-3">Top Brands At Vapes Australia</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {['IGET', 'Alfakher', 'HQD', 'Gunnpod', 'Lost Mary', 'Vozol', 'RELX', 'Elux', 'Mr Fog', 'AliBarBar', 'JNR', 'Serein'].map((b) => (
              <a
                key={b}
                href={`/brand/${b.toLowerCase().replace(/\s+/g, '-')}`}
                className="font-display text-sm font-bold uppercase tracking-wider text-ink hover:text-price transition-colors"
                title={`${b} at Vapes Australia`}
              >
                {b}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="container-site py-14 grid grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand + contact */}
        <div className="col-span-2">
          <Link href="/" className="inline-block mb-4">
            <span className="font-display text-2xl font-bold tracking-tight text-ink leading-none">
              VAPES <span className="text-price">AUSTRALIA</span>
              <span className="block text-[10px] tracking-[0.3em] text-mute font-semibold mt-1">
                AUSTRALIA&apos;S #1 ONLINE VAPE STORE
              </span>
            </span>
          </Link>
          <p className="text-body text-sm leading-relaxed mb-5 max-w-md">
            <strong>Vapes Australia</strong> is Australia&apos;s #1 online vape store. Authentic disposable vapes from IGET, Alfakher, HQD, Gunnpod, Lost Mary and 35+ more brands — shipped same-day from our Sydney warehouse, free across Australia on orders over $300.
          </p>

          <ul className="space-y-2.5 text-sm">
            <li className="flex items-start gap-2 text-body">
              <MapPinIcon className="h-4 w-4 text-price flex-shrink-0 mt-0.5" />
              Sydney, NSW, Australia
            </li>
            <li className="flex items-start gap-2 text-body">
              <PhoneIcon className="h-4 w-4 text-price flex-shrink-0 mt-0.5" />
              <a href="tel:+61485882439" className="hover:text-price">+61 485 882 439</a>
            </li>
            <li className="flex items-start gap-2 text-body">
              <EnvelopeIcon className="h-4 w-4 text-price flex-shrink-0 mt-0.5" />
              <a href="mailto:info@vapesaustralia.com.au" className="hover:text-price">info@vapesaustralia.com.au</a>
            </li>
            <li className="flex items-start gap-2 text-body">
              <ClockIcon className="h-4 w-4 text-price flex-shrink-0 mt-0.5" />
              Mon-Fri 9am–5pm AEST
            </li>
          </ul>

          <div className="flex gap-3 mt-5">
            {[
              {
                label: 'Instagram',
                href: 'https://instagram.com',
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                ),
              },
              {
                label: 'Facebook',
                href: 'https://facebook.com',
                svg: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9c0-.9.3-1.5 1.5-1.5h1.5V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.6v7h2.9z" />
                  </svg>
                ),
              },
              {
                label: 'TikTok',
                href: 'https://tiktok.com',
                svg: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M16.5 3h-3v12a2.5 2.5 0 1 1-2.5-2.5h.5V9.5h-.5a5.5 5.5 0 1 0 5.5 5.5V9.2c1 .6 2.2 1 3.5 1V7.2A4.7 4.7 0 0 1 16.5 3z" />
                  </svg>
                ),
              },
              {
                label: 'YouTube',
                href: 'https://youtube.com',
                svg: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M21.6 7.3a2.5 2.5 0 0 0-1.7-1.7C18.3 5.2 12 5.2 12 5.2s-6.3 0-7.9.4A2.5 2.5 0 0 0 2.4 7.3 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.7 2.5 2.5 0 0 0 1.7 1.7c1.6.4 7.9.4 7.9.4s6.3 0 7.9-.4a2.5 2.5 0 0 0 1.7-1.7A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.7zM10 15V9l5 3-5 3z" />
                  </svg>
                ),
              },
            ].map(({ label, href, svg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="h-10 w-10 flex items-center justify-center rounded-sm bg-white border border-line text-ink hover:bg-ink hover:text-white hover:border-ink transition-colors"
              >
                {svg}
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

      {/* Locations strip */}
      <div className="border-t border-line bg-white">
        <div className="container-site py-6">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-mute font-bold text-center mb-3">Vapes Australia Locations</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {locations.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-display text-sm font-bold uppercase tracking-wider text-ink hover:text-price transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="border-t border-line bg-white">
        <div className="container-site py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-mute font-display uppercase tracking-wider font-semibold">
          {[
            { Icon: LockClosedIcon, label: 'Secure SSL Checkout' },
            { Icon: TruckIcon, label: 'Fast AU Dispatch' },
            { Icon: ShieldCheckIcon, label: 'Age Verified Store' },
            { Icon: CheckBadgeIcon, label: 'Australian Owned' },
            { Icon: ArrowUturnLeftIcon, label: 'Easy Returns' },
            { Icon: CreditCardIcon, label: 'Multiple Payment Options' },
          ].map(({ Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <Icon className="h-4 w-4 text-ink" />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-line bg-ink text-white">
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/70 text-center sm:text-left">
            © {new Date().getFullYear()} Vapes Australia. All rights reserved. ABN: 00 000 000 000 — Australia&apos;s #1 Online Vape Store
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
            Nicotine products are highly addictive and not risk-free. For adult use only (18+). Vapes Australia does not sell nicotine products without a valid Australian prescription where required by law. Please vape responsibly.
          </p>
        </div>
      </div>
    </footer>
  )
}
