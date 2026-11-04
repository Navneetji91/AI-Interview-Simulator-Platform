# AI Interview Simulator Platform

AI Interview Simulator Platform is a full-stack web application that helps job seekers create ATS-friendly resumes, practice AI-powered mock interviews, and analyze job descriptions. The platform combines React, Spring Boot, MongoDB, JWT Authentication, and Google Gemini AI to deliver personalized career preparation. Users can securely manage their profiles, receive AI-generated interview feedback, and improve their resumes through intelligent suggestions. It provides an end-to-end solution for interview preparation and career development.

## Features

### Authentication
- User Registration
- Secure Login
- JWT Authentication
- Protected Routes

### Resume Builder
- Multiple Resume Templates
- Resume Preview
- AI Resume Summary
- AI Experience Improvement
- ATS Resume Checker
- PDF Export

### Interview Preparation
- AI Interview Question Generator
- Technical Interview
- HR Interview
- Behavioral Interview
- AI Feedback & Scoring
- Resume-based Interview Questions

### Job Match Analyzer
- Resume Upload
- ATS Score
- Skill Gap Analysis
- Job Description Matching
- AI Suggestions

### Dashboard
- User Profile
- Activity Overview
- Dark Mode
- Responsive UI

## Tech Stack

### Frontend
- React 18
- JavaScript (JSX)
- Vite
- Tailwind CSS
- React Router
  

### Backend
- Spring Boot
- Java 17
- Spring Security
- JWT
- Maven

### Database
- MongoDB

### AI
- Google Gemini API

### Tools
- Docker
- Git
- GitHub
- Postman
- VS Code

## Project Status

This project follows a full-stack architecture with a React frontend, Spring Boot backend, MongoDB database, and Google Gemini AI integration. Authentication is handled using JWT, and user information is securely stored in MongoDB.

AI requests are made from:

```text
src/lib/gemini.ts
```
```
Resume and interview data is stored in the browser using localStorage through Zustand persistence.

AI-Interview-Simulator/

├── backend/
│   ├── config/
│   ├── controller/
│   ├── dto/
│   ├── model/
│   ├── repository/
│   ├── security/
│   └── service/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── store/
│   ├── lib/
│   └── assets/
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

Node.js 18+
npm
Java 17+
Maven
MongoDB
Google Gemini API Key
Docker 

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
