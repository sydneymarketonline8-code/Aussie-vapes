'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const COOKIE_NAME = 'aussievapes-admin'
const ONE_DAY = 60 * 60 * 24

function expectedPassword(): string {
  return process.env.ADMIN_PASSWORD || 'aussievapes'
}

/** Server action — called from the login form. */
export async function login(formData: FormData) {
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '/admin')

  if (password !== expectedPassword()) {
    redirect(`/admin/login?error=1${next !== '/admin' ? `&next=${encodeURIComponent(next)}` : ''}`)
  }

  const jar = await cookies()
  jar.set({
    name: COOKIE_NAME,
    value: '1',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ONE_DAY * 7,
  })

  redirect(next.startsWith('/admin') ? next : '/admin')
}

/** Server action — clears the admin cookie. */
export async function logout() {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
  redirect('/admin/login')
}

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies()
  return jar.get(COOKIE_NAME)?.value === '1'
}
