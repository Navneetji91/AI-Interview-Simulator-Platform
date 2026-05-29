import type { ResumeData } from '@/types/resume'

const compact = (items: Array<string | undefined>) => items.filter(Boolean) as string[]

export default function TemplateProfessional({ data }: { data: ResumeData }) {
  const contactItems = compact([
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
    data.personalInfo.linkedin,
    data.personalInfo.github,
  ])

  return (
    <div className="flex min-h-full bg-white text-black">
      <aside className="w-1/3 bg-slate-900 p-8 text-white">
        <h1 className="mb-2 break-words text-3xl font-bold">
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <p className="mb-6 border-b border-slate-700 pb-4 text-sm text-slate-300">
          Professional Profile
        </p>

        {contactItems.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-300">
              Contact
            </h2>
            <div className="space-y-2 break-words text-xs text-slate-200">
              {contactItems.map((item, index) => (
                <div key={`${item}-${index}`}>{item}</div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-300">
              Skills
            </h2>
            <div className="space-y-1">
              {data.skills.map((skill) => (
                <div key={skill} className="text-sm text-slate-100">
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.certifications.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-300">
              Certifications
            </h2>
            <div className="space-y-3">
              {data.certifications.map((certification) => (
                <article key={certification.id} className="text-xs text-slate-100">
                  <div className="font-semibold">
                    {certification.name || 'Certification'}
                  </div>
                  {certification.issuer && (
                    <div className="text-slate-300">{certification.issuer}</div>
                  )}
                  {certification.year && (
                    <div className="text-slate-300">{certification.year}</div>
                  )}
                  {certification.credentialId && (
                    <div className="break-words text-slate-400">
                      ID: {certification.credentialId}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </aside>

      <main className="w-2/3 space-y-6 p-8">
        {data.summary && (
          <section>
            <h2 className="mb-3 border-b-2 border-slate-900 pb-2 text-sm font-bold uppercase tracking-wide">
              Summary
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}

        {data.workExperience.length > 0 && (
          <section>
            <h2 className="mb-3 border-b-2 border-slate-900 pb-2 text-sm font-bold uppercase tracking-wide">
              Experience
            </h2>
            <div className="space-y-4">
              {data.workExperience.map((exp) => (
                <article key={exp.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold">{exp.role || 'Role'}</div>
                      {exp.company && (
                        <div className="text-xs text-gray-600">{exp.company}</div>
                      )}
                    </div>
                    <div className="text-right text-xs text-gray-600">
                      {compact([
                        exp.startDate,
                        exp.current ? 'Present' : exp.endDate,
                      ]).join(' - ')}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-gray-700">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-gray-700">
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
            <h2 className="mb-3 border-b-2 border-slate-900 pb-2 text-sm font-bold uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <article key={edu.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold">{edu.degree || 'Degree'}</div>
                      {edu.institution && (
                        <div className="text-xs text-gray-600">{edu.institution}</div>
                      )}
                    </div>
                    <div className="text-right text-xs text-gray-600">
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

        {data.projects.length > 0 && (
          <section>
            <h2 className="mb-3 border-b-2 border-slate-900 pb-2 text-sm font-bold uppercase tracking-wide">
              Projects
            </h2>
            <div className="space-y-3">
              {data.projects.map((project) => (
                <article key={project.id}>
                  <div className="text-sm font-bold">{project.title || 'Project'}</div>
                  {project.techStack.length > 0 && (
                    <div className="text-xs text-gray-600">
                      {project.techStack.join(', ')}
                    </div>
                  )}
                  {project.description && (
                    <p className="mt-1 text-xs leading-relaxed text-gray-700">
                      {project.description}
                    </p>
                  )}
                  {compact([project.liveLink, project.githubLink]).length > 0 && (
                    <div className="mt-1 break-words text-xs text-gray-600">
                      {compact([project.liveLink, project.githubLink]).join(' | ')}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
