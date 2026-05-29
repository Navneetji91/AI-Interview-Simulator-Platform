import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { InterviewQuestion } from '@/types/interview'

interface QuestionCardProps {
  question: InterviewQuestion
  index: number
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  const [expanded, setExpanded] = useState(false)

  const categoryColor = {
    Technical: 'info',
    Behavioral: 'warning',
    HR: 'success',
  } as const

  return (
    <Card hover>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3 text-left flex-1">
          <Badge label={`Q${index + 1}`} variant="info" />
          <Badge label={question.category} variant={categoryColor[question.category]} />
          <span className="font-medium text-gray-900 dark:text-white">
            {question.question.substring(0, 100)}...
          </span>
        </div>
        <ChevronDown
          size={20}
          className={`transition-transform flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border space-y-4 animate-slide-up">
          <div>
            <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">
              Why This Is Asked
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{question.whyAsked}</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">
              Answer Framework
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{question.answerFramework}</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">
              Sample Answer
            </h4>
            <div className="p-3 bg-gray-50 dark:bg-dark-bg rounded text-sm text-gray-700 dark:text-gray-300 italic">
              "{question.sampleAnswer}"
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
