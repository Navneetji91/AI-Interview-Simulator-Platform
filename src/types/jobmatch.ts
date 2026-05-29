export interface JobMatchResult {
  score: number
  matchingSkills: string[]
  missingSkills: string[]
  suggestions: string[]
  suggestedRoles: string[]
  improvedSummary?: string
  atsKeywords?: string[]
}
