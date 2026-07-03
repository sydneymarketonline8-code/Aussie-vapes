import type { Metadata } from 'next'
import Link from 'next/link'
import AccountSidebar from '@/components/account/AccountSidebar'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { getAccountSession } from '@/lib/account-auth'

export const metadata: Metadata = {
  title: 'My Vapes Australia Account',
  robots: { index: false, follow: false },
}

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await getAccountSession()

  // Logged-out: render the child page as-is (login / register handle their own UI).
  if (!session) return <>{children}</>

  return (
    <div className="bg-soft-100 min-h-[60vh]">
      <div className="container-site py-8">
        <Breadcrumb crumbs={[{ label: 'Vapes Australia', href: '/' }, { label: 'My Account' }]} />

        <div className="mt-6 flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-1">
              My Vapes Australia
            </p>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-ink leading-tight">
              Welcome back, {session.firstName}
            </h1>
          </div>
          <Link href="/category/disposable-vapes" className="btn-primary">
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6 items-start">
          <AccountSidebar
            firstName={session.firstName}
            lastName={session.lastName}
            email={session.email}
          />
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
