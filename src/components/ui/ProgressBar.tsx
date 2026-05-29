interface ProgressBarProps {
  value: number
  showLabel?: boolean
  animated?: boolean
}

export function ProgressBar({ value, showLabel = true, animated = true }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))
  
  let colorClass = 'bg-red-500'
  if (clampedValue >= 75) {
    colorClass = 'bg-green-500'
  } else if (clampedValue >= 50) {
    colorClass = 'bg-yellow-500'
  }

  return (
    <div className="w-full">
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass} ${animated ? 'transition-all duration-500' : ''}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(clampedValue)}%
          </span>
        </div>
      )}
    </div>
  )
}
