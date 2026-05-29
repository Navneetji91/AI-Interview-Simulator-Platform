import { memo, useState, ReactNode } from 'react'
import { ChevronDown, Sparkles, Trash2 } from 'lucide-react'
import { useResumeStore } from '@/store/resumeStore'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { TagInput } from '@/components/ui/TagInput'
import { Modal } from '@/components/ui/Modal'
import { generateSummary, improveExperience, suggestSkills } from '@/lib/gemini'
import toast from 'react-hot-toast'

// **FIX: Memoized PersonalInfoSection** - Prevents re-renders when other sections update
const PersonalInfoSection = memo(() => {
  const { data, updatePersonalInfo } = useResumeStore()
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="border-b border-gray-200 dark:border-dark-border">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
      >
        <h3 className="text-lg font-semibold">👤 Personal Info</h3>
        <ChevronDown
          size={20}
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && (
        <div className="px-6 pb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={data.personalInfo.name}
              onChange={(e) => updatePersonalInfo({ name: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="text"
              placeholder="Location"
              value={data.personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="url"
              placeholder="LinkedIn URL"
              value={data.personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="url"
              placeholder="GitHub URL"
              value={data.personalInfo.github}
              onChange={(e) => updatePersonalInfo({ github: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="url"
              placeholder="Portfolio / Website URL"
              value={data.personalInfo.website || ''}
              onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      )}
    </div>
  )
})
PersonalInfoSection.displayName = 'PersonalInfoSection'

// **FIX: Memoized SummarySection** - Has its own state, won't affect other sections
const SummarySection = memo(() => {
  const { data, setSummary } = useResumeStore()
  const [expanded, setExpanded] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [role, setRole] = useState('')
  const [years, setYears] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!role.trim()) {
      toast.error('Please enter a job role')
      return
    }
    setIsGenerating(true)
    try {
      const summary = await generateSummary(data.personalInfo.name, role, data.skills, years)
      setSummary(summary)
      toast.success('Summary generated!')
      setShowModal(false)
      setRole('')
      setYears('')
    } catch (err) {
      toast.error('Failed to generate summary')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <div className="border-b border-gray-200 dark:border-dark-border">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
        >
          <h3 className="text-lg font-semibold">📝 Professional Summary</h3>
          <ChevronDown
            size={20}
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
        {expanded && (
          <div className="px-6 pb-6 space-y-4">
            <textarea
              placeholder="Write your professional summary..."
              value={data.summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {data.summary.length} characters
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowModal(true)}
                leftIcon={<Sparkles size={16} />}
              >
                Generate Summary
              </Button>
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Generate Summary">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Target Job Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="text"
            placeholder="Years of Experience"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button fullWidth onClick={handleGenerate} loading={isGenerating}>
            Generate
          </Button>
        </div>
      </Modal>
    </>
  )
})
SummarySection.displayName = 'SummarySection'

// **FIX: Memoized WorkExperienceSection**
const WorkExperienceSection = memo(() => {
  const { data, addExperience, updateExperience, removeExperience } = useResumeStore()
  const [expanded, setExpanded] = useState(true)
  const [improvingId, setImprovingId] = useState<string | null>(null)

  const handleImprove = async (id: string, description: string) => {
    if (!description.trim()) {
      toast.error('Add a description first')
      return
    }
    setImprovingId(id)
    try {
      const improved = await improveExperience(description)
      updateExperience(id, { description: improved })
      toast.success('Experience improved!')
    } catch (err) {
      toast.error('Failed to improve experience')
    } finally {
      setImprovingId(null)
    }
  }

  return (
    <div className="border-b border-gray-200 dark:border-dark-border">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
      >
        <h3 className="text-lg font-semibold">💼 Work Experience</h3>
        <ChevronDown
          size={20}
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && (
        <div className="px-6 pb-6 space-y-4">
          {data.workExperience.map((exp) => (
            <Card key={exp.id} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.role}
                  onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                  className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {!exp.current && (
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                )}
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm">I currently work here</span>
              </label>
              <textarea
                placeholder="Description of responsibilities and achievements"
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <TagInput
                tags={exp.achievements}
                onAdd={(achievement) =>
                  updateExperience(exp.id, {
                    achievements: [...exp.achievements, achievement],
                  })
                }
                onRemove={(achievement) =>
                  updateExperience(exp.id, {
                    achievements: exp.achievements.filter((item) => item !== achievement),
                  })
                }
                placeholder="Add achievement highlights"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleImprove(exp.id, exp.description)}
                  loading={improvingId === exp.id}
                  leftIcon={<Sparkles size={16} />}
                >
                  Improve with AI
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => removeExperience(exp.id)}
                  leftIcon={<Trash2 size={16} />}
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))}
          <Button variant="outline" fullWidth onClick={() => addExperience()}>
            + Add Experience
          </Button>
        </div>
      )}
    </div>
  )
})
WorkExperienceSection.displayName = 'WorkExperienceSection'

// **FIX: Memoized EducationSection**
const EducationSection = memo(() => {
  const { data, addEducation, updateEducation, removeEducation } = useResumeStore()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-gray-200 dark:border-dark-border">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
      >
        <h3 className="text-lg font-semibold">🎓 Education</h3>
        <ChevronDown
          size={20}
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && (
        <div className="px-6 pb-6 space-y-4">
          {data.education.map((edu) => (
            <Card key={edu.id} className="space-y-3">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => updateEducation(edu.id, { year: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button
                size="sm"
                variant="danger"
                fullWidth
                onClick={() => removeEducation(edu.id)}
                leftIcon={<Trash2 size={16} />}
              >
                Remove
              </Button>
            </Card>
          ))}
          <Button variant="outline" fullWidth onClick={() => addEducation()}>
            + Add Education
          </Button>
        </div>
      )}
    </div>
  )
})
EducationSection.displayName = 'EducationSection'

// **FIX: Memoized SkillsSection**
const SkillsSection = memo(() => {
  const { data, addSkill, removeSkill } = useResumeStore()
  const [expanded, setExpanded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [role, setRole] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSuggest = async () => {
    if (!role.trim()) {
      toast.error('Please enter a job role')
      return
    }
    setIsLoading(true)
    try {
      const skills = await suggestSkills(role)
      setSuggestions(skills)
    } catch (err) {
      toast.error('Failed to suggest skills')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="border-b border-gray-200 dark:border-dark-border">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
        >
          <h3 className="text-lg font-semibold">💡 Skills</h3>
          <ChevronDown
            size={20}
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
        {expanded && (
          <div className="px-6 pb-6 space-y-4">
            <TagInput
              tags={data.skills}
              onAdd={(skill) => addSkill(skill)}
              onRemove={(skill) => removeSkill(skill)}
              placeholder="Add skills (press Enter)"
              suggestions={suggestions}
            />
            <Button
              variant="outline"
              fullWidth
              onClick={() => setShowModal(true)}
              leftIcon={<Sparkles size={16} />}
            >
              AI Suggest Skills
            </Button>
          </div>
        )}
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="AI Suggest Skills">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter job role (e.g., Full Stack Developer)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button fullWidth onClick={handleSuggest} loading={isLoading}>
            Suggest Skills
          </Button>
          {suggestions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Click to add:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => addSkill(skill)}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200 rounded-full text-sm hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
})
SkillsSection.displayName = 'SkillsSection'

// **FIX: Memoized ProjectsSection**
const ProjectsSection = memo(() => {
  const { data, addProject, updateProject, removeProject } = useResumeStore()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-gray-200 dark:border-dark-border">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
      >
        <h3 className="text-lg font-semibold">🚀 Projects</h3>
        <ChevronDown
          size={20}
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && (
        <div className="px-6 pb-6 space-y-4">
          {data.projects.map((proj) => (
            <Card key={proj.id} className="space-y-3">
              <input
                type="text"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <TagInput
                tags={proj.techStack}
                onAdd={(tech) => updateProject(proj.id, { techStack: [...proj.techStack, tech] })}
                onRemove={(tech) =>
                  updateProject(proj.id, { techStack: proj.techStack.filter((t) => t !== tech) })
                }
                placeholder="Add technologies"
              />
              <textarea
                placeholder="Project description"
                value={proj.description}
                onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="url"
                placeholder="Live Link (optional)"
                value={proj.liveLink || ''}
                onChange={(e) => updateProject(proj.id, { liveLink: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="url"
                placeholder="GitHub Link (optional)"
                value={proj.githubLink || ''}
                onChange={(e) => updateProject(proj.id, { githubLink: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button
                size="sm"
                variant="danger"
                fullWidth
                onClick={() => removeProject(proj.id)}
                leftIcon={<Trash2 size={16} />}
              >
                Remove
              </Button>
            </Card>
          ))}
          <Button variant="outline" fullWidth onClick={() => addProject()}>
            + Add Project
          </Button>
        </div>
      )}
    </div>
  )
})
ProjectsSection.displayName = 'ProjectsSection'
      <Section title="Personal Info" section="personal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={store.data.personalInfo.name}
            onChange={(e) => store.updatePersonalInfo({ name: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={store.data.personalInfo.email}
            onChange={(e) => store.updatePersonalInfo({ email: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={store.data.personalInfo.phone}
            onChange={(e) => store.updatePersonalInfo({ phone: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="text"
            placeholder="Location"
            value={store.data.personalInfo.location}
            onChange={(e) => store.updatePersonalInfo({ location: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={store.data.personalInfo.linkedin}
            onChange={(e) => store.updatePersonalInfo({ linkedin: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="url"
            placeholder="GitHub URL"
            value={store.data.personalInfo.github}
            onChange={(e) => store.updatePersonalInfo({ github: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="url"
            placeholder="Portfolio / Website URL"
            value={store.data.personalInfo.website || ''}
            onChange={(e) => store.updatePersonalInfo({ website: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </Section>

      <Section title="Professional Summary" section="summary">
        <textarea
          placeholder="Write your professional summary..."
          value={store.data.summary}
          onChange={(e) => store.setSummary(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {store.data.summary.length} characters
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowSummaryModal(true)}
            leftIcon={<Sparkles size={16} />}
          >
            Generate Summary
          </Button>
        </div>
      </Section>

      <Section title="Work Experience" section="experience">
        <div className="space-y-4">
          {store.data.workExperience.map((exp) => (
            <Card key={exp.id} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => store.updateExperience(exp.id, { company: e.target.value })}
                  className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.role}
                  onChange={(e) => store.updateExperience(exp.id, { role: e.target.value })}
                  className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => store.updateExperience(exp.id, { startDate: e.target.value })}
                  className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {!exp.current && (
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => store.updateExperience(exp.id, { endDate: e.target.value })}
                    className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                )}
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => store.updateExperience(exp.id, { current: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm">I currently work here</span>
              </label>
              <textarea
                placeholder="Description of responsibilities and achievements"
                value={exp.description}
                onChange={(e) => store.updateExperience(exp.id, { description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <TagInput
                tags={exp.achievements}
                onAdd={(achievement) =>
                  store.updateExperience(exp.id, {
                    achievements: [...exp.achievements, achievement],
                  })
                }
                onRemove={(achievement) =>
                  store.updateExperience(exp.id, {
                    achievements: exp.achievements.filter((item) => item !== achievement),
                  })
                }
                placeholder="Add achievement highlights"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleImproveExperience(exp.description, exp.id)}
                  loading={improvingExperienceId === exp.id}
                  leftIcon={<Sparkles size={16} />}
                >
                  Improve with AI
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => store.removeExperience(exp.id)}
                  leftIcon={<Trash2 size={16} />}
                >
                  Remove
                </Button>
              </div>
              {improvingExperienceId === exp.id && <SkeletonLines lines={2} />}
            </Card>
          ))}
          <Button
            variant="outline"
            fullWidth
            onClick={() => store.addExperience()}
          >
            + Add Experience
          </Button>
        </div>
      </Section>

      <Section title="Education" section="education">
        <div className="space-y-4">
          {store.data.education.map((edu) => (
            <Card key={edu.id} className="space-y-3">
              <input
                type="text"
                placeholder="Degree (e.g., Bachelor of Science)"
                value={edu.degree}
                onChange={(e) => store.updateEducation(edu.id, { degree: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => store.updateEducation(edu.id, { institution: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                placeholder="Graduation Year"
                value={edu.year}
                onChange={(e) => store.updateEducation(edu.id, { year: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="text"
                placeholder="Grade / GPA"
                value={edu.grade || ''}
                onChange={(e) => store.updateEducation(edu.id, { grade: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <textarea
                placeholder="Relevant coursework"
                value={edu.coursework || ''}
                onChange={(e) => store.updateEducation(edu.id, { coursework: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button
                size="sm"
                variant="danger"
                fullWidth
                onClick={() => store.removeEducation(edu.id)}
                leftIcon={<Trash2 size={16} />}
              >
                Remove
              </Button>
            </Card>
          ))}
          <Button
            variant="outline"
            fullWidth
            onClick={() => store.addEducation()}
          >
            + Add Education
          </Button>
        </div>
      </Section>

      <Section title="Skills" section="skills">
        <TagInput
          tags={store.data.skills}
          onAdd={(skill) => store.addSkill(skill)}
          onRemove={(skill) => store.removeSkill(skill)}
          placeholder="Add skills (press Enter)"
          suggestions={suggestedSkills}
        />
        <Button
          variant="outline"
          fullWidth
          onClick={() => setShowSkillsModal(true)}
          leftIcon={<Sparkles size={16} />}
        >
          AI Suggest Skills
        </Button>
      </Section>

      <Section title="Projects" section="projects">
        <div className="space-y-4">
          {store.data.projects.map((proj) => (
            <Card key={proj.id} className="space-y-3">
              <input
                type="text"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => store.updateProject(proj.id, { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <TagInput
                tags={proj.techStack}
                onAdd={(tech) => store.updateProject(proj.id, { techStack: [...proj.techStack, tech] })}
                onRemove={(tech) => store.updateProject(proj.id, { techStack: proj.techStack.filter(t => t !== tech) })}
                placeholder="Add technologies"
              />
              <textarea
                placeholder="Project description"
                value={proj.description}
                onChange={(e) => store.updateProject(proj.id, { description: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="url"
                placeholder="Live Link (optional)"
                value={proj.liveLink || ''}
                onChange={(e) => store.updateProject(proj.id, { liveLink: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="url"
                placeholder="GitHub Link (optional)"
                value={proj.githubLink || ''}
                onChange={(e) => store.updateProject(proj.id, { githubLink: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button
                size="sm"
                variant="danger"
                fullWidth
                onClick={() => store.removeProject(proj.id)}
                leftIcon={<Trash2 size={16} />}
              >
                Remove
              </Button>
            </Card>
          ))}
          <Button
            variant="outline"
            fullWidth
            onClick={() => store.addProject()}
          >
            + Add Project
          </Button>
        </div>
      </Section>

      <Section title="Certifications" section="certifications">
        <div className="space-y-4">
          {store.data.certifications.map((cert) => (
            <Card key={cert.id} className="space-y-3">
              <input
                type="text"
                placeholder="Certification Name"
                value={cert.name}
                onChange={(e) => store.updateCertification(cert.id, { name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="text"
                placeholder="Issuer"
                value={cert.issuer}
                onChange={(e) => store.updateCertification(cert.id, { issuer: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                placeholder="Year"
                value={cert.year}
                onChange={(e) => store.updateCertification(cert.id, { year: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="text"
                placeholder="Credential ID"
                value={cert.credentialId || ''}
                onChange={(e) => store.updateCertification(cert.id, { credentialId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button
                size="sm"
                variant="danger"
                fullWidth
                onClick={() => store.removeCertification(cert.id)}
                leftIcon={<Trash2 size={16} />}
              >
                Remove
              </Button>
            </Card>
          ))}
          <Button
            variant="outline"
            fullWidth
            onClick={() => store.addCertification()}
          >
            + Add Certification
          </Button>
        </div>
      </Section>

      <Modal isOpen={showSummaryModal} onClose={() => setShowSummaryModal(false)} title="Generate Summary">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Target Job Role"
            value={summaryRole}
            onChange={(e) => setSummaryRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="text"
            placeholder="Years of Experience"
            value={summaryYears}
            onChange={(e) => setSummaryYears(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button
            fullWidth
            onClick={handleGenerateSummary}
            loading={isGeneratingSummary}
          >
            Generate
          </Button>
          {isGeneratingSummary && <SkeletonLines lines={3} />}
        </div>
      </Modal>

      <Modal isOpen={showSkillsModal} onClose={() => setShowSkillsModal(false)} title="AI Suggest Skills">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter job role (e.g., Full Stack Developer)"
            value={skillsRole}
            onChange={(e) => setSkillsRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button
            fullWidth
            onClick={handleSuggestSkills}
            loading={isLoadingSkills}
          >
            Suggest Skills
          </Button>
          {isLoadingSkills && (
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
                />
              ))}
            </div>
          )}
          {suggestedSkills.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Click to add:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => store.addSkill(skill)}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200 rounded-full text-sm hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
