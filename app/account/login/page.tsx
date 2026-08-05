import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { accountLogin, getAccountSession } from '@/lib/account-auth'
import { LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Sign In to VapeHub Vapes Australia — My Account',
  robots: { index: false, follow: true },
}

export default async function AccountLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const sp = await searchParams
  const session = await getAccountSession()
  if (session) redirect(sp.next?.startsWith('/account') ? sp.next : '/account')

  const error = sp.error === '1'
  const next = sp.next ?? '/account'

  return (
    <div className="bg-soft-100 min-h-[60vh]">
      <div className="container-site py-10">
        <Breadcrumb crumbs={[{ label: 'VapeHub Vapes Australia', href: '/' }, { label: 'Sign In' }]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Login form */}
          <div className="bg-white border border-line rounded-sm p-7">
            <div className="mb-5">
              <div className="h-12 w-12 rounded-full bg-ink/5 flex items-center justify-center mb-3">
                <LockClosedIcon className="h-6 w-6 text-ink" />
              </div>
              <h1 className="font-display text-2xl font-bold text-ink uppercase tracking-wide">
                Sign In
              </h1>
              <p className="text-sm text-mute mt-1">
                Welcome back to VapeHub Vapes Australia. Sign in to view orders, addresses and preferences.
              </p>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-sm bg-price/10 border border-price/30 text-price text-sm">
                Please enter a valid email and password.
              </div>
            )}

            <form action={accountLogin} className="space-y-4">
              <input type="hidden" name="next" value={next} />

              <div>
                <label
                  htmlFor="account-email"
                  className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1"
                >
                  Email address
                </label>
                <input
                  id="account-email"
                  name="email"
                  type="email"
                  required
                  autoFocus
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="input-base"
                />
              </div>

              <div>
                <label
                  htmlFor="account-password"
                  className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1"
                >
                  Password
                </label>
                <input
                  id="account-password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Your password"
                  className="input-base"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Sign In
              </button>

              <p className="text-xs text-mute text-center">
                Don&apos;t have an account?{' '}
                <Link href="/account/register" className="text-price font-semibold hover:underline">
                  Create one
                </Link>
              </p>
            </form>
          </div>

          {/* Benefits */}
          <div className="bg-ink text-white rounded-sm p-7 flex flex-col">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-2">
              Why register
            </p>
            <h2 className="font-display text-2xl font-bold uppercase mb-4 leading-tight">
              VapeHub Vapes Australia Members
            </h2>
            <ul className="space-y-3 text-sm">
              {[
                'Save shipping addresses for faster checkout',
                'Track every VapeHub Vapes Australia order in one place',
                'Upload your prescription once — keep it on file',
                'Get exclusive member-only deals via email',
                'Faster repeat orders on your favourite brands',
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-white/85">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6 border-t border-white/10 text-xs text-white/60">
              By signing in you agree to the VapeHub Vapes Australia{' '}
              <Link href="/terms" className="underline hover:text-white">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
