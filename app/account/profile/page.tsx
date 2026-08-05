import { requireAccount } from '@/lib/account-auth'
import { UserIcon } from '@heroicons/react/24/outline'

export default async function AccountProfilePage() {
  const session = await requireAccount()

  return (
    <div className="space-y-5">
      <header className="bg-white border border-line rounded-sm p-5 flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-ink text-white flex items-center justify-center font-display font-bold text-lg">
          {session.firstName.charAt(0)}
          {session.lastName.charAt(0)}
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide">
            Personal Details
          </h2>
          <p className="text-sm text-mute mt-0.5">
            Keep your VapeHub Vapes Australia profile up to date for faster checkout and accurate shipping.
          </p>
        </div>
      </header>

      <section className="bg-white border border-line rounded-sm p-5">
        <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-4 pb-2 border-b border-line">
          About You
        </h3>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="profile-firstname" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              First Name
            </label>
            <input
              id="profile-firstname"
              name="firstName"
              type="text"
              defaultValue={session.firstName}
              className="input-base"
            />
          </div>
          <div>
            <label htmlFor="profile-lastname" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Last Name
            </label>
            <input
              id="profile-lastname"
              name="lastName"
              type="text"
              defaultValue={session.lastName}
              className="input-base"
            />
          </div>
          <div>
            <label htmlFor="profile-email" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Email Address
            </label>
            <input
              id="profile-email"
              name="email"
              type="email"
              defaultValue={session.email}
              className="input-base"
            />
          </div>
          <div>
            <label htmlFor="profile-phone" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Phone
            </label>
            <input
              id="profile-phone"
              name="phone"
              type="tel"
              placeholder="+61 4xx xxx xxx"
              className="input-base"
            />
          </div>
          <div>
            <label htmlFor="profile-dob" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Date of Birth
            </label>
            <input
              id="profile-dob"
              name="dob"
              type="date"
              className="input-base"
            />
            <p className="text-xs text-mute mt-1">Required for AU 18+ verification.</p>
          </div>
          <div>
            <label htmlFor="profile-gender" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Gender (optional)
            </label>
            <select id="profile-gender" name="gender" className="input-base">
              <option value="">Prefer not to say</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="nonbinary">Non-binary</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="sm:col-span-2 flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-line mt-2">
            <p className="text-xs text-mute">
              Profile saving requires a backend integration — coming soon.
            </p>
            <button type="submit" className="btn-primary" disabled>
              Save Changes
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white border border-line rounded-sm p-5">
        <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-4 pb-2 border-b border-line">
          Password
        </h3>
        <form className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label htmlFor="cur-pass" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Current Password
            </label>
            <input id="cur-pass" name="currentPassword" type="password" className="input-base" />
          </div>
          <div>
            <label htmlFor="new-pass" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              New Password
            </label>
            <input id="new-pass" name="newPassword" type="password" minLength={6} className="input-base" />
          </div>
          <div>
            <label htmlFor="conf-pass" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Confirm Password
            </label>
            <input id="conf-pass" name="confirmPassword" type="password" minLength={6} className="input-base" />
          </div>
          <div className="sm:col-span-3 flex justify-end pt-2">
            <button type="submit" className="btn-secondary" disabled>
              Update Password
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
