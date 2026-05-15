import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function AnnouncementBar() {
  return (
    <div className="topbar border-b border-black/20">
      <div className="container-site flex items-center justify-between h-9 text-[11px] tracking-wider uppercase font-semibold">
        <div className="hidden md:flex items-center gap-5">
          <a href="tel:+61000000000" className="flex items-center gap-1.5 hover:text-price transition-colors">
            <PhoneIcon className="h-3.5 w-3.5" />
            <span>+61 0000 0000</span>
          </a>
          <a href="mailto:info@aussievapes.com.au" className="flex items-center gap-1.5 hover:text-price transition-colors">
            <EnvelopeIcon className="h-3.5 w-3.5" />
            <span>info@aussievapes.com.au</span>
          </a>
        </div>
        <div className="flex-1 md:flex-none text-center">
          Free shipping on orders over $300 — Australia-wide
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="/store" className="hover:text-price transition-colors">Store Locator</a>
          <a href="/track" className="hover:text-price transition-colors">Order Tracking</a>
          <a href="/help" className="hover:text-price transition-colors">Help</a>
        </div>
      </div>
    </div>
  )
}
