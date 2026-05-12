import { StarIcon } from '@heroicons/react/24/solid'

const REVIEWS = [
  {
    name: 'James M.',
    location: 'Sydney, NSW',
    rating: 5,
    title: 'Best vape store in Aus',
    body: 'Fast shipping, great prices, and the range is unmatched. Got my Alfakher Crown Bar next-day in Sydney. Will be back.',
  },
  {
    name: 'Sarah K.',
    location: 'Melbourne, VIC',
    rating: 5,
    title: 'Excellent customer service',
    body: 'Had a question about flavour selection and the support team responded within an hour. Product arrived discreetly packaged and on time.',
  },
  {
    name: 'David L.',
    location: 'Brisbane, QLD',
    rating: 5,
    title: 'Reliable and authentic',
    body: 'I\'ve ordered three times now — always genuine products and the packaging is solid. Recommended to all my mates.',
  },
  {
    name: 'Emma R.',
    location: 'Perth, WA',
    rating: 4,
    title: 'Great selection of disposables',
    body: 'Heaps of brands and flavours. Loved the IGET Bar Plus 6000. Only docked one star because shipping to WA took 5 days.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-14 bg-white">
      <div className="container-site">
        <div className="section-heading-wrap">
          <h2 className="section-heading">product reviews</h2>
          <span className="font-display text-xs uppercase tracking-widest font-bold text-success">
            ★★★★★ 4.8 / 5 — 10,000+ reviews
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((r) => (
            <article key={r.name} className="bg-soft-100 border border-line rounded-sm p-6 flex flex-col">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon
                    key={i}
                    className={i < r.rating ? 'h-4 w-4 text-warning' : 'h-4 w-4 text-soft-300'}
                  />
                ))}
              </div>
              <h3 className="font-display font-bold text-base text-ink mb-2">{r.title}</h3>
              <p className="text-sm text-body leading-relaxed mb-4 flex-1">&ldquo;{r.body}&rdquo;</p>
              <div className="pt-3 border-t border-line">
                <p className="font-display font-bold text-sm text-ink">{r.name}</p>
                <p className="text-xs text-mute">{r.location}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
