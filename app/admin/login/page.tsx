import type { Metadata } from 'next'
import { login } from '@/lib/admin-auth'
import { LockClosedIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Aussie Vapes Admin — Sign In',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const sp = await searchParams
  const error = sp.error === '1'
  const next = sp.next ?? '/admin'

  return (
    <div className="fixed inset-0 z-50 bg-soft-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <a href="/" className="inline-block">
            <span className="font-display text-3xl font-bold tracking-tight text-ink leading-none">
              AUSSIE <span className="text-price">VAPES</span>
            </span>
          </a>
          <p className="font-display text-[10px] tracking-[0.3em] text-mute font-semibold mt-2 uppercase">
            Admin Console
          </p>
        </div>

        <form action={login} className="bg-white border border-line rounded-sm p-7 shadow-sm">
          <div className="mb-5">
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-ink/5 flex items-center justify-center">
              <LockClosedIcon className="h-6 w-6 text-ink" />
            </div>
            <h1 className="font-display text-2xl font-bold text-ink text-center uppercase tracking-wide">
              Sign in
            </h1>
            <p className="text-sm text-mute text-center mt-1">
              Restricted area. Authorised Aussie Vapes staff only.
            </p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-sm bg-price/10 border border-price/30 text-price text-sm">
              Incorrect password — try again.
            </div>
          )}

          <input type="hidden" name="next" value={next} />

          <label htmlFor="admin-password" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
            Admin password
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            required
            autoFocus
            placeholder="Enter password"
            className="input-base"
          />

          <button type="submit" className="btn-primary w-full mt-5">
            Sign In to Admin
          </button>

          <p className="text-xs text-mute text-center mt-4">
            Forgot the password? Contact the Aussie Vapes site owner.
          </p>
        </form>

        <p className="text-xs text-mute text-center mt-6">
          <a href="/" className="hover:text-price">← Back to Aussie Vapes</a>
        </p>
      </div>
    </div>
  )
}
