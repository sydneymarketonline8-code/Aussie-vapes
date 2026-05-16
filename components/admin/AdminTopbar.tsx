interface AdminTopbarProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function AdminTopbar({ title, subtitle, actions }: AdminTopbarProps) {
  return (
    <div className="sticky top-0 z-20 bg-white border-b border-line">
      <div className="flex items-center justify-between px-8 py-4 gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink leading-tight">{title}</h1>
          {subtitle && <p className="text-sm text-mute mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {actions}
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-success/10 text-success font-display text-xs font-bold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
            Live · Production
          </span>
        </div>
      </div>
    </div>
  )
}
