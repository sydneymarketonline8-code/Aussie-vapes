import { requireAccount } from '@/lib/account-auth'
import { MapPinIcon, PlusIcon } from '@heroicons/react/24/outline'

export default async function AccountAddressesPage() {
  await requireAccount()

  return (
    <div className="space-y-5">
      <header className="bg-white border border-line rounded-sm p-5 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide">
            Saved Addresses
          </h2>
          <p className="text-sm text-mute mt-1">
            Vapes Australia will auto-fill these at checkout to save you time.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary inline-flex items-center gap-1.5"
          disabled
          title="Saving addresses requires a backend — coming soon"
        >
          <PlusIcon className="h-4 w-4" />
          Add Address
        </button>
      </header>

      <div className="bg-white border border-line rounded-sm px-5 py-16 text-center">
        <MapPinIcon className="h-14 w-14 mx-auto text-line mb-4" />
        <p className="font-display text-lg font-bold text-ink uppercase tracking-wider mb-2">
          No saved addresses
        </p>
        <p className="text-sm text-mute mb-6 max-w-md mx-auto">
          Save your shipping address once and Vapes Australia will auto-fill it on every future checkout.
        </p>
      </div>

      <section className="bg-white border border-line rounded-sm p-5">
        <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3">
          Add A New Address
        </h3>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="addr-label" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Label
            </label>
            <input id="addr-label" name="label" type="text" placeholder="Home, Work, etc." className="input-base" />
          </div>
          <div>
            <label htmlFor="addr-name" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Recipient Name
            </label>
            <input id="addr-name" name="name" type="text" className="input-base" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="addr-street" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Street Address
            </label>
            <input id="addr-street" name="street" type="text" placeholder="123 Main Street" className="input-base" />
          </div>
          <div>
            <label htmlFor="addr-suburb" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Suburb
            </label>
            <input id="addr-suburb" name="suburb" type="text" className="input-base" />
          </div>
          <div>
            <label htmlFor="addr-postcode" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Postcode
            </label>
            <input id="addr-postcode" name="postcode" type="text" maxLength={4} className="input-base" />
          </div>
          <div>
            <label htmlFor="addr-state" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              State
            </label>
            <select id="addr-state" name="state" className="input-base">
              <option value="">Select state…</option>
              {['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="addr-phone" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Phone
            </label>
            <input id="addr-phone" name="phone" type="tel" placeholder="+61 4xx xxx xxx" className="input-base" />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button type="submit" className="btn-primary" disabled title="Saving requires a backend">
              Save Address
            </button>
          </div>
        </form>
        <p className="text-xs text-mute mt-3">
          Address saving is on the roadmap. Until then, addresses entered at checkout are remembered only for that session.
        </p>
      </section>
    </div>
  )
}
