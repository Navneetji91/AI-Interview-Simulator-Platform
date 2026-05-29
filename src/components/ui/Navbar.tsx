import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Moon, Sun, Menu, X } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, toggleDark } = useThemeStore()
  const location = useLocation()

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Resume Builder', href: '/resume' },
    { label: 'Interview Prep', href: '/interview' },
    { label: 'Job Match', href: '/job-match' },
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md dark:border-dark-border dark:bg-dark-bg/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="text-primary-600" size={24} />
            <span className="gradient-text">CareerAI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className={`transition-colors ${
                  isActive(href)
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDark}
              className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-card"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>

            <button
              className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-card md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-controls="mobile-navigation"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div id="mobile-navigation" className="border-t border-gray-200 dark:border-dark-border md:hidden">
            <div className="flex flex-col gap-4 p-4">
              {links.map(({ label, href }) => (
                <Link
                  key={href}
                  to={href}
                  className={`py-2 px-4 rounded transition-colors ${
                    isActive(href)
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-600'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
