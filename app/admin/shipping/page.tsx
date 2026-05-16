import AdminTopbar from '@/components/admin/AdminTopbar'
import { TruckIcon } from '@heroicons/react/24/outline'

const ZONES = [
  { name: 'Metro (Sydney, Melbourne, Brisbane)', states: 'NSW, VIC, QLD', flat: 9.95, freeOver: 100, eta: '1–2 business days' },
  { name: 'Regional East Coast', states: 'NSW, VIC, QLD outside metro', flat: 12.95, freeOver: 150, eta: '2–4 business days' },
  { name: 'WA, SA, NT', states: 'WA, SA, NT', flat: 14.95, freeOver: 200, eta: '3–6 business days' },
  { name: 'Tasmania', states: 'TAS', flat: 13.95, freeOver: 200, eta: '4–7 business days' },
]

const CARRIERS = [
  { name: 'Australia Post Express', status: 'Enabled', note: 'Default carrier for all zones' },
  { name: 'Sendle', status: 'Enabled', note: 'Used for metro orders under 3kg' },
  { name: 'Couriers Please', status: 'Disabled', note: 'Standby carrier' },
  { name: 'Aramex', status: 'Disabled', note: 'Standby carrier' },
]

export default function AdminShippingPage() {
  return (
    <>
      <AdminTopbar title="Shipping" subtitle="Zones, rates, and carrier configuration" />
      <div className="px-8 py-8 space-y-6">
        <div className="bg-white border border-line rounded-sm">
          <div className="px-5 py-4 border-b border-line flex items-center gap-2">
            <TruckIcon className="h-4 w-4 text-mute" />
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
              Zones & Rates
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-soft-50 text-mute font-display uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-2.5 text-left">Zone</th>
                  <th className="px-5 py-2.5 text-left">States</th>
                  <th className="px-5 py-2.5 text-right">Flat Rate</th>
                  <th className="px-5 py-2.5 text-right">Free Over</th>
                  <th className="px-5 py-2.5 text-left">ETA</th>
                  <th className="px-5 py-2.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {ZONES.map((z) => (
                  <tr key={z.name} className="hover:bg-soft-50">
                    <td className="px-5 py-3 font-display font-bold text-ink">{z.name}</td>
                    <td className="px-5 py-3 text-xs text-body">{z.states}</td>
                    <td className="px-5 py-3 text-right font-display font-bold text-ink">${z.flat.toFixed(2)}</td>
                    <td className="px-5 py-3 text-right text-body">${z.freeOver}</td>
                    <td className="px-5 py-3 text-xs text-body">{z.eta}</td>
                    <td className="px-5 py-3 text-right">
                      <button
                        type="button"
                        disabled
                        title="Requires backend"
                        className="font-display text-xs uppercase tracking-widest font-bold text-mute cursor-not-allowed"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-line rounded-sm">
          <div className="px-5 py-4 border-b border-line">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">Carriers</h3>
          </div>
          <ul className="divide-y divide-line">
            {CARRIERS.map((c) => (
              <li key={c.name} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="font-display font-bold text-ink">{c.name}</p>
                  <p className="text-xs text-mute">{c.note}</p>
                </div>
                <span
                  className={`inline-block px-2 py-0.5 rounded-sm text-[11px] font-display font-bold uppercase tracking-wider ${
                    c.status === 'Enabled' ? 'bg-success/15 text-success' : 'bg-soft-200 text-mute'
                  }`}
                >
                  {c.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
