import { TruckIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline'

const announcements = [
  { icon: TruckIcon, text: 'Free shipping on orders over $100 Australia-wide' },
  { icon: ShieldCheckIcon, text: 'Secure checkout — buy with confidence' },
  { icon: SparklesIcon, text: 'New arrivals weekly — shop the latest drops' },
]

export default function AnnouncementBar() {
  return (
    <div className="bg-brand text-surface-900 text-xs font-semibold overflow-hidden">
      <div className="flex divide-x divide-surface-900/20">
        {announcements.map(({ icon: Icon, text }, i) => (
          <div
            key={i}
            className="flex items-center justify-center gap-1.5 px-4 py-2 flex-1 text-center"
          >
            <Icon className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">{text}</span>
            <span className="sm:hidden">{text.split('—')[0].trim()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
