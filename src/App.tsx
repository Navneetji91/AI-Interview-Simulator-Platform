import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/ui/Navbar'
import Home from '@/pages/Home'
import Resume from '@/pages/Resume'
import Interview from '@/pages/Interview'
import JobMatch from '@/pages/JobMatch'
import { useThemeStore } from '@/store/themeStore'

export default function App() {
  const { isDark } = useThemeStore()

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-white transition-colors">
        <BrowserRouter>
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/interview" element={<Interview />} />
              <Route path="/job-match" element={<JobMatch />} />
            </Routes>
          </main>
        </BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: isDark ? '#1E293B' : '#fff',
              color: isDark ? '#fff' : '#1a1a1a',
            },
          }}
        />
      </div>
    </div>
  )
}
