'use client'

import { usePathname } from 'next/navigation'

/**
 * Hides public site chrome (Header/Footer/AgeGate/CartDrawer/AnnouncementBar)
 * on admin routes. Wraps each chrome element in app/layout.tsx so /admin/*
 * gets a clean canvas.
 */
export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return <>{children}</>
}
