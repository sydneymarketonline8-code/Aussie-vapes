import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'VapeHub Vapes Australia Blog — Vape News, Reviews & Guides',
  description:
    "Australian vape news, product reviews, beginner guides and industry updates from VapeHub Vapes Australia — the country's #1 online vape store.",
  keywords: [
    'vapehub vapes australia blog',
    'australian vape news',
    'vape reviews australia',
    'vape guides australia',
    'vapehub vapes australia articles',
  ],
  alternates: { canonical: '/blog' },
}

const POSTS = [
  {
    slug: 'beginners-guide',
    href: '/beginners-guide',
    title: "Beginner's Vape Guide For Australia",
    excerpt: 'Everything new vapers need to know — choosing a device, picking a flavour, understanding the TGA prescription model.',
    category: 'Guides',
    date: '2026-05-14',
  },
  {
    slug: 'vaping-laws-australia',
    href: '/vaping-laws-australia',
    title: 'Vaping Laws In Australia 2026',
    excerpt: 'TGA prescription model explained, legal nicotine strengths, age limits, importation rules and where you can vape.',
    category: 'Compliance',
    date: '2026-05-14',
  },
  {
    slug: 'shop-by-brand',
    href: '/brands',
    title: '40+ VapeHub Vapes Australia Brands At A Glance',
    excerpt: 'A quick tour of every disposable and pod brand stocked at VapeHub Vapes Australia — IGET, Alfakher, HQD, Gunnpod, Lost Mary and more.',
    category: 'Brands',
    date: '2026-04-22',
  },
  {
    slug: 'iget-bar-plus-review',
    href: '/brand/iget',
    title: 'IGET Bar Plus 6000 Review — Still The Best Aussie Disposable?',
    excerpt: "The IGET Bar Plus 6000 has been the most popular VapeHub Vapes Australia disposable for two years running. Here's why it dominates the AU mid-range.",
    category: 'Reviews',
    date: '2026-04-10',
  },
  {
    slug: 'alfakher-crown-bar',
    href: '/brand/alfakher',
    title: 'Alfakher Crown Bar — Shisha Brand Goes Disposable',
    excerpt: 'How the Middle East\'s premier shisha brand translated decades of flavour expertise into the 15,000-puff disposable format.',
    category: 'Reviews',
    date: '2026-03-28',
  },
  {
    slug: 'hqd-cuvie-slick',
    href: '/brand/hqd',
    title: 'HQD Cuvie Slick 20,000 — The Sleekest Long-Life Disposable',
    excerpt: 'Why the HQD Cuvie Slick 20,000 has become the go-to long-life disposable for design-conscious Aussie vapers.',
    category: 'Reviews',
    date: '2026-03-15',
  },
]

export default function BlogPage() {
  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'VapeHub Vapes Australia', href: '/' }, { label: 'Blog' }]} />
          <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mt-4 mb-2">
            News · Reviews · Guides
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-1 mb-3 lowercase">
            vapehub vapes australia blog
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">
            Australian vape news, product reviews, beginner guides and industry updates from the VapeHub Vapes Australia team.
          </p>
        </div>
      </section>

      <section className="container-site py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="group bg-white border border-line rounded-sm p-6 hover:border-ink hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-0.5 text-[10px] font-display font-bold uppercase tracking-wider bg-soft-100 text-ink rounded-sm border border-line">{p.category}</span>
                <span className="text-[11px] text-mute font-display">{p.date}</span>
              </div>
              <h2 className="font-display text-lg font-bold text-ink leading-snug mb-2 group-hover:text-price transition-colors">{p.title}</h2>
              <p className="text-body text-sm leading-relaxed flex-1">{p.excerpt}</p>
              <span className="mt-3 pt-3 border-t border-line font-display text-xs uppercase tracking-widest font-bold text-ink group-hover:text-price transition-colors">
                Read on VapeHub Vapes Australia →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-body text-sm mb-3">More VapeHub Vapes Australia content coming soon — bookmark this page.</p>
          <Link href="/contact" className="btn-secondary">Suggest A Topic</Link>
        </div>
      </section>
    </>
  )
}
