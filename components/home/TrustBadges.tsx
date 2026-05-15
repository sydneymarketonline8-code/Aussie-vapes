import { TruckIcon, ShieldCheckIcon, ArrowPathIcon, PhoneIcon, StarIcon } from '@heroicons/react/24/outline'

const badges = [
  {
    icon: TruckIcon,
    title: 'Free AU Shipping',
    body: 'On all orders over $300. Express options at checkout.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Age-Verified Store',
    body: 'All customers are 18+ verified. Fully TGA compliant.',
  },
  {
    icon: ArrowPathIcon,
    title: '30-Day Returns',
    body: 'Return unopened products within 30 days for a full refund.',
  },
  {
    icon: PhoneIcon,
    title: 'AU-Based Support',
    body: 'Real human support Mon–Fri 9am–5pm AEST.',
  },
  {
    icon: StarIcon,
    title: '4.8/5 Rated Store',
    body: '10,000+ verified customer reviews.',
  },
]

export default function TrustBadges() {
  return (
    <section className="py-8 border-y border-line bg-white">
      <div className="container-site">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {badges.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="h-12 w-12 flex-shrink-0 rounded-full bg-soft-100 border border-line flex items-center justify-center">
                <Icon className="h-6 w-6 text-ink" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink leading-tight">{title}</h3>
                <p className="text-[11px] text-mute leading-relaxed mt-0.5">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
