import AdminTopbar from '@/components/admin/AdminTopbar'
import { BanknotesIcon, CurrencyDollarIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { getPayIdConfig, getBitcoinConfig } from '@/lib/payment'

export default function AdminPaymentsPage() {
  const payid = getPayIdConfig()
  const btc = getBitcoinConfig()

  const methods = [
    {
      name: 'PayID',
      icon: BanknotesIcon,
      desc: 'Australian bank transfer (email or phone identifier)',
      detail: payid.address ? `${payid.address} · ${payid.name}` : null,
      envVars: ['PAYID_ADDRESS', 'PAYID_NAME'],
    },
    {
      name: 'Bitcoin (BTC)',
      icon: CurrencyDollarIcon,
      desc: 'On-chain transfer to a configured wallet',
      detail: btc.address || null,
      envVars: ['BTC_WALLET_ADDRESS'],
    },
  ]

  return (
    <>
      <AdminTopbar title="Payments" subtitle="Manual payment methods and reconciliation" />
      <div className="px-8 py-8 space-y-6">
        <div className="bg-white border border-line rounded-sm">
          <div className="px-5 py-4 border-b border-line">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
              Active Payment Methods
            </h3>
            <p className="text-xs text-mute mt-1">
              All payments are manually verified by the sales team. Each order is assigned a unique reference code so incoming transfers can be matched back to it.
            </p>
          </div>
          <ul className="divide-y divide-line">
            {methods.map((m) => {
              const configured = !!m.detail
              return (
                <li key={m.name} className="flex items-start justify-between px-5 py-4 gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <m.icon className="h-5 w-5 text-ink flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="font-display font-bold text-ink">{m.name}</p>
                      <p className="text-xs text-mute">{m.desc}</p>
                      {configured ? (
                        <p className="text-xs font-mono text-body mt-1 break-all">{m.detail}</p>
                      ) : (
                        <p className="text-xs text-sale mt-1">
                          Not configured — set {m.envVars.map((v) => <code key={v} className="font-mono">{v}</code>).reduce<React.ReactNode[]>((acc, el, i) => i === 0 ? [el] : [...acc, ', ', el], [])} in the environment.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {configured ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] font-display font-bold uppercase tracking-wider bg-success/15 text-success">
                        <CheckCircleIcon className="h-3 w-3" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] font-display font-bold uppercase tracking-wider bg-soft-200 text-mute">
                        <ExclamationTriangleIcon className="h-3 w-3" /> Pending setup
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-line rounded-sm p-5">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-3">
              Currency &amp; Tax
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
              Reconciliation
            </h3>
            <p className="text-sm text-body">
              Orders are created with status <strong className="text-ink">Awaiting payment</strong>. Match incoming PayID transfers and BTC deposits using the order&apos;s <strong className="text-ink">payment reference</strong> (e.g. <code className="font-mono text-price">PAY-7F2K9Q</code>), then mark the order Paid from its detail page.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
