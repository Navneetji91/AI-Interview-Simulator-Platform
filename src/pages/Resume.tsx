import { useState } from 'react'
import { Eye, PencilLine } from 'lucide-react'
import { ResumeForm } from '@/components/resume/ResumeForm_fixed'
import { ResumePreview } from '@/components/resume/ResumePreview'
import { ATSChecker } from '@/components/resume/ATSChecker'

export default function Resume() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-dark-bg">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Resume Builder</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create ATS-optimized resumes with AI-powered enhancements
          </p>
        </div>

        <div className="sticky top-16 z-20 mb-4 flex gap-2 rounded-lg border border-gray-200 bg-white p-1 shadow-sm dark:border-dark-border dark:bg-dark-card md:hidden">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 font-medium transition-colors ${
              activeTab === 'edit'
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-bg'
            }`}
          >
            <PencilLine size={16} />
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 font-medium transition-colors ${
              activeTab === 'preview'
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-bg'
            }`}
          >
            <Eye size={16} />
            Preview
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className={`${activeTab === 'preview' ? 'hidden md:block' : ''}`}>
            <div className="sticky top-20">
              <ResumeForm />
            </div>
          </div>

          <div className={`${activeTab === 'edit' ? 'hidden md:block' : ''}`}>
            <div className="sticky top-20">
              <ResumePreview />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ATSChecker />
        </div>
      </div>
    </div>
  )
}
