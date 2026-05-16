import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSupabaseSession } from '@/lib/supabase/middleware'

/**
 * /admin/* is protected by Supabase Auth + a profiles.role check.
 *
 * If Supabase env vars are missing the middleware fails open (lets the
 * request through to the login page) so the build still works without
 * keys configured. The login server action also guards on env presence.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

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
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
      if (profile?.role === 'admin' || profile?.role === 'staff') {
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

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin' && profile?.role !== 'staff') {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('error', 'forbidden')
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*'],
}
