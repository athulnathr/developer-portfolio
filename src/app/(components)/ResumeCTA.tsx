'use client'

import { motion } from 'framer-motion'
import { downloadResume } from '@/lib/utils'
import { useMotionSettings } from '@/hooks/useMotionSettings'

/**
 * ResumeCTA component
 * Sticky resume download button with hover animation
 */
export default function ResumeCTA() {
  const { reduceMotion } = useMotionSettings()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : 0.5 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <button
        onClick={downloadResume}
        className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary-500 to-accent-500 
          text-white font-semibold rounded-full shadow-2xl shadow-primary-500/50 
          hover:shadow-primary-500/70 hover:scale-105 active:scale-95
          transition-all duration-300"
        aria-label="Download Resume"
      >
        <svg
          className="w-5 h-5 group-hover:animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="hidden sm:inline">Download Resume</span>
        <span className="sm:hidden">Resume</span>
      </button>
    </motion.div>
  )
}

