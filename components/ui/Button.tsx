import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'sale' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

const variantMap: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  sale: 'btn-sale',
  ghost: 'inline-flex items-center justify-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-brand transition-colors',
}

const sizeMap: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: '',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        variantMap[variant],
        size !== 'md' && sizeMap[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
