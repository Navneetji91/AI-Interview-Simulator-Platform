import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton, SkeletonLines } from '@/components/ui/Skeleton'
import { checkATS } from '@/lib/gemini'
import { useResumeStore } from '@/store/resumeStore'
import { Lightbulb } from 'lucide-react'
import toast from 'react-hot-toast'

interface ATSResult {
  score: number
  presentKeywords: string[]
  missingKeywords: string[]
  improvements: string[]
}

export function ATSChecker() {
  const store = useResumeStore()
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState<ATSResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getResumeText = () => {
    const { data } = store
    const parts = [
      data.personalInfo.name,
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location,
      data.personalInfo.linkedin,
      data.personalInfo.github,
      data.personalInfo.website,
      data.summary,
      ...data.skills,
      ...data.workExperience.map(
        (e) =>
          `${e.role} at ${e.company} ${e.startDate} to ${
            e.current ? 'Present' : e.endDate
          } ${e.description} ${e.achievements.join(' ')}`
      ),
      ...data.education.map(
        (e) => `${e.degree} from ${e.institution} ${e.year} ${e.grade || ''} ${e.coursework || ''}`
      ),
      ...data.projects.map(
        (p) =>
          `${p.title} ${p.techStack.join(' ')} ${p.description} ${p.liveLink || ''} ${
            p.githubLink || ''
          }`
      ),
      ...data.certifications.map(
        (c) => `${c.name} ${c.issuer} ${c.year} ${c.credentialId || ''}`
      ),
    ]
    return parts.filter(Boolean).join(' ')
  }

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description')
      return
    }
    setIsLoading(true)
    try {
      const resumeText = getResumeText()
      const atsResult = await checkATS(resumeText, jobDescription)
      setResult(atsResult)
    } catch (err) {
      toast.error('Failed to analyze ATS score')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">ATS Score Checker</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Paste a job description to see how well your resume aligns with ATS systems.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the complete job description..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <Button
        fullWidth
        onClick={handleAnalyze}
        loading={isLoading}
      >
        Analyze ATS Match
      </Button>

      {isLoading && (
        <div className="space-y-6 border-t border-gray-200 pt-6 dark:border-dark-border">
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="h-12 w-20" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-2 w-full" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SkeletonLines lines={4} />
            <SkeletonLines lines={4} />
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6 border-t border-gray-200 dark:border-dark-border pt-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary-600 mb-2">{result.score}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ATS Match Score</p>
            <ProgressBar value={result.score} showLabel={false} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-sm mb-3">Present Keywords</h3>
              <div className="space-y-2">
                {result.presentKeywords.map((kw: string) => (
                  <Badge key={kw} label={kw} variant="success" />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-3">Missing Keywords</h3>
              <div className="space-y-2">
                {result.missingKeywords.map((kw: string) => (
                  <Badge key={kw} label={kw} variant="error" />
                ))}
              </div>
            </div>
          </div>

          {result.improvements && result.improvements.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Lightbulb size={18} className="text-yellow-500" />
                Improvements
              </h3>
              <ol className="space-y-2">
                {result.improvements.map((imp: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
                    <span className="font-bold text-primary-600 flex-shrink-0">{idx + 1}.</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
