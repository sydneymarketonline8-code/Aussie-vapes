import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

export default function BackendPending({
  title,
  description,
  setupSteps,
}: {
  title: string
  description: string
  setupSteps: string[]
}) {
  return (
    <div className="bg-white border border-line rounded-sm p-10 text-center max-w-2xl mx-auto">
      <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-soft-100 border border-line flex items-center justify-center">
        <CloudArrowUpIcon className="h-7 w-7 text-mute" />
      </div>
      <h2 className="font-display text-2xl font-bold text-ink mb-2 uppercase tracking-wide">{title}</h2>
      <p className="text-body text-sm mb-6 max-w-md mx-auto leading-relaxed">{description}</p>

      <div className="bg-soft-100 border border-line rounded-sm p-5 text-left">
        <p className="font-display text-[10px] uppercase tracking-widest text-mute font-bold mb-3">
          To enable this module
        </p>
        <ol className="space-y-2 text-sm text-body">
          {setupSteps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-display font-bold text-price flex-shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
