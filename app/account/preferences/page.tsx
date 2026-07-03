import { requireAccount } from '@/lib/account-auth'
import { BellAlertIcon } from '@heroicons/react/24/outline'

const NOTIFICATION_PREFS = [
  { id: 'order-updates', label: 'Order updates & shipping', body: 'Order confirmations, dispatch alerts and delivery notifications. Recommended.', defaultOn: true, required: true },
  { id: 'restocks', label: 'Restock alerts', body: 'Notify me when a product I viewed is back in stock.', defaultOn: true },
  { id: 'promotions', label: 'Sales & promotions', body: 'Vapes Australia sales, limited-time discounts and pack-deal alerts.', defaultOn: true },
  { id: 'new-arrivals', label: 'New arrivals', body: 'Brand drops and freshly-landed disposables.', defaultOn: false },
  { id: 'newsletter', label: 'Vapes Australia newsletter', body: 'Monthly wrap of new brands, AU vape news and member tips.', defaultOn: false },
  { id: 'sms', label: 'SMS shipping alerts', body: 'Text-only notifications when your order ships. Standard rates apply.', defaultOn: false },
]

export default async function AccountPreferencesPage() {
  await requireAccount()

  return (
    <div className="space-y-5">
      <header className="bg-white border border-line rounded-sm p-5">
        <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide flex items-center gap-2">
          <BellAlertIcon className="h-5 w-5 text-mute" />
          Email &amp; Notification Preferences
        </h2>
        <p className="text-sm text-mute mt-1">
          Choose which Vapes Australia emails and notifications you want to receive. You can change these any time.
        </p>
      </header>

      <form className="bg-white border border-line rounded-sm divide-y divide-line">
        {NOTIFICATION_PREFS.map((pref) => (
          <label
            key={pref.id}
            htmlFor={pref.id}
            className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer hover:bg-soft-50"
          >
            <div className="min-w-0">
              <p className="font-display text-sm font-bold text-ink uppercase tracking-wider">
                {pref.label}
                {pref.required && (
                  <span className="ml-2 text-[10px] text-mute font-normal normal-case tracking-normal">
                    (required)
                  </span>
                )}
              </p>
              <p className="text-xs text-body mt-1 max-w-md">{pref.body}</p>
            </div>
            <input
              id={pref.id}
              name={pref.id}
              type="checkbox"
              defaultChecked={pref.defaultOn}
              disabled={pref.required}
              className="mt-1 rounded-sm border-line bg-white text-ink focus:ring-ink h-4 w-4 flex-shrink-0"
            />
          </label>
        ))}
        <div className="px-5 py-4 flex flex-wrap justify-between items-center gap-3 bg-soft-50">
          <p className="text-xs text-mute">
            Preference saving requires a backend — coming soon.
          </p>
          <button type="submit" className="btn-primary" disabled>
            Save Preferences
          </button>
        </div>
      </form>

      <section className="bg-soft-100 border border-line rounded-sm p-5">
        <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-2">
          Unsubscribe From Everything
        </h3>
        <p className="text-sm text-body mb-3 max-w-2xl">
          You can opt out of all Vapes Australia marketing communications in one click. You&apos;ll still receive
          essential order-related emails (dispatch, delivery, returns).
        </p>
        <button type="button" className="btn-secondary" disabled>
          Unsubscribe From Marketing
        </button>
      </section>
    </div>
  )
}
