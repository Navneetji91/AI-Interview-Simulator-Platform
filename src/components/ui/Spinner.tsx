interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export function Spinner({ size = 'md', color = 'currentColor' }: SpinnerProps) {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 40,
  }

  const dimension = sizeMap[size]

  return (
    <svg
      className="animate-spin"
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" opacity="0.3" />
      <path d="M12 2a10 10 0 0 1 0 20" />
    </svg>
  )
}
