import { useState, useRef } from 'react'
import { Lightbulb, Copy, UploadCloud, FileText } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton, SkeletonLines } from '@/components/ui/Skeleton'
import { MatchScoreRing } from './MatchScoreRing'
import { analyzeJobMatch, improveResumeForJob } from '@/lib/gemini'
import { useClipboard } from '@/hooks/useClipboard'
import type { JobMatchResult } from '@/types/jobmatch'
import toast from 'react-hot-toast'

export function JobMatchAnalyzer() {
  const [resumeText, setResumeText] = useState('')
  const [resumeFileName, setResumeFileName] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState<JobMatchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [improvedSummary, setImprovedSummary] = useState('')
  const [isImproving, setIsImproving] = useState(false)
  const { copy, copied } = useClipboard()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file')
      return
    }

    setResumeFileName(file.name)
    setIsLoading(true)
    
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let fullText = ''
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map((item: any) => item.str).join(' ')
        fullText += pageText + '\n'
      }
      
      setResumeText(fullText)
      toast.success('Resume parsed successfully!')
    } catch (error) {
      console.error('Error parsing PDF:', error)
      toast.error('Failed to parse PDF resume')
      setResumeFileName('')
      setResumeText('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveResume = () => {
    setResumeText('')
    setResumeFileName('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      toast.error('Please fill in both fields')
      return
    }
    setIsLoading(true)
    try {
      const matchResult = await analyzeJobMatch(resumeText, jobDescription)
      setResult(matchResult)
      setImprovedSummary('')
    } catch (err) {
      toast.error('Failed to analyze job match')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImprove = async () => {
    setIsImproving(true)
    try {
      const improved = await improveResumeForJob(resumeText, jobDescription)
      setImprovedSummary(improved)
      toast.success('Summary improved!')
    } catch (err) {
      toast.error('Failed to improve summary')
    } finally {
      setIsImproving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Your Resume (PDF)</label>
          
          {!resumeFileName ? (
            <div 
              className="w-full h-[264px] border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-bg/50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-border/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Click to upload your resume
              </p>
              <p className="text-xs text-gray-500 mt-2">PDF files only</p>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept=".pdf,application/pdf"
                onChange={handleFileUpload}
              />
            </div>
          ) : (
            <div className="w-full h-[264px] border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg p-6 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <p className="font-medium text-gray-900 dark:text-white text-center mb-2 truncate w-full px-4">
                {resumeFileName}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mb-6 flex items-center gap-1">
                ✓ Successfully parsed
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  Replace File
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                  onClick={handleRemoveResume}
                >
                  Remove
                </Button>
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept=".pdf,application/pdf"
                onChange={handleFileUpload}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={() => setJobDescription('')}
            className="mt-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Clear
          </button>
        </div>
      </div>

      <Button
        fullWidth
        size="lg"
        onClick={handleAnalyze}
        loading={isLoading}
        className="py-3"
      >
        Analyze Match
      </Button>

      {isLoading && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="flex flex-col items-center gap-4 p-8">
              <Skeleton className="h-40 w-40 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </Card>
            <div className="space-y-6 md:col-span-2">
              <Card className="p-6">
                <SkeletonLines lines={4} />
              </Card>
              <Card className="p-6">
                <SkeletonLines lines={4} />
              </Card>
            </div>
          </div>
          <Card className="p-6">
            <SkeletonLines lines={5} />
          </Card>
        </div>
      )}

      {result && !isLoading && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <MatchScoreRing score={result.score} />
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Matching Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {result.matchingSkills.map((skill: string) => (
                    <Badge key={skill} label={skill} variant="success" />
                  ))}
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Missing Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill: string) => (
                    <Badge key={skill} label={skill} variant="error" />
                  ))}
                </div>
              </Card>

              {result.atsKeywords && result.atsKeywords.length > 0 && (
                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg">ATS Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.atsKeywords.map((kw: string) => (
                      <Badge key={kw} label={kw} variant="info" />
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>

          {result.suggestions && result.suggestions.length > 0 && (
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Lightbulb size={20} className="text-yellow-500" />
                AI Suggestions
              </h3>
              <ol className="space-y-2">
                {result.suggestions.map((sug: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex gap-3">
                    <span className="font-bold text-primary-600 flex-shrink-0">{idx + 1}.</span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ol>
            </Card>
          )}

          {result.suggestedRoles && result.suggestedRoles.length > 0 && (
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Suggested Roles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {result.suggestedRoles.map((role: string) => (
                  <div key={role} className="p-3 rounded-lg bg-blue-50 text-center dark:bg-blue-900/40">
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-200">{role}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {!improvedSummary && (
            <Button
              fullWidth
              variant="outline"
              onClick={handleImprove}
              loading={isImproving}
            >
              Tailor Summary to This Job
            </Button>
          )}

          {isImproving && (
            <Card className="p-6 space-y-4 border-primary-200 bg-primary-50 dark:border-primary-900 dark:bg-primary-900/20">
              <Skeleton className="h-4 w-40" />
              <SkeletonLines lines={3} />
            </Card>
          )}

          {improvedSummary && (
            <Card className="p-6 space-y-4 border-primary-200 dark:border-primary-900 bg-primary-50 dark:bg-primary-900/20">
              <h3 className="font-semibold flex items-center gap-2">
                Tailored Summary
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{improvedSummary}</p>
              <Button
                size="sm"
                variant="primary"
                onClick={() => copy(improvedSummary)}
                leftIcon={<Copy size={16} />}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
