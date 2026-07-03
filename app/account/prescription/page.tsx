import Link from 'next/link'
import { requireAccount } from '@/lib/account-auth'
import {
  DocumentTextIcon,
  CloudArrowUpIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline'

export default async function AccountPrescriptionPage() {
  await requireAccount()

  return (
    <div className="space-y-5">
      <header className="bg-white border border-line rounded-sm p-5">
        <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide flex items-center gap-2">
          <DocumentTextIcon className="h-5 w-5 text-mute" />
          AU Prescription on File
        </h2>
        <p className="text-sm text-mute mt-1">
          Upload your Australian nicotine prescription once and Vapes Australia will keep it on file for every future
          nicotine purchase. Required under the TGA prescription model.
        </p>
      </header>

      <div className="bg-warning/10 border border-warning/30 rounded-sm p-4 flex items-start gap-3">
        <ShieldExclamationIcon className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-display font-bold uppercase tracking-wider text-warning text-xs mb-1">
            No prescription uploaded
          </p>
          <p className="text-body">
            You can still browse Vapes Australia, but nicotine purchases require a valid AU prescription at checkout.{' '}
            <Link href="/vaping-laws-australia" className="text-price font-semibold hover:underline">
              Learn more about AU vaping laws →
            </Link>
          </p>
        </div>
      </div>

      <section className="bg-white border border-line rounded-sm p-5">
        <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-4 pb-2 border-b border-line">
          Upload Prescription
        </h3>
        <form className="space-y-4">
          <div>
            <label htmlFor="rx-file" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Prescription Document (PDF, JPG, PNG · max 10MB)
            </label>
            <div className="bg-soft-100 border-2 border-dashed border-line rounded-sm p-8 text-center">
              <CloudArrowUpIcon className="h-10 w-10 mx-auto text-mute mb-2" />
              <p className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-1">
                Drag & drop or click to upload
              </p>
              <p className="text-xs text-mute">PDF, JPG or PNG up to 10MB</p>
              <input
                id="rx-file"
                name="prescription"
                type="file"
                accept="application/pdf,image/jpeg,image/png"
                className="mt-3 mx-auto block text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="rx-doctor" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
                Prescribing Doctor
              </label>
              <input id="rx-doctor" name="doctor" type="text" placeholder="Dr. Surname" className="input-base" />
            </div>
            <div>
              <label htmlFor="rx-issued" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
                Date Issued
              </label>
              <input id="rx-issued" name="issued" type="date" className="input-base" />
            </div>
            <div>
              <label htmlFor="rx-expiry" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
                Expiry Date
              </label>
              <input id="rx-expiry" name="expiry" type="date" className="input-base" />
            </div>
            <div>
              <label htmlFor="rx-strength" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
                Approved Strength
              </label>
              <select id="rx-strength" name="strength" className="input-base">
                <option value="">Select strength</option>
                <option value="20mg">Up to 20mg/mL (2%)</option>
                <option value="35mg">Up to 35mg/mL (3.5%)</option>
                <option value="50mg">Up to 50mg/mL (5%)</option>
                <option value="100mg">Up to 100mg/mL (10%)</option>
              </select>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-sm border border-line bg-soft-100">
            <input
              type="checkbox"
              required
              className="mt-0.5 rounded-sm border-line bg-white text-ink focus:ring-ink"
            />
            <span className="text-sm text-body">
              I confirm this is a valid Australian prescription issued to me, and I understand Vapes Australia is required to
              record prescription details under the TGA Therapeutic Goods (TGO 110) Order 2021.
            </span>
          </label>

          <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-line">
            <p className="text-xs text-mute">
              Prescription document uploads require a backend integration — coming soon.
            </p>
            <button type="submit" className="btn-sale" disabled>
              Upload Prescription
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
