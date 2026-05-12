import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-center justify-center py-32 text-center">
      <div className="font-display text-8xl font-bold text-price mb-4 leading-none">404</div>
      <h1 className="font-display text-3xl font-bold text-ink mb-2 uppercase tracking-wide">Page Not Found</h1>
      <p className="text-body mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn-primary">Go Home</Link>
        <Link href="/category/disposable-vapes" className="btn-secondary">Shop Disposables</Link>
      </div>
    </div>
  )
}
