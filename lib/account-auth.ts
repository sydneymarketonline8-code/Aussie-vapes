'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const COOKIE_NAME = 'aussievapes-account'
const SESSION_DAYS = 30

export interface AccountSession {
  email: string
  firstName: string
  lastName: string
  joinedAt: string
}

function encode(s: AccountSession): string {
  return Buffer.from(JSON.stringify(s)).toString('base64url')
}

function decode(v: string): AccountSession | null {
  try {
    return JSON.parse(Buffer.from(v, 'base64url').toString('utf8')) as AccountSession
  } catch {
    return null
  }
}

async function setSession(session: AccountSession) {
  const jar = await cookies()
  jar.set({
    name: COOKIE_NAME,
    value: encode(session),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * SESSION_DAYS,
  })
}

function nameFromEmail(email: string): { firstName: string; lastName: string } {
  const local = email.split('@')[0] ?? ''
  const parts = local.split(/[._-]+/).filter(Boolean)
  const first = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'Aussie'
  const last = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : 'Vaper'
  return { firstName: first, lastName: last }
}

/** Server action — called by the sign-in form. Demo mode: any valid email
 * + any non-empty password creates a session. */
export async function accountLogin(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '/account')

  if (!email.includes('@') || password.length < 1) {
    redirect(`/account/login?error=1${next !== '/account' ? `&next=${encodeURIComponent(next)}` : ''}`)
  }

  const { firstName, lastName } = nameFromEmail(email)
  await setSession({
    email,
    firstName,
    lastName,
    joinedAt: new Date().toISOString(),
  })
  redirect(next.startsWith('/account') ? next : '/account')
}

/** Server action — register flow. Same mechanism as login in demo mode. */
export async function accountRegister(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const firstName = String(formData.get('firstName') ?? '').trim()
  const lastName = String(formData.get('lastName') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email.includes('@') || !firstName || password.length < 6) {
    redirect('/account/register?error=1')
  }

  await setSession({
    email,
    firstName: firstName || 'Aussie',
    lastName: lastName || 'Vaper',
    joinedAt: new Date().toISOString(),
  })
  redirect('/account')
}

export async function accountLogout() {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
  redirect('/account/login')
}

export async function getAccountSession(): Promise<AccountSession | null> {
  const jar = await cookies()
  const v = jar.get(COOKIE_NAME)?.value
  if (!v) return null
  return decode(v)
}

export async function requireAccount(): Promise<AccountSession> {
  const session = await getAccountSession()
  if (!session) redirect('/account/login')
  return session
}
