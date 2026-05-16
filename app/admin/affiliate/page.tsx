import AdminTopbar from '@/components/admin/AdminTopbar'
import { ShareIcon, UserGroupIcon, CurrencyDollarIcon, LinkIcon } from '@heroicons/react/24/outline'
import AdminKpiCard from '@/components/admin/AdminKpiCard'

const AFFILIATES = [
  { name: 'VapeReviewer.com.au', code: 'VAPER', clicks: 8421, conversions: 412, revenue: 18774.5, commission: 1877.45 },
  { name: 'Aussie Vape YouTube', code: 'AVTUBE', clicks: 6109, conversions: 287, revenue: 13442.9, commission: 1344.29 },
  { name: 'Reddit r/ausvape', code: 'AUSVAPE', clicks: 4204, conversions: 198, revenue: 9019.8, commission: 901.98 },
  { name: 'IGetVapes Blog', code: 'IGETBLOG', clicks: 3781, conversions: 144, revenue: 6720.0, commission: 672.0 },
  { name: 'Lost Mary Fan Page', code: 'MARYFAN', clicks: 2980, conversions: 121, revenue: 5614.5, commission: 561.45 },
]

export default function AdminAffiliatePage() {
  const totalClicks = AFFILIATES.reduce((s, a) => s + a.clicks, 0)
  const totalConv = AFFILIATES.reduce((s, a) => s + a.conversions, 0)
  const totalRev = AFFILIATES.reduce((s, a) => s + a.revenue, 0)
  const totalCom = AFFILIATES.reduce((s, a) => s + a.commission, 0)

  return (
    <>
      <AdminTopbar title="Affiliate" subtitle="Affiliate partners and referral revenue" />
      <div className="px-8 py-8 space-y-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminKpiCard
            label="Active Partners"
            value={AFFILIATES.length.toString()}
            previousValue="4"
            percentChange={25}
            Icon={UserGroupIcon}
            accent="#2fb5d2"
          />
          <AdminKpiCard
            label="Clicks (30d)"
            value={totalClicks.toLocaleString()}
            previousValue="22,104"
            percentChange={15}
            Icon={LinkIcon}
            accent="#ff9a52"
          />
          <AdminKpiCard
            label="Conversions"
            value={totalConv.toLocaleString()}
            previousValue="998"
            percentChange={17}
            Icon={ShareIcon}
            accent="#4cbb6c"
          />
          <AdminKpiCard
            label="Commission Paid"
            value={`$${totalCom.toLocaleString('en-AU', { maximumFractionDigits: 0 })}`}
            previousValue="$4,820"
            percentChange={11}
            Icon={CurrencyDollarIcon}
            accent="#3b3b3b"
          />
        </section>

        <div className="bg-white border border-line rounded-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-line">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
              Partners
            </h3>
            <button
              type="button"
              disabled
              title="Requires backend"
              className="px-3 py-2 rounded-sm bg-price/70 text-white font-display text-xs font-bold uppercase tracking-wider cursor-not-allowed"
            >
              + Invite Partner
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-soft-50 text-mute font-display uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-2.5 text-left">Partner</th>
                  <th className="px-5 py-2.5 text-left">Code</th>
                  <th className="px-5 py-2.5 text-right">Clicks</th>
                  <th className="px-5 py-2.5 text-right">Conv.</th>
                  <th className="px-5 py-2.5 text-right">Revenue</th>
                  <th className="px-5 py-2.5 text-right">Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {AFFILIATES.map((a) => (
                  <tr key={a.code} className="hover:bg-soft-50">
                    <td className="px-5 py-3 font-display font-bold text-ink">{a.name}</td>
                    <td className="px-5 py-3">
                      <span className="font-mono font-bold text-ink bg-soft-100 px-2 py-0.5 rounded-sm">
                        {a.code}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-body">{a.clicks.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right text-body">{a.conversions.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right font-display font-bold text-ink">
                      ${a.revenue.toLocaleString('en-AU', { maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-5 py-3 text-right font-display font-bold text-success">
                      ${a.commission.toLocaleString('en-AU', { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
                <tr className="bg-soft-100">
                  <td className="px-5 py-3 font-display font-bold text-ink" colSpan={4}>Total</td>
                  <td className="px-5 py-3 text-right font-display font-bold text-ink">
                    ${totalRev.toLocaleString('en-AU', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3 text-right font-display font-bold text-success">
                    ${totalCom.toLocaleString('en-AU', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
