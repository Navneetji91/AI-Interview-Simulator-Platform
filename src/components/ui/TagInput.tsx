import { useState } from 'react'
import { X } from 'lucide-react'

interface TagInputProps {
  tags: string[]
  onAdd: (tag: string) => void
  onRemove: (tag: string) => void
  placeholder?: string
  suggestions?: string[]
}

export function TagInput({ tags, onAdd, onRemove, placeholder = 'Add tag...', suggestions = [] }: TagInputProps) {
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault()
      const tag = input.trim().replace(/,+$/, '')
      if (tag && !tags.includes(tag)) {
        onAdd(tag)
      }
      setInput('')
    }
  }

  const filteredSuggestions = suggestions.filter(
    (s) => !tags.includes(s) && s.toLowerCase().includes(input.toLowerCase())
  )

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setShowSuggestions(true)
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border rounded-lg shadow-lg z-10">
            {filteredSuggestions.slice(0, 5).map((sug) => (
              <button
                key={sug}
                onClick={() => {
                  onAdd(sug)
                  setInput('')
                  setShowSuggestions(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-border transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div key={tag} className="flex items-center gap-1 bg-primary-100 dark:bg-primary-900 px-3 py-1 rounded-full">
            <span className="text-sm text-primary-700 dark:text-primary-200">{tag}</span>
            <button
              onClick={() => onRemove(tag)}
              className="hover:text-primary-900 dark:hover:text-primary-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
