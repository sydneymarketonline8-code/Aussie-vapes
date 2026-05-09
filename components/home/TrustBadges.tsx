import { TruckIcon, ShieldCheckIcon, ArrowPathIcon, PhoneIcon, StarIcon } from '@heroicons/react/24/outline'

const badges = [
  {
    icon: TruckIcon,
    title: 'Free AU Shipping',
    body: 'On all orders over $100. Express options available at checkout.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Age-Verified Store',
    body: 'All customers are 18+ verified. We comply with all Australian regulations.',
  },
  {
    icon: ArrowPathIcon,
    title: '30-Day Returns',
    body: 'Not happy? Return unopened products within 30 days for a full refund.',
  },
  {
    icon: PhoneIcon,
    title: 'AU-Based Support',
    body: 'Real human support Mon–Fri 9am–5pm AEST. Chat, email or call.',
  },
  {
    icon: StarIcon,
    title: '4.8★ Rated Store',
    body: 'Over 10,000 verified customer reviews. Australia\'s most trusted vape store.',
  },
]

export default function TrustBadges() {
  return (
    <section className="py-10 border-y border-surface-600 bg-surface-800">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {badges.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2 px-2">
              <div className="h-10 w-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                <Icon className="h-5 w-5 text-brand" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
