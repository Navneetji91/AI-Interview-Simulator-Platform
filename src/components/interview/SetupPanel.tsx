import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SkeletonLines } from '@/components/ui/Skeleton'
import { useInterviewStore } from '@/store/interviewStore'
import { generateInterviewQuestions } from '@/lib/gemini'
import toast from 'react-hot-toast'

export function SetupPanel() {
  const store = useInterviewStore()

  const handleGenerate = async () => {
    if (!store.config.jobRole.trim()) {
      toast.error('Please enter a job role')
      return
    }
    store.setGenerating(true)
    try {
      const questions = await generateInterviewQuestions(
        store.config.jobRole,
        store.config.experienceLevel,
        store.config.interviewType,
        store.config.questionCount,
        store.config.useResume ? store.config.resumeText : undefined
      )
      store.setQuestions(questions)
      toast.success('Questions generated!')
    } catch (err) {
      toast.error('Failed to generate questions')
    } finally {
      store.setGenerating(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Interview Setup</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Configure your interview and let AI generate personalized questions.
        </p>
      </div>

      <div>
        <label className="block font-medium mb-2">Job Role *</label>
        <input
          type="text"
          placeholder="e.g., Senior Full Stack Engineer"
          value={store.config.jobRole}
          onChange={(e) => store.updateConfig({ jobRole: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-3">Experience Level</label>
        <div className="grid grid-cols-3 gap-3">
          {(['Junior', 'Mid', 'Senior'] as const).map((level) => (
            <button
              key={level}
              onClick={() => store.updateConfig({ experienceLevel: level })}
              className={`p-4 rounded-lg border-2 transition-all ${
                store.config.experienceLevel === level
                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900'
                  : 'border-gray-300 dark:border-dark-border hover:border-primary-400'
              }`}
            >
              <div className="font-semibold">{level}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {level === 'Junior'
                  ? '0-2 years'
                  : level === 'Mid'
                  ? '2-5 years'
                  : '5+ years'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-3">Interview Type</label>
        <div className="grid grid-cols-2 gap-3">
          {(['Technical', 'Behavioral', 'HR', 'Mixed'] as const).map((type) => (
            <button
              key={type}
              onClick={() => store.updateConfig({ interviewType: type })}
              className={`p-4 rounded-lg border-2 transition-all ${
                store.config.interviewType === type
                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900'
                  : 'border-gray-300 dark:border-dark-border hover:border-primary-400'
              }`}
            >
              <div className="font-semibold text-sm">{type}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-3">Number of Questions</label>
        <div className="flex gap-3">
          {([5, 10, 15] as const).map((count) => (
            <button
              key={count}
              onClick={() => store.updateConfig({ questionCount: count })}
              className={`flex-1 py-2 rounded-lg border-2 font-semibold transition-all ${
                store.config.questionCount === count
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-300 dark:border-dark-border hover:border-primary-400'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={store.config.useResume}
            onChange={(e) => store.updateConfig({ useResume: e.target.checked })}
            className="w-5 h-5 rounded"
          />
          <span className="font-medium">Use my resume for personalized questions</span>
        </label>
        {store.config.useResume && (
          <textarea
            placeholder="Paste your resume text here..."
            value={store.config.resumeText}
            onChange={(e) => store.updateConfig({ resumeText: e.target.value })}
            rows={4}
            className="w-full mt-3 px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        )}
      </div>

      <Button
        fullWidth
        size="lg"
        onClick={handleGenerate}
        loading={store.isGenerating}
        disabled={!store.config.jobRole.trim()}
      >
        Generate Questions
      </Button>

      {store.isGenerating && (
        <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-dark-border dark:bg-dark-bg">
          <SkeletonLines lines={5} />
        </div>
      )}
    </Card>
  )
}
