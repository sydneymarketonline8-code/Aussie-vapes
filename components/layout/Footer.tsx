import Link from 'next/link'
import NewsletterForm from './NewsletterForm'

const shop = [
  { label: 'Disposable Vapes', href: '/category/disposable-vapes' },
  { label: 'Pod Systems', href: '/category/pod-systems' },
  { label: 'Nicotine Salts', href: '/category/nicotine-salts' },
  { label: 'E-Liquids', href: '/category/e-liquids' },
  { label: 'Accessories', href: '/category/accessories' },
  { label: 'Sale', href: '/sale' },
]

const info = [
  { label: 'About Us', href: '/about' },
  { label: 'Vaping Laws in Australia', href: '/vaping-laws-australia' },
  { label: 'Nicotine FAQ', href: '/faq' },
  { label: 'Beginners Guide', href: '/beginners-guide' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
]

const legal = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Returns & Refunds', href: '/returns' },
  { label: 'Shipping Policy', href: '/shipping' },
]

export default function Footer() {
  return (
    <footer className="bg-surface-800 border-t border-surface-600 mt-20">
      {/* Main footer grid */}
      <div className="container-site py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div>
          <Link href="/" className="inline-block mb-4">
            <span className="text-xl font-black">
              <span className="text-gradient">VapeVault</span>
              <span className="text-zinc-400 font-light"> AU</span>
            </span>
          </Link>
          <p className="text-zinc-500 text-sm leading-relaxed mb-5">
            Australia&apos;s premium online vape destination. Disposable vapes, pod systems, nicotine salts and e-liquids — shipped fast from Australian stock.
          </p>
          <div className="flex gap-3">
            {[
              { label: 'Instagram', href: 'https://instagram.com', icon: '📸' },
              { label: 'Facebook', href: 'https://facebook.com', icon: '📘' },
              { label: 'TikTok', href: 'https://tiktok.com', icon: '🎵' },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-surface-700 hover:bg-surface-600 border border-surface-500 hover:border-brand/50 transition-colors text-base"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Shop column */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Shop</h3>
          <ul className="space-y-2.5">
            {shop.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-zinc-500 hover:text-brand transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info column */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Information</h3>
          <ul className="space-y-2.5">
            {info.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-zinc-500 hover:text-brand transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter column */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Stay in the Loop</h3>
          <p className="text-sm text-zinc-500 mb-4">Get exclusive deals, new arrivals and restocks delivered to your inbox.</p>
          <NewsletterForm />
          <p className="text-zinc-600 text-xs mt-2">No spam. Unsubscribe any time.</p>
        </div>
      </div>

      {/* Trust badges strip */}
      <div className="border-t border-surface-600">
        <div className="container-site py-4 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600">
          {['🔒 Secure SSL Checkout', '🚚 Fast AU Dispatch', '✅ Age Verified Store', '🇦🇺 Australian Owned', '📦 Easy Returns'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* Legal bottom strip */}
      <div className="border-t border-surface-600 bg-surface-950">
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600 text-center sm:text-left">
            © {new Date().getFullYear()} VapeVault AU. All rights reserved. ABN: 00 000 000 000
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {legal.map(({ label, href }) => (
              <Link key={href} href={href} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="container-site pb-3">
          <p className="text-[10px] text-zinc-700 text-center">
            ⚠️ Nicotine products are highly addictive and not risk-free. For adult use only (18+). VapeVault AU does not sell nicotine products without a valid Australian prescription where required by law. Please vape responsibly.
          </p>
        </div>
      </div>
    </footer>
  )
}
