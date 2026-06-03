'use client'

import { useEffect, useRef } from 'react'

/**
 * Opens the WhatsApp deep-link in a new tab once, ~1.5s after the success
 * page renders. The delay gives the customer a moment to see the order
 * confirmation before the WhatsApp chat takes focus.
 *
 * We use sessionStorage to fence the launch so the customer isn't repeatedly
 * re-directed if they navigate back or refresh within the same session.
 * Popup blockers will still suppress the new tab on some browsers — that's
 * fine because the visible green "Open WhatsApp" button remains the primary
 * fallback.
 */
export default function WhatsAppAutoLaunch({ href }: { href: string }) {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    const key = `wa-launched:${href}`
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(key)) return

    const t = window.setTimeout(() => {
      sessionStorage.setItem(key, '1')
      window.open(href, '_blank', 'noopener,noreferrer')
    }, 1500)

    return () => window.clearTimeout(t)
  }, [href])

  return null
}
