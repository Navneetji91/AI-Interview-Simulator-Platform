export interface PersonalInfo {
  name: string
  email: string
  phone: string
  linkedin: string
  github: string
  location: string
  website?: string
}

export interface WorkExperience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  year: string
  grade?: string
  coursework?: string
}

export interface Project {
  id: string
  title: string
  techStack: string[]
  description: string
  liveLink?: string
  githubLink?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  credentialId?: string
}

export type TemplateType = 'minimal' | 'professional' | 'creative'

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  workExperience: WorkExperience[]
  education: Education[]
  skills: string[]
  projects: Project[]
  certifications: Certification[]
  template: TemplateType
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    name: '', email: '', phone: '',
    linkedin: '', github: '', location: '', website: ''
  },
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  template: 'minimal',
}
