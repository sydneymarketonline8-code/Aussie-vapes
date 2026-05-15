import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const ADMIN_COOKIE = 'aussievapes-admin'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect /admin/* except the login route
  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    return NextResponse.next()
  }

  const token = req.cookies.get(ADMIN_COOKIE)?.value
  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
