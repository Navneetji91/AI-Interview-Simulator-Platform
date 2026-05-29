import { Link } from 'react-router-dom'
import { Sparkles, CheckCircle, ArrowDown, FileText, Mic, BriefcaseBusiness } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function Home() {
  return (
    <div className="w-full">
      <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 text-center py-32 space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Build Resumes.
            <br />
            Ace Interviews.
            <br />
            Land Your Dream Job.
          </h1>

          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            AI-powered career tools - 100% free, no login required
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/resume">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                Build My Resume
              </Button>
            </Link>
            <Link to="/interview">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Practice Interview
              </Button>
            </Link>
          </div>

          <div className="pt-12 animate-bounce">
            <ArrowDown size={32} className="mx-auto opacity-50" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Everything You Need</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-6 hover">
              <FileText size={48} className="text-primary-600" />
              <h3 className="text-2xl font-bold">Resume Builder</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create ATS-optimized resumes with AI-powered writing assistance
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> Live preview
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> PDF export
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> 3 templates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> ATS checker
                </li>
              </ul>
              <Link to="/resume" className="block">
                <Button fullWidth variant="outline">
                  Get Started -&gt;
                </Button>
              </Link>
            </Card>

            <Card className="p-8 space-y-6 hover">
              <Mic size={48} className="text-primary-600" />
              <h3 className="text-2xl font-bold">Interview Prep</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate personalized interview questions from your resume
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> Role-based questions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> Mock mode
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> AI feedback
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> Score tracking
                </li>
              </ul>
              <Link to="/interview" className="block">
                <Button fullWidth variant="outline">
                  Get Started -&gt;
                </Button>
              </Link>
            </Card>

            <Card className="p-8 space-y-6 hover">
              <BriefcaseBusiness size={48} className="text-primary-600" />
              <h3 className="text-2xl font-bold">Job Match</h3>
              <p className="text-gray-600 dark:text-gray-400">
                See exactly how well you match any job posting
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> Match score
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> Keyword gap
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> AI suggestions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> Role ideas
                </li>
              </ul>
              <Link to="/job-match" className="block">
                <Button fullWidth variant="outline">
                  Get Started -&gt;
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold">Fill Your Details</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your work experience, education, and skills
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold">AI Enhances Everything</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get AI-powered suggestions to optimize your content
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold">Land Interviews</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Export and apply with confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">Join Thousands of Job Seekers</h2>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">10,000+</div>
              <p className="text-sm opacity-90">Resumes Created</p>
            </div>
            <div>
              <div className="text-3xl font-bold">50,000+</div>
              <p className="text-sm opacity-90">Interview Questions</p>
            </div>
            <div>
              <div className="text-3xl font-bold">Free</div>
              <p className="text-sm opacity-90">No Account Needed</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles size={20} /> CareerAI
              </h3>
              <p className="text-sm">
                Free AI-powered career platform to build resumes and ace interviews
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Tools</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/resume" className="hover:text-white">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link to="/interview" className="hover:text-white">
                    Interview Prep
                  </Link>
                </li>
                <li>
                  <Link to="/job-match" className="hover:text-white">
                    Job Match
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Powered By</h4>
              <p className="text-sm">Google Gemini AI</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>(c) 2024 CareerAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
