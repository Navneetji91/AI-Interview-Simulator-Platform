import { create } from 'zustand'
import type { InterviewConfig, InterviewQuestion, MockSession, AnswerEvaluation } from '@/types/interview'
import { defaultConfig } from '@/types/interview'

interface InterviewStore {
  config: InterviewConfig
  questions: InterviewQuestion[]
  mockSession: MockSession | null
  isGenerating: boolean
  isEvaluating: boolean
  updateConfig: (config: Partial<InterviewConfig>) => void
  setQuestions: (questions: InterviewQuestion[]) => void
  setGenerating: (val: boolean) => void
  setEvaluating: (val: boolean) => void
  startMockSession: () => void
  submitAnswer: (answer: string, evaluation: AnswerEvaluation) => void
  nextQuestion: () => void
  completeMockSession: () => void
  resetInterview: () => void
}

export const useInterviewStore = create<InterviewStore>((set, get) => ({
  config: defaultConfig,
  questions: [],
  mockSession: null,
  isGenerating: false,
  isEvaluating: false,
  updateConfig: (config) =>
    set((state) => ({
      config: { ...state.config, ...config },
    })),
  setQuestions: (questions) => set(() => ({ questions })),
  setGenerating: (val) => set(() => ({ isGenerating: val })),
  setEvaluating: (val) => set(() => ({ isEvaluating: val })),
  startMockSession: () => {
    const questions = get().questions
    set(() => ({
      mockSession: {
        questions,
        answers: [],
        currentIndex: 0,
        isComplete: false,
        startTime: new Date(),
      },
    }))
  },
  submitAnswer: (answer, evaluation) =>
    set((state) => {
      if (!state.mockSession) return state
      const mockSession = state.mockSession
      const newAnswer = {
        questionId: mockSession.questions[mockSession.currentIndex].id,
        userAnswer: answer,
        evaluation,
      }
      return {
        mockSession: {
          ...mockSession,
          answers: [...mockSession.answers, newAnswer],
        },
      }
    }),
  nextQuestion: () =>
    set((state) => {
      if (!state.mockSession) return state
      const nextIndex = state.mockSession.currentIndex + 1
      const isComplete = nextIndex >= state.mockSession.questions.length
      return {
        mockSession: {
          ...state.mockSession,
          currentIndex: nextIndex,
          isComplete,
        },
      }
    }),
  completeMockSession: () =>
    set((state) => {
      if (!state.mockSession) return state
      return {
        mockSession: {
          ...state.mockSession,
          isComplete: true,
        },
      }
    }),
  resetInterview: () =>
    set(() => ({
      config: defaultConfig,
      questions: [],
      mockSession: null,
      isGenerating: false,
      isEvaluating: false,
    })),
}))
