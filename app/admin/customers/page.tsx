import AdminTopbar from '@/components/admin/AdminTopbar'
import BackendPending from '@/components/admin/BackendPending'

export default function AdminCustomersPage() {
  return (
    <>
      <AdminTopbar title="Customers" subtitle="Aussie Vapes customer database" />
      <div className="px-8 py-16">
        <BackendPending
          title="Customers module pending"
          description="Aussie Vapes doesn't currently store customer records — checkout is guest-only and there are no user accounts yet. Hook up authentication + a database to enable this module."
          setupSteps={[
            'Add NextAuth.js (or Clerk / Auth.js) with an email-magic-link provider.',
            'Add a `users` table in your database (linked to orders).',
            'Build the /account, /account/orders pages that read from the database.',
            'Add a server-side fetch here that lists customer records with order counts.',
          ]}
        />
      </div>
    </>
  )
}
