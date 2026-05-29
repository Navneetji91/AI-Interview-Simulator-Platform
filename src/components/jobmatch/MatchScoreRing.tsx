import { Card } from '@/components/ui/Card'

interface MatchScoreRingProps {
  score: number
}

export function MatchScoreRing({ score }: MatchScoreRingProps) {
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (score / 100) * circumference

  const labelColor =
    score >= 75 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'
  const labelText = score >= 75 ? 'Strong Match' : score >= 50 ? 'Good Match' : 'Low Match'

  return (
    <Card className="p-8 flex flex-col items-center justify-center">
      <div className="relative w-48 h-48 mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            className="stroke-gray-200 dark:stroke-gray-700"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={labelColor}
            style={{
              transition: 'stroke-dashoffset 1s ease-out',
            }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            {Math.round(score)}
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400">/100</span>
        </div>
      </div>

      <div className={`text-center ${labelColor} font-semibold`}>
        {labelText}
      </div>
    </Card>
  )
}
