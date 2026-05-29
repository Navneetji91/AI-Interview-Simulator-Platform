import { useState, useEffect } from 'react'
import { ChevronRight, Clock } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { Skeleton, SkeletonLines } from '@/components/ui/Skeleton'
import { useInterviewStore } from '@/store/interviewStore'
import { evaluateAnswer } from '@/lib/gemini'
import type { AnswerEvaluation } from '@/types/interview'
import toast from 'react-hot-toast'

export function MockInterview() {
  const store = useInterviewStore()
  const [answer, setAnswer] = useState('')
  const [showEvaluation, setShowEvaluation] = useState(false)
  const [evaluation, setEvaluation] = useState<AnswerEvaluation | null>(null)
  const [timeElapsed, setTimeElapsed] = useState(0)

  const session = store.mockSession!
  const currentQuestion = session.questions[session.currentIndex]
  const progress = ((session.currentIndex + 1) / session.questions.length) * 100

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSubmit = async () => {
    if (answer.trim().length < 50) {
      toast.error('Answer must be at least 50 characters')
      return
    }
    store.setEvaluating(true)
    try {
      const eval_result = await evaluateAnswer(currentQuestion.question, answer)
      setEvaluation(eval_result)
      store.submitAnswer(answer, eval_result)
      setShowEvaluation(true)
      setAnswer('')
    } catch (err) {
      toast.error('Failed to evaluate answer')
    } finally {
      store.setEvaluating(false)
    }
  }

  const handleNext = () => {
    setShowEvaluation(false)
    setEvaluation(null)
    store.nextQuestion()
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Question {session.currentIndex + 1} of {session.questions.length}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            <Clock size={16} className="mr-1 inline" />
            {formatTime(timeElapsed)}
          </span>
        </div>
        <ProgressBar value={progress} showLabel={true} />
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Badge label={currentQuestion.category} variant="info" />
        </div>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          {currentQuestion.question}
        </p>
      </Card>

      {!showEvaluation ? (
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Answer</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here... (minimum 50 characters)"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {answer.length} characters
            </div>
          </div>

          <Button
            fullWidth
            size="lg"
            onClick={handleSubmit}
            loading={store.isEvaluating}
            disabled={answer.trim().length < 50}
            rightIcon={<ChevronRight size={20} />}
          >
            Submit Answer
          </Button>

          {store.isEvaluating && (
            <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-dark-border dark:bg-dark-bg">
              <div className="flex items-center justify-center">
                <Skeleton className="h-20 w-20 rounded-full" />
              </div>
              <SkeletonLines lines={4} />
            </div>
          )}
        </Card>
      ) : evaluation ? (
        <Card className="p-6 space-y-6 animate-slide-up">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
              <span className="text-4xl font-bold text-white">{evaluation.score}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">/ 10</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              What Was Good
            </h3>
            <ul className="space-y-1">
              {evaluation.whatWasGood.map((item: string, idx: number) => (
                <li key={idx} className="text-sm text-green-700 dark:text-green-300">
                  - {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              What To Improve
            </h3>
            <ul className="space-y-1">
              {evaluation.whatToImprove.map((item: string, idx: number) => (
                <li key={idx} className="text-sm text-amber-700 dark:text-amber-300">
                  - {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Ideal Answer Comparison</h3>
            <div className="p-3 bg-gray-50 dark:bg-dark-bg rounded text-sm text-gray-700 dark:text-gray-300">
              {evaluation.idealAnswerComparison}
            </div>
          </div>

          <Button
            fullWidth
            size="lg"
            onClick={handleNext}
            rightIcon={<ChevronRight size={20} />}
          >
            {session.currentIndex + 1 === session.questions.length
              ? 'See Results'
              : 'Next Question'}
          </Button>
        </Card>
      ) : null}
    </div>
  )
}
