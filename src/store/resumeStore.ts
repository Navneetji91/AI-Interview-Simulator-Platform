import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ResumeData, PersonalInfo, WorkExperience, Education, Project, Certification, TemplateType } from '@/types/resume'
import { defaultResumeData } from '@/types/resume'

interface ResumeStore {
  data: ResumeData
  setTemplate: (template: TemplateType) => void
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  setSummary: (summary: string) => void
  addExperience: () => void
  updateExperience: (id: string, data: Partial<WorkExperience>) => void
  removeExperience: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, data: Partial<Education>) => void
  removeEducation: (id: string) => void
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void
  addProject: () => void
  updateProject: (id: string, data: Partial<Project>) => void
  removeProject: (id: string) => void
  addCertification: () => void
  updateCertification: (id: string, data: Partial<Certification>) => void
  removeCertification: (id: string) => void
  resetResume: () => void
}

const generateId = () => Math.random().toString(36).slice(2, 9)

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: defaultResumeData,
      setTemplate: (template) =>
        set((state) => ({
          data: { ...state.data, template },
        })),
      updatePersonalInfo: (info) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: { ...state.data.personalInfo, ...info },
          },
        })),
      setSummary: (summary) =>
        set((state) => ({
          data: { ...state.data, summary },
        })),
      addExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: [
              ...state.data.workExperience,
              {
                id: generateId(),
                company: '',
                role: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                achievements: [],
              },
            ],
          },
        })),
      updateExperience: (id, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: state.data.workExperience.map((exp) =>
              exp.id === id ? { ...exp, ...updates } : exp
            ),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: state.data.workExperience.filter(
              (exp) => exp.id !== id
            ),
          },
        })),
      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              ...state.data.education,
              {
                id: generateId(),
                degree: '',
                institution: '',
                year: '',
                grade: '',
                coursework: '',
              },
            ],
          },
        })),
      updateEducation: (id, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((edu) =>
              edu.id === id ? { ...edu, ...updates } : edu
            ),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((edu) => edu.id !== id),
          },
        })),
      addSkill: (skill) =>
        set((state) => {
          if (state.data.skills.includes(skill)) return state
          return {
            data: {
              ...state.data,
              skills: [...state.data.skills, skill],
            },
          }
        }),
      removeSkill: (skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((s) => s !== skill),
          },
        })),
      addProject: () =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [
              ...state.data.projects,
              {
                id: generateId(),
                title: '',
                techStack: [],
                description: '',
                liveLink: '',
                githubLink: '',
              },
            ],
          },
        })),
      updateProject: (id, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((proj) =>
              proj.id === id ? { ...proj, ...updates } : proj
            ),
          },
        })),
      removeProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((proj) => proj.id !== id),
          },
        })),
      addCertification: () =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: [
              ...state.data.certifications,
              {
                id: generateId(),
                name: '',
                issuer: '',
                year: '',
                credentialId: '',
              },
            ],
          },
        })),
      updateCertification: (id, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.map((cert) =>
              cert.id === id ? { ...cert, ...updates } : cert
            ),
          },
        })),
      removeCertification: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.filter(
              (cert) => cert.id !== id
            ),
          },
        })),
      resetResume: () => set(() => ({ data: defaultResumeData })),
    }),
    {
      name: 'career-ai-resume',
    }
  )
)
