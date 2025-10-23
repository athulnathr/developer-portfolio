'use client'

import { useMotionSettings } from '@/hooks/useMotionSettings'
import { motion } from 'framer-motion'

/**
 * MotionToggle component
 * Accessibility control to reduce/enable motion
 * Fixed position toggle button
 */
export default function MotionToggle() {
  const { reduceMotion, toggleReduceMotion } = useMotionSettings()

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed bottom-8 left-8 z-40"
    >
      <button
        onClick={toggleReduceMotion}
        className="group flex items-center gap-3 px-4 py-3 bg-black/50 backdrop-blur-xl border border-white/10 
          text-white rounded-full shadow-lg hover:bg-black/70 hover:border-primary-500/50
          transition-all duration-300"
        aria-label={reduceMotion ? 'Enable animations' : 'Reduce animations'}
        title={reduceMotion ? 'Enable animations' : 'Reduce animations'}
      >
        {reduceMotion ? (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-sm hidden sm:inline">Enable Effects</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
            <span className="text-sm hidden sm:inline">Reduce Effects</span>
          </>
        )}
      </button>
    </motion.div>
  )
}

