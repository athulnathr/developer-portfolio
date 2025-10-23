import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getAllProjects } from '@/data/projects'
import type { Metadata } from 'next'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

/**
 * Generate static params for all project pages
 */
export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} — Athul Nath`,
    description: project.subtitle,
    openGraph: {
      title: project.title,
      description: project.subtitle,
      type: 'article',
    },
  }
}

/**
 * Individual work project detail page
 */
export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-6 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Portfolio
          </Link>

          <div className="text-2xl font-bold text-white">
            <span className="text-primary-400">A</span>N
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Category & Year */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-primary-400 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-sm text-gray-400">{project.year}</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {project.title}
          </h1>

          {/* Subtitle */}
          <p className="text-2xl text-gray-400 mb-12">{project.subtitle}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Image Placeholder */}
      <section className="px-4 md:px-8 lg:px-16 mb-24">
        <div className="max-w-6xl mx-auto aspect-video bg-gradient-to-br from-primary-900/20 to-accent-900/20 rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center text-9xl font-bold text-white/10">
            {project.title.charAt(0)}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="px-4 md:px-8 lg:px-16 pb-24">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Challenge */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-primary-500" />
              The Challenge
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* Approach */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-accent-500" />
              The Approach
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {project.approach}
            </p>
          </div>

          {/* Outcome */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-green-500" />
              The Outcome
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {project.outcome}
            </p>
          </div>

          {/* Live Link */}
          {project.link && (
            <div className="pt-8">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 group"
              >
                View Live Project
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* More Projects */}
      <section className="px-4 md:px-8 lg:px-16 py-24 border-t border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Explore More Projects
          </h2>
          <Link
            href="/#works"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to All Work
          </Link>
        </div>
      </section>
    </main>
  )
}

