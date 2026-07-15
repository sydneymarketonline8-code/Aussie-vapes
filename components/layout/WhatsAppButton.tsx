'use client'

import { usePathname } from 'next/navigation'

/**
 * Floating WhatsApp click-to-chat button.
 *
 * The destination phone number is hardcoded (digits only, international
 * format without + or spaces). It is deliberately NOT read from an env var:
 * a stale NEXT_PUBLIC_WHATSAPP_NUMBER in the host kept resurrecting old /
 * banned numbers. To change it, edit WHATSAPP_NUMBER here.
 *
 * Hidden on /admin/* and /checkout/success/* — same logic as <LiveChat>.
 * Positioned bottom-LEFT so it doesn't visually compete with the Crisp
 * chat bubble in the bottom-right corner.
 */

const WHATSAPP_NUMBER = '61468189205' // +61 468 189 205

export default function WhatsAppButton() {
  const pathname = usePathname()

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/checkout/success')
  ) {
    return null
  }

  // Strip everything that isn't a digit so the wa.me URL is always valid
  const number = WHATSAPP_NUMBER.replace(/\D/g, '')
  if (!number) return null

  const prefill = encodeURIComponent(
    "Hi Vapes Australia — I have a question about an order/product.",
  )
  const href = `https://wa.me/${number}?text=${prefill}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 left-5 z-40 inline-flex items-center justify-center h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-transform hover:scale-110"
      style={{ background: '#25D366' }}
    >
      <WhatsAppIcon className="h-7 w-7 text-white" />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  // Official WhatsApp glyph (simplified, single path)
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.92.55 3.78 1.6 5.41L2 22l4.83-1.7a9.84 9.84 0 0 0 5.21 1.49h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.13-2.91-7.01A9.81 9.81 0 0 0 12.04 2zm0 18.13h-.01a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.1 1.09 1.04-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.52 3.68-8.21 8.21-8.21 2.19 0 4.25.86 5.8 2.41a8.15 8.15 0 0 1 2.41 5.8c0 4.53-3.69 8.21-8.21 8.21zm4.5-6.15c-.24-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.96-.14.16-.29.18-.53.06-.24-.12-1.04-.38-1.97-1.22a7.42 7.42 0 0 1-1.37-1.7c-.14-.24-.01-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.81-.2-.48-.4-.42-.55-.42l-.47-.01a.9.9 0 0 0-.66.31c-.22.24-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.46-.28z" />
    </svg>
  )
}
