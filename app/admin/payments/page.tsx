import AdminTopbar from '@/components/admin/AdminTopbar'
import { CreditCardIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const GATEWAYS = [
  { name: 'Stripe', desc: 'Cards, Apple Pay, Google Pay', status: 'Connected', live: true, mode: 'Live' },
  { name: 'PayPal', desc: 'PayPal and Pay in 4', status: 'Connected', live: true, mode: 'Live' },
  { name: 'Afterpay', desc: 'Buy now, pay later', status: 'Not connected', live: false, mode: 'Test' },
  { name: 'Zip', desc: 'Pay over 4 weeks', status: 'Not connected', live: false, mode: 'Test' },
  { name: 'Crypto (Coinbase)', desc: 'BTC, ETH, USDC', status: 'Disabled', live: false, mode: 'Off' },
]

export default function AdminPaymentsPage() {
  return (
    <>
      <AdminTopbar title="Payments" subtitle="Gateways, taxes, and currency settings" />
      <div className="px-8 py-8 space-y-6">
        <div className="bg-white border border-line rounded-sm">
          <div className="px-5 py-4 border-b border-line flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4 text-mute" />
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
              Payment Gateways
            </h3>
          </div>
          <ul className="divide-y divide-line">
            {GATEWAYS.map((g) => (
              <li key={g.name} className="flex items-center justify-between px-5 py-4 gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {g.live ? (
                    <CheckCircleIcon className="h-5 w-5 text-success flex-shrink-0" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-mute flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-display font-bold text-ink">{g.name}</p>
                    <p className="text-xs text-mute">{g.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-sm text-[11px] font-display font-bold uppercase tracking-wider ${
                      g.live ? 'bg-success/15 text-success' : 'bg-soft-200 text-mute'
                    }`}
                  >
                    {g.mode}
                  </span>
                  <button
                    type="button"
                    disabled
                    title="Requires backend"
                    className="px-3 py-1.5 rounded-sm border border-line text-mute font-display text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                  >
                    {g.status === 'Connected' ? 'Manage' : 'Connect'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-line rounded-sm p-5">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-3">
              Currency & Tax
            </h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-mute">Default currency</dt>
                <dd className="font-display font-bold text-ink">AUD ($)</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-mute">GST</dt>
                <dd className="font-display font-bold text-ink">10% inclusive</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-mute">Display prices</dt>
                <dd className="font-display font-bold text-ink">Tax-inclusive</dd>
              </div>
            </dl>
          </div>
          <div className="bg-white border border-line rounded-sm p-5">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-3">
              Payout Schedule
            </h3>
            <p className="text-sm text-body">
              Stripe payouts are issued <strong className="text-ink">weekly on Mondays</strong> to the linked
              business account ending <span className="font-mono">···4477</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
