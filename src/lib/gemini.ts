import { GoogleGenerativeAI } from '@google/generative-ai'
import type {
  InterviewQuestion,
  AnswerEvaluation,
} from '@/types/interview'
import type { JobMatchResult } from '@/types/jobmatch'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

if (!API_KEY) {
  console.warn(
    'VITE_GEMINI_API_KEY not set. AI features will not work.'
  )
}

const genAI = new GoogleGenerativeAI(API_KEY || 'placeholder')
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

async function callGemini(prompt: string): Promise<string> {
  if (!API_KEY) {
    throw new Error(
      'Gemini API key missing. Add VITE_GEMINI_API_KEY to your .env file.'
    )
  }
  const result = await model.generateContent(prompt)
  const text = result.response.text()
  if (!text) throw new Error('Empty response from Gemini AI')
  return text
}

function safeParseJSON<T>(text: string): T {
  const clean = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()
  try {
    return JSON.parse(clean) as T
  } catch {
    throw new Error('Failed to parse AI response. Please try again.')
  }
}

export async function generateSummary(
  name: string,
  role: string,
  skills: string[],
  yearsExp: string
): Promise<string> {
  const prompt = `
Write a compelling 3-sentence professional resume summary.

Candidate:
- Name: ${name}
- Target Role: ${role}
- Key Skills: ${skills.slice(0, 8).join(', ')}
- Years of Experience: ${yearsExp}

Rules:
- Start with a strong adjective + job title
- Mention 2-3 top skills
- End with value proposition
- Do NOT use first person (I, my, me)
- Return ONLY the summary text, nothing else
  `.trim()
  return callGemini(prompt)
}

export async function improveExperience(text: string): Promise<string> {
  const prompt = `
Rewrite this work experience as 3-4 powerful resume bullet points.

Original: "${text}"

Rules:
- Start each bullet with a strong action verb (Led, Built, Reduced)
- Include quantifiable results where possible (%, $, time saved)
- Be specific and concise
- Return ONLY the bullets, one per line starting with -
  `.trim()
  return callGemini(prompt)
}

export async function suggestSkills(role: string): Promise<string[]> {
  const prompt = `
List the 15 most important skills for a ${role} in 2024.
Mix technical and soft skills.
Return ONLY a JSON array of strings:
["skill1", "skill2", ...]
No extra text. No markdown.
  `.trim()
  const res = await callGemini(prompt)
  return safeParseJSON<string[]>(res)
}

export async function generateInterviewQuestions(
  role: string,
  level: string,
  type: string,
  count: number,
  resumeText?: string
): Promise<InterviewQuestion[]> {
  const prompt = `
Generate ${count} interview questions.

Details:
- Job Role: ${role}
- Level: ${level}
- Type: ${type}
${resumeText ? `- Candidate Resume:\n${resumeText}` : ''}

Return ONLY a JSON array:
[
  {
    "id": "1",
    "question": "...",
    "category": "Technical|Behavioral|HR",
    "whyAsked": "...",
    "answerFramework": "...",
    "sampleAnswer": "..."
  }
]
No extra text. No markdown.
  `.trim()
  const res = await callGemini(prompt)
  return safeParseJSON<InterviewQuestion[]>(res)
}

export async function evaluateAnswer(
  question: string,
  userAnswer: string
): Promise<AnswerEvaluation> {
  const prompt = `
Evaluate this interview answer fairly.

Question: "${question}"
Candidate Answer: "${userAnswer}"

Return ONLY this JSON:
{
  "score": <1-10>,
  "whatWasGood": ["point1", "point2"],
  "whatToImprove": ["improvement1", "improvement2"],
  "idealAnswerComparison": "brief paragraph"
}
No extra text. No markdown.
  `.trim()
  const res = await callGemini(prompt)
  return safeParseJSON<AnswerEvaluation>(res)
}

export async function analyzeJobMatch(
  resumeText: string,
  jobDescription: string
): Promise<JobMatchResult> {
  const prompt = `
Analyze resume vs job description match.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY this JSON:
{
  "score": <0-100>,
  "matchingSkills": ["skill1"],
  "missingSkills": ["skill2"],
  "atsKeywords": ["keyword1", "keyword2"],
  "suggestions": ["tip1", "tip2", "tip3"],
  "suggestedRoles": ["role1", "role2", "role3"]
}
No extra text. No markdown.
  `.trim()
  const res = await callGemini(prompt)
  return safeParseJSON<JobMatchResult>(res)
}

export async function improveResumeForJob(
  summary: string,
  jobDescription: string
): Promise<string> {
  const prompt = `
Rewrite this resume summary to better target the job description.

Current Summary: "${summary}"
Job Description: "${jobDescription}"

Return ONLY the improved 3-4 sentence summary.
No JSON. No markdown. No extra text.
  `.trim()
  return callGemini(prompt)
}

export async function checkATS(
  resumeText: string,
  jobDescription: string
): Promise<{
  score: number
  presentKeywords: string[]
  missingKeywords: string[]
  improvements: string[]
}> {
  const prompt = `
Perform ATS keyword analysis.

RESUME: ${resumeText}
JOB DESCRIPTION: ${jobDescription}

Return ONLY this JSON:
{
  "score": <0-100>,
  "presentKeywords": ["kw1", "kw2"],
  "missingKeywords": ["kw3", "kw4"],
  "improvements": ["action1", "action2", "action3"]
}
No extra text. No markdown.
  `.trim()
  const res = await callGemini(prompt)
  return safeParseJSON(res)
}
