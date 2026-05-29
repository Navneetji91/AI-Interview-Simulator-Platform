import { BriefcaseBusiness, Download, FileText, Link, WandSparkles } from 'lucide-react'
import { useResumeStore } from '@/store/resumeStore'
import { usePDFExport } from '@/hooks/usePDFExport'
import { useClipboard } from '@/hooks/useClipboard'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import TemplateMinimal from './TemplateMinimal'
import TemplateProfessional from './TemplateProfessional'
import TemplateCreative from './TemplateCreative'

export function ResumePreview() {
  const { data, setTemplate } = useResumeStore()
  const { exportToPDF, isExporting } = usePDFExport()
  const { copy, copied } = useClipboard()

  const handleShareClick = () => {
    const encoded = btoa(JSON.stringify(data))
    const shareUrl = `${window.location.origin}?resume=${encoded}`
    copy(shareUrl)
  }

  const templates = [
    { id: 'minimal', name: 'Minimal', icon: FileText },
    { id: 'professional', name: 'Professional', icon: BriefcaseBusiness },
    { id: 'creative', name: 'Creative', icon: WandSparkles },
  ] as const

  const renderTemplate = () => {
    switch (data.template) {
      case 'professional':
        return <TemplateProfessional data={data} />
      case 'creative':
        return <TemplateCreative data={data} />
      default:
        return <TemplateMinimal data={data} />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Template</h3>
          <div className="flex flex-wrap gap-2">
            {templates.map((template) => {
              const Icon = template.icon
              return (
                <button
                  key={template.id}
                  onClick={() => setTemplate(template.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all ${
                    data.template === template.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-card dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={16} />
                  {template.name}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => exportToPDF('resume-preview', 'resume')}
            loading={isExporting}
            leftIcon={<Download size={16} />}
          >
            Download
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleShareClick}
            leftIcon={<Link size={16} />}
          >
            {copied ? 'Copied!' : 'Share'}
          </Button>
        </div>
      </div>

      <Card className="overflow-x-auto p-0">
        <div
          id="resume-preview"
          className="min-h-[297mm] bg-white p-8 print:m-0 print:p-0"
          style={{ width: '210mm', margin: '0 auto' }}
        >
          {renderTemplate()}
        </div>
      </Card>
    </div>
  )
}
