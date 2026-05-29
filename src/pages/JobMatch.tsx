import { Card } from '@/components/ui/Card'
import { JobMatchAnalyzer } from '@/components/jobmatch/JobMatchAnalyzer'
import { Lightbulb } from 'lucide-react'

export default function JobMatch() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Job Match Analyzer</h1>
          <p className="text-gray-600 dark:text-gray-400">
            See how well your resume matches a job description and get AI suggestions
          </p>
        </div>

        <JobMatchAnalyzer />

        <Card className="mt-12 p-6 space-y-4 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20">
          <h3 className="font-semibold flex items-center gap-2">
            <Lightbulb size={20} className="text-amber-500" />
            Tips for Best Results
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <strong>Tip 1:</strong> Upload your full PDF resume including all sections
              (experience, education, skills, projects)
            </li>
            <li>
              <strong>Tip 2:</strong> Use the complete job description, not just the title
            </li>
            <li>
              <strong>Tip 3:</strong> Aim for 75%+ match before applying to increase your chances
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
