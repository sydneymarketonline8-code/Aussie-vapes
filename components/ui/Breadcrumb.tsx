import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-mute flex-wrap">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRightIcon className="h-3 w-3 flex-shrink-0" />}
          {crumb.href && i < crumbs.length - 1 ? (
            <Link href={crumb.href} className="hover:text-price transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-ink font-semibold">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
