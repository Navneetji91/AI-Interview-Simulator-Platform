import { useInterviewStore } from '@/store/interviewStore'
import { SetupPanel } from '@/components/interview/SetupPanel'
import { QuestionCard } from '@/components/interview/QuestionCard'
import { MockInterview } from '@/components/interview/MockInterview'
import { ResultSummary } from '@/components/interview/ResultSummary'
import { Button } from '@/components/ui/Button'
import { RefreshCw, Target } from 'lucide-react'

export default function Interview() {
  const store = useInterviewStore()

  if (!store.questions.length) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Interview Preparation</h1>
          <SetupPanel />
        </div>
      </div>
    )
  }

  if (store.mockSession) {
    if (store.mockSession.isComplete) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <ResultSummary session={store.mockSession} />
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <MockInterview />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Interview Questions</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review the generated questions and start your mock interview
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => store.startMockSession()}
            size="lg"
            leftIcon={<Target size={20} />}
          >
            Start Mock Interview
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => store.resetInterview()}
            leftIcon={<RefreshCw size={20} />}
          >
            Regenerate
          </Button>
        </div>

        <div className="space-y-4">
          {store.questions.map((question, idx) => (
            <QuestionCard key={question.id} question={question} index={idx} />
          ))}
        </div>
      </div>
    </div>
  )
}
