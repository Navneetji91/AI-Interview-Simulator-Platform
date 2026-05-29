import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useInterviewStore } from '@/store/interviewStore'
import type { MockSession } from '@/types/interview'

interface ResultSummaryProps {
  session: MockSession
}

export function ResultSummary({ session }: ResultSummaryProps) {
  const store = useInterviewStore()

  const avgScore =
    session.answers.length > 0
      ? Math.round(
          session.answers.reduce((sum, a) => sum + a.evaluation.score, 0) /
            session.answers.length
        )
      : 0

  const elapsed = Math.round(
    (new Date().getTime() - new Date(session.startTime).getTime()) / 1000
  )
  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60

  const scoreColor =
    avgScore >= 7 ? 'text-green-600' : avgScore >= 5 ? 'text-yellow-600' : 'text-red-600'

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Session Complete!</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Great effort! Here's your performance summary.
        </p>
      </div>

      <Card className="p-8 text-center space-y-4">
        <div className={`text-6xl font-bold ${scoreColor}`}>{avgScore}</div>
        <p className="text-lg font-medium">Average Score / 10</p>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <div>Time Taken: {mins}:{secs.toString().padStart(2, '0')}</div>
          <div>Questions Answered: {session.answers.length}</div>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <h3 className="font-semibold text-lg mb-4">Question Scores</h3>
        <div className="space-y-2">
          {session.answers.map((answer, idx) => {
            const question = session.questions.find((q) => q.id === answer.questionId)
            return (
              <div
                key={idx}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-dark-bg rounded"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    Q{idx + 1}: {question?.question.substring(0, 60)}...
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`text-sm font-bold ${
                      answer.evaluation.score >= 7
                        ? 'text-green-600'
                        : answer.evaluation.score >= 5
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {answer.evaluation.score}/10
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {session.answers.filter((a) => a.evaluation.score >= 7).length > 0 && (
        <Card className="p-6 space-y-4 border-green-200 dark:border-green-900">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            Your Strengths
          </h3>
          <div className="space-y-2">
            {session.answers
              .filter((a) => a.evaluation.score >= 7)
              .map((answer, idx) => {
                const question = session.questions.find((q) => q.id === answer.questionId)
                return (
                  <div key={idx}>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      Q{session.answers.indexOf(answer) + 1}: {question?.question.substring(0, 50)}
                    </p>
                  </div>
                )
              })}
          </div>
        </Card>
      )}

      {session.answers.filter((a) => a.evaluation.score < 5).length > 0 && (
        <Card className="p-6 space-y-4 border-amber-200 dark:border-amber-900">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            Focus Areas for Improvement
          </h3>
          <div className="space-y-2">
            {session.answers
              .filter((a) => a.evaluation.score < 5)
              .map((answer, idx) => {
                const question = session.questions.find((q) => q.id === answer.questionId)
                return (
                  <div key={idx}>
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                      Q{session.answers.indexOf(answer) + 1}: {question?.question.substring(0, 50)}
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                      {answer.evaluation.whatToImprove[0]}
                    </p>
                  </div>
                )
              })}
          </div>
        </Card>
      )}

      <div className="flex gap-3">
        <Button
          fullWidth
          onClick={() => store.resetInterview()}
          variant="outline"
        >
          New Session
        </Button>
        <Button
          fullWidth
          onClick={() => window.location.reload()}
        >
          Review Questions
        </Button>
      </div>
    </div>
  )
}
