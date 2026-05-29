# CareerAI - AI Career Platform

CareerAI is a free React application for building resumes, preparing for interviews, and comparing a resume against job descriptions. It uses Google Gemini for AI-powered writing, questions, scoring, and suggestions.

## Features

- Resume builder with personal info, summary, experience, education, skills, projects, and certifications
- Live resume preview with multiple templates
- PDF export for resumes
- AI summary generation
- AI experience bullet improvement
- AI skill suggestions
- ATS keyword checker
- Interview question generator
- Mock interview mode with AI feedback
- Job match analyzer with score, missing skills, matching skills, and suggestions
- Dark mode with local persistence
- Responsive UI

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- Google Gemini AI
- html2canvas
- jsPDF
- Lucide React
- React Hot Toast

## Project Status

This project currently has no separate backend. The app runs as a frontend-only Vite application.

AI requests are made from:

```text
src/lib/gemini.ts
```

Resume and interview data is stored in the browser using localStorage through Zustand persistence.

## Folder Structure

```text
InterviewPrep/
├── src/
│   ├── components/
│   │   ├── interview/
│   │   ├── jobmatch/
│   │   ├── resume/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   │   └── gemini.ts
│   ├── pages/
│   ├── store/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Requirements

- Node.js
- npm
- Google Gemini API key

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

An example file is already included:

```text
.env.example
```

## Installation

Install dependencies:

```bash
npm install
```

If PowerShell blocks `npm`, use:

```bash
npm.cmd install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Or on PowerShell if script execution is blocked:

```bash
npm.cmd run dev
```

Open the app in the browser:

```text
http://localhost:5173
```

## Build

Create a production build:

```bash
npm run build
```

Or:

```bash
npm.cmd run build
```

The generated production files are placed in:

```text
dist/
```

Do not edit files inside `dist/` directly. Make changes in `src/`, then run the build again.

## Preview Production Build

```bash
npm run preview
```

Or:

```bash
npm.cmd run preview
```

## Available Scripts

```text
npm run dev      Start local Vite server
npm run build    Type-check and build the app
npm run preview  Preview production build
npm run lint     Run ESLint
```

## Main Pages

- `/` - Home
- `/resume` - Resume Builder
- `/interview` - Interview Preparation
- `/job-match` - Job Match Analyzer

## Notes

- The Gemini API key is exposed to the browser because this is a frontend-only project.
- For production use, move AI calls to a backend service to protect the API key.
- User data is stored locally in the browser and is not saved to a database.

## License

MIT
