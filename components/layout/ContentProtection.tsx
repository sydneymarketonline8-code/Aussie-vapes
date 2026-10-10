'use client'

import { useEffect } from 'react'

/**
 * Deters casual image saving on the storefront: blocks the right-click menu
 * and drag-to-desktop on images, and (via the `protect-media` class + CSS in
 * globals.css) the iOS/Android long-press "Save image" sheet.
 *
 * Deliberately images-only — text stays selectable because customers need to
 * copy PayID details, order references and addresses. This is a deterrent,
 * not DRM: anything a browser can display can still be screenshotted.
 */
export default function ContentProtection() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('protect-media')

    const isImage = (t: EventTarget | null) =>
      t instanceof Element && (t.tagName === 'IMG' || t.tagName === 'PICTURE' || !!t.closest('picture'))

    const block = (e: Event) => {
      if (isImage(e.target)) e.preventDefault()
    }

    document.addEventListener('contextmenu', block)
    document.addEventListener('dragstart', block)
    return () => {
      root.classList.remove('protect-media')
      document.removeEventListener('contextmenu', block)
      document.removeEventListener('dragstart', block)
    }
  }, [])

  return null
}
