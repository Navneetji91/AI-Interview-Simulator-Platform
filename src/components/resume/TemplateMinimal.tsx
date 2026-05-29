import type { ResumeData } from '@/types/resume'

const compact = (items: Array<string | undefined>) => items.filter(Boolean) as string[]

export default function TemplateMinimal({ data }: { data: ResumeData }) {
  const contactItems = compact([
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
    data.personalInfo.linkedin,
    data.personalInfo.github,
  ])

  return (
    <div className="bg-white font-serif text-black">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-wide">
          {data.personalInfo.name || 'Your Name'}
        </h1>
        {contactItems.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs">
            {contactItems.map((item, index) => (
              <span key={`${item}-${index}`}>
                {index > 0 && <span className="mx-2">|</span>}
                {item}
              </span>
            ))}
          </div>
        )}
      </header>

      {data.summary && (
        <section className="mb-5">
          <h2 className="mb-2 border-b border-black pb-1 text-sm font-bold uppercase">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.workExperience.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-2 border-b border-black pb-1 text-sm font-bold uppercase">
            Experience
          </h2>
          <div className="space-y-3">
            {data.workExperience.map((exp) => (
              <article key={exp.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-bold">{exp.role || 'Role'}</span>
                    {exp.company && <span> at {exp.company}</span>}
                  </div>
                  <span className="text-right text-xs">
                    {compact([
                      exp.startDate,
                      exp.current ? 'Present' : exp.endDate,
                    ]).join(' - ')}
                  </span>
                </div>
                {exp.description && (
                  <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                    {exp.description}
                  </p>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-700">
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
        <section className="mb-5">
          <h2 className="mb-2 border-b border-black pb-1 text-sm font-bold uppercase">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <article key={edu.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-bold">{edu.degree || 'Degree'}</div>
                    {edu.institution && <div className="text-sm">{edu.institution}</div>}
                  </div>
                  <div className="text-right text-xs">
                    {edu.year && <div>{edu.year}</div>}
                    {edu.grade && <div>{edu.grade}</div>}
                  </div>
                </div>
                {edu.coursework && (
                  <p className="mt-1 text-xs text-gray-700">
                    Coursework: {edu.coursework}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-2 border-b border-black pb-1 text-sm font-bold uppercase">
            Skills
          </h2>
          <p className="text-sm">{data.skills.join(' | ')}</p>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-2 border-b border-black pb-1 text-sm font-bold uppercase">
            Projects
          </h2>
          <div className="space-y-2">
            {data.projects.map((project) => (
              <article key={project.id}>
                <div className="font-bold">{project.title || 'Project'}</div>
                {project.techStack.length > 0 && (
                  <div className="text-xs text-gray-600">
                    {project.techStack.join(', ')}
                  </div>
                )}
                {project.description && (
                  <p className="text-sm leading-relaxed text-gray-700">
                    {project.description}
                  </p>
                )}
                {compact([project.liveLink, project.githubLink]).length > 0 && (
                  <p className="text-xs text-gray-600">
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
          <h2 className="mb-2 border-b border-black pb-1 text-sm font-bold uppercase">
            Certifications
          </h2>
          <div className="space-y-1">
            {data.certifications.map((certification) => (
              <div key={certification.id} className="text-sm">
                <span className="font-bold">{certification.name || 'Certification'}</span>
                {compact([certification.issuer, certification.year]).length > 0 && (
                  <span>
                    {' '}
                    - {compact([certification.issuer, certification.year]).join(', ')}
                  </span>
                )}
                {certification.credentialId && (
                  <span className="text-gray-600">
                    {' '}
                    Credential: {certification.credentialId}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
