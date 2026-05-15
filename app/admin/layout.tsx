import type { Metadata } from 'next'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata: Metadata = {
  title: 'Aussie Vapes Admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-soft-100">
      <AdminSidebar />
      <div className="ml-60 min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
