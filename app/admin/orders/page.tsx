import AdminTopbar from '@/components/admin/AdminTopbar'
import BackendPending from '@/components/admin/BackendPending'

export default function AdminOrdersPage() {
  return (
    <>
      <AdminTopbar title="Orders" subtitle="Customer purchases and fulfilment" />
      <div className="px-8 py-16">
        <BackendPending
          title="Orders module pending"
          description="Aussie Vapes doesn't currently persist orders — the cart and checkout flow are wired up on the frontend but submission goes nowhere. Add a backend (Stripe + a database) to start populating this dashboard."
          setupSteps={[
            'Pick a database — Supabase, Postgres on Vercel, or PlanetScale all work.',
            'Add a /api/orders route that writes successful Stripe Checkout sessions.',
            'Add a server-side fetch here that lists the most recent orders.',
            'Wire the existing /checkout form to your Stripe Checkout endpoint.',
          ]}
        />
      </div>
    </>
  )
}
