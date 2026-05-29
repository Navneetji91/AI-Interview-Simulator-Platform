import type { ResumeData } from '@/types/resume'

const compact = (items: Array<string | undefined>) => items.filter(Boolean) as string[]

export default function TemplateCreative({ data }: { data: ResumeData }) {
  const contactItems = compact([
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
    data.personalInfo.linkedin,
    data.personalInfo.github,
  ])

  return (
    <div className="space-y-6 bg-white text-black">
      <header className="rounded-lg bg-gradient-to-r from-violet-700 to-sky-600 p-8 text-white">
        <h1 className="mb-2 break-words text-4xl font-bold">
          {data.personalInfo.name || 'Your Name'}
        </h1>
        {contactItems.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 break-words text-xs text-violet-50">
            {contactItems.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        )}
      </header>

      {data.summary && (
        <section>
          <SectionTitle>About</SectionTitle>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}

      {data.workExperience.length > 0 && (
        <section>
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-4 border-l-2 border-violet-300 pl-6">
            {data.workExperience.map((exp) => (
              <article key={exp.id} className="relative">
                <div className="absolute -left-8 top-1.5 h-4 w-4 rounded-full border-4 border-white bg-violet-700" />
                <div className="text-sm font-bold text-violet-700">
                  {exp.role || 'Role'}
                </div>
                {exp.company && <div className="text-xs text-gray-600">{exp.company}</div>}
                <div className="mt-1 text-xs text-gray-500">
                  {compact([
                    exp.startDate,
                    exp.current ? 'Present' : exp.endDate,
                  ]).join(' - ')}
                </div>
                {exp.description && (
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                    {exp.description}
                  </p>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <SectionTitle>Education</SectionTitle>
          <div className="grid grid-cols-1 gap-3">
            {data.education.map((edu) => (
              <article key={edu.id} className="rounded border border-violet-200 p-3">
                <div className="text-sm font-bold text-violet-700">
                  {edu.degree || 'Degree'}
                </div>
                {edu.institution && <div className="text-xs text-gray-600">{edu.institution}</div>}
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
                  {edu.year && <span>{edu.year}</span>}
                  {edu.grade && <span>{edu.grade}</span>}
                </div>
                {edu.coursework && (
                  <p className="mt-2 text-xs text-gray-700">Coursework: {edu.coursework}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section>
          <SectionTitle>Projects</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.projects.map((project) => (
              <article key={project.id} className="rounded border border-violet-200 p-3">
                <div className="text-sm font-bold text-violet-700">
                  {project.title || 'Project'}
                </div>
                {project.techStack.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.description && (
                  <p className="mt-2 text-xs leading-relaxed text-gray-700">
                    {project.description}
                  </p>
                )}
                {compact([project.liveLink, project.githubLink]).length > 0 && (
                  <p className="mt-2 break-words text-xs text-gray-600">
                    {compact([project.liveLink, project.githubLink]).join(' | ')}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {data.certifications.length > 0 && (
        <section>
          <SectionTitle>Certifications</SectionTitle>
          <div className="space-y-2">
            {data.certifications.map((certification) => (
              <article key={certification.id} className="border-b border-violet-200 pb-2">
                <div className="text-sm font-bold text-violet-700">
                  {certification.name || 'Certification'}
                </div>
                <div className="text-xs text-gray-600">
                  {compact([certification.issuer, certification.year]).join(' | ')}
                </div>
                {certification.credentialId && (
                  <div className="break-words text-xs text-gray-500">
                    Credential: {certification.credentialId}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-3 border-l-4 border-violet-700 pl-3 text-lg font-bold uppercase tracking-wide">
      {children}
    </h2>
  )
}
