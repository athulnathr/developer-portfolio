'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMotionSettings } from '@/hooks/useMotionSettings'
import type { WorkProject } from '@/types/global'

interface CaseCardProps {
  project: WorkProject
  index: number
}

/**
 * CaseCard component
 * Project card with hover animations and light sheen effect
 */
export default function CaseCard({ project, index }: CaseCardProps) {
  const { reduceMotion } = useMotionSettings()

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.01 : 0.6,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="group"
    >
      <Link href={`/works/${project.slug}`}>
        <div className="card-shine relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/20">
          {/* Thumbnail */}
          <div className="aspect-video bg-gradient-to-br from-primary-900/20 to-accent-900/20 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/10">
              {project.title.charAt(0)}
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Year badge */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-mono text-white">
              {project.year}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="mb-3">
              <span className="text-sm font-medium text-primary-400 uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
              {project.title}
            </h3>

            <p className="text-gray-400 mb-6 line-clamp-2">
              {project.subtitle}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Arrow indicator */}
          <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300 group-hover:scale-110">
            <svg
              className="w-5 h-5 text-primary-400 group-hover:text-white transition-colors"
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
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

