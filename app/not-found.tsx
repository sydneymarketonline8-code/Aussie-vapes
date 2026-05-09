import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-center justify-center py-32 text-center">
      <div className="text-7xl font-black text-gradient mb-4">404</div>
      <h1 className="text-2xl font-bold text-zinc-100 mb-2">Page Not Found</h1>
      <p className="text-zinc-500 mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn-primary">Go Home</Link>
        <Link href="/category/disposable-vapes" className="btn-secondary">Shop Disposables</Link>
      </div>
    </div>
  )
}
