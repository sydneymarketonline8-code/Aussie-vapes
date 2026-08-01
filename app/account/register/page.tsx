import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { accountRegister, getAccountSession } from '@/lib/account-auth'
import { UserPlusIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Create Aussie Vape Hub Account',
  robots: { index: false, follow: true },
}

export default async function AccountRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const sp = await searchParams
  const session = await getAccountSession()
  if (session) redirect('/account')

  const error = sp.error === '1'

  return (
    <div className="bg-soft-100 min-h-[60vh]">
      <div className="container-site py-10 max-w-xl">
        <Breadcrumb crumbs={[{ label: 'Aussie Vape Hub', href: '/' }, { label: 'Create Account' }]} />

        <div className="mt-6 bg-white border border-line rounded-sm p-7">
          <div className="mb-5">
            <div className="h-12 w-12 rounded-full bg-ink/5 flex items-center justify-center mb-3">
              <UserPlusIcon className="h-6 w-6 text-ink" />
            </div>
            <h1 className="font-display text-2xl font-bold text-ink uppercase tracking-wide">
              Create Your Aussie Vape Hub Account
            </h1>
            <p className="text-sm text-mute mt-1">
              Faster checkout, order tracking, and exclusive member offers — adults 18+.
            </p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-sm bg-price/10 border border-price/30 text-price text-sm">
              Please fill in all required fields. Password must be at least 6 characters.
            </div>
          )}

          <form action={accountRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="reg-firstname" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
                  First name *
                </label>
                <input
                  id="reg-firstname"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  placeholder="Jane"
                  className="input-base"
                />
              </div>
              <div>
                <label htmlFor="reg-lastname" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
                  Last name
                </label>
                <input
                  id="reg-lastname"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Doe"
                  className="input-base"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
                Email address *
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="input-base"
              />
            </div>

            <div>
              <label htmlFor="reg-password" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
                Password *
              </label>
              <input
                id="reg-password"
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="At least 6 characters"
                className="input-base"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-sm border border-line bg-soft-100">
              <input
                type="checkbox"
                required
                className="mt-0.5 rounded-sm border-line bg-white text-ink focus:ring-ink"
              />
              <span className="text-sm text-body">
                I confirm I am <strong className="text-ink">18 years or older</strong> and agree to the Aussie Vape Hub{' '}
                <Link href="/terms" className="text-price font-semibold hover:underline">Terms</Link> and{' '}
                <Link href="/privacy" className="text-price font-semibold hover:underline">Privacy Policy</Link>.
              </span>
            </label>

            <button type="submit" className="btn-sale w-full">
              Create Account
            </button>

            <p className="text-xs text-mute text-center">
              Already have an Aussie Vape Hub account?{' '}
              <Link href="/account/login" className="text-price font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
