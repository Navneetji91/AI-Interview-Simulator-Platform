export type ExperienceLevel = 'Junior' | 'Mid' | 'Senior'
export type InterviewType = 'Technical' | 'Behavioral' | 'HR' | 'Mixed'
export type QuestionCategory = 'Technical' | 'Behavioral' | 'HR'
export type QuestionCount = 5 | 10 | 15

export interface InterviewConfig {
  jobRole: string
  experienceLevel: ExperienceLevel
  interviewType: InterviewType
  questionCount: QuestionCount
  useResume: boolean
  resumeText: string
}

export interface InterviewQuestion {
  id: string
  question: string
  category: QuestionCategory
  whyAsked: string
  answerFramework: string
  sampleAnswer: string
}

export interface AnswerEvaluation {
  score: number
  whatWasGood: string[]
  whatToImprove: string[]
  idealAnswerComparison: string
}

export interface MockSessionAnswer {
  questionId: string
  userAnswer: string
  evaluation: AnswerEvaluation
}

export interface MockSession {
  questions: InterviewQuestion[]
  answers: MockSessionAnswer[]
  currentIndex: number
  isComplete: boolean
  startTime: Date
}

export const defaultConfig: InterviewConfig = {
  jobRole: '',
  experienceLevel: 'Mid',
  interviewType: 'Mixed',
  questionCount: 10,
  useResume: false,
  resumeText: '',
}
