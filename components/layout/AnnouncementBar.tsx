import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function AnnouncementBar() {
  return (
    <div className="topbar border-b border-black/20">
      <div className="container-site flex items-center justify-between h-9 text-[11px] tracking-wider uppercase font-semibold">
        <div className="hidden md:flex items-center gap-5">
          <a href="tel:+61468188347" className="flex items-center gap-1.5 hover:text-price transition-colors">
            <PhoneIcon className="h-3.5 w-3.5" />
            <span>+61 468 188 347</span>
          </a>
          <a href="mailto:info@vapesaustralia.com.au" className="flex items-center gap-1.5 hover:text-price transition-colors">
            <EnvelopeIcon className="h-3.5 w-3.5" />
            <span>info@vapesaustralia.com.au</span>
          </a>
        </div>
        <div className="flex-1 md:flex-none text-center">
          $250 minimum order · Free shipping over $300 — Australia-wide
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
