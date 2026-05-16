'use server'

import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

/**
 * Server action — handles /admin/login form submission.
 *
 * Flow:
 *   1. Email + password sign-in via Supabase Auth.
 *   2. Look up the user's row in public.profiles.
 *   3. Reject (and sign out) if role is not 'admin' or 'staff'.
 *   4. Redirect to the requested admin path (or /admin by default).
 *
 * Redirect targets carry an error code for the UI:
 *   ?error=credentials  → bad email/password
 *   ?error=forbidden    → valid login but no admin role
 *   ?error=config       → Supabase env vars not set
 */
export async function login(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '/admin')

  if (!email || !password) {
    redirect(buildLoginUrl('credentials', next))
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    redirect(buildLoginUrl('config', next))
  }

  const supabase = await createSupabaseServerClient()

  const { data: signIn, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError || !signIn.user) {
    redirect(buildLoginUrl('credentials', next))
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', signIn.user.id)
    .single()

  const role = profile?.role
  if (role !== 'admin' && role !== 'staff') {
    await supabase.auth.signOut()
    redirect(buildLoginUrl('forbidden', next))
  }

  redirect(next.startsWith('/admin') ? next : '/admin')
}

/** Server action — signs the admin out and returns to the login screen. */
export async function logout() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

/**
 * Server-side admin check used by layouts/pages that need to gate UI.
 * Middleware already redirects unauthenticated requests, so this is a
 * second-layer check (defence in depth).
 */
export async function isAdmin(): Promise<boolean> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return false
  }

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return profile?.role === 'admin' || profile?.role === 'staff'
}

/** Returns the signed-in admin's profile, or null if none. */
export async function getAdminProfile() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, first_name, last_name, role')
    .eq('id', user.id)
    .single()

  if (!profile || (profile.role !== 'admin' && profile.role !== 'staff')) return null
  return profile
}

function buildLoginUrl(error: string, next: string): string {
  const params = new URLSearchParams({ error })
  if (next && next !== '/admin') params.set('next', next)
  return `/admin/login?${params.toString()}`
}
