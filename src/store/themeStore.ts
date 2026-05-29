import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
  isDark: boolean
  toggleDark: () => void
  setDark: (val: boolean) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      toggleDark: () =>
        set((state) => {
          const newVal = !state.isDark
          applyTheme(newVal)
          return { isDark: newVal }
        }),
      setDark: (val) => {
        applyTheme(val)
        set(() => ({ isDark: val }))
      },
    }),
    {
      name: 'career-ai-theme',
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.isDark)
      },
    }
  )
)

function applyTheme(isDark: boolean) {
  if (typeof document !== 'undefined') {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}
