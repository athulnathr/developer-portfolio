'use client'

import { motion } from 'framer-motion'
import { useMotionSettings } from '@/hooks/useMotionSettings'

interface CopyBeatsProps {
  text: string
  delay?: number
}

/**
 * CopyBeats component
 * Animates text with a typewriter-like effect
 * Each word fades in with stagger
 */
export default function CopyBeats({ text, delay = 0 }: CopyBeatsProps) {
  const { reduceMotion } = useMotionSettings()
  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: delay,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.01 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-x-3 gap-y-2"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

