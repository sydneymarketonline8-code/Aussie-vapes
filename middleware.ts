import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSupabaseSession } from '@/lib/supabase/middleware'
import { blockHotlinks, blockScrapers } from '@/lib/content-protection'

/**
 * Every request: scraper / site-downloader and image-hotlink filtering
 * (see lib/content-protection.ts).
 *
 * /admin/* is protected by Supabase Auth + a profiles.role check.
 *
 * If Supabase env vars are missing the middleware fails open (lets the
 * request through to the login page) so the build still works without
 * keys configured. The login server action also guards on env presence.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const blocked = blockScrapers(req) ?? blockHotlinks(req)
  if (blocked) return blocked

  if (!pathname.startsWith('/admin')) return NextResponse.next()

  const isLoginRoute = pathname === '/admin/login' || pathname.startsWith('/admin/login/')

  const supabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseConfigured) {
    return NextResponse.next()
  }

  const { supabaseResponse, supabase, user } = await updateSupabaseSession(req)

  if (isLoginRoute) {
    // If already signed in as an admin, skip the login page and go to /admin.
    if (user) {
      const { data: role } = await supabase.rpc('get_user_role', { uid: user.id })
      if (role === 'admin' || role === 'staff') {
        const url = req.nextUrl.clone()
        url.pathname = '/admin'
        url.searchParams.delete('next')
        url.searchParams.delete('error')
        return NextResponse.redirect(url)
      }
    }
    return supabaseResponse
  }

  if (!user) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  const { data: role } = await supabase.rpc('get_user_role', { uid: user.id })

  if (role !== 'admin' && role !== 'staff') {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('error', 'forbidden')
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  // Everything except build assets (JS/CSS/fonts), which carry no catalogue content.
  matcher: ['/((?!_next/static|_next/webpack-hmr|favicon.ico|icon.svg|apple-icon.svg).*)'],
}
