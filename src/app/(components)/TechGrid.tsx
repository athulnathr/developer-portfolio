'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionSettings } from '@/hooks/useMotionSettings'
import type { TechItem } from '@/types/global'

const technologies: TechItem[] = [
  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Vue.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'SASS/SCSS', category: 'frontend' },
  { name: 'Redux', category: 'frontend' },
  { name: 'Zustand', category: 'frontend' },
  
  // 3D
  { name: 'Three.js', category: '3d' },
  { name: 'React Three Fiber', category: '3d' },
  { name: 'GSAP', category: '3d' },
  { name: 'Framer Motion', category: '3d' },
  { name: 'WebGL', category: '3d' },
  { name: 'Blender', category: '3d' },
  
  // Streaming
  { name: 'WebRTC', category: 'streaming' },
  { name: 'Socket.io', category: 'streaming' },
  { name: 'WebSockets', category: 'streaming' },
  { name: 'HLS', category: 'streaming' },
  
  // Tooling
  { name: 'Webpack', category: 'tooling' },
  { name: 'Vite', category: 'tooling' },
  { name: 'Git', category: 'tooling' },
  { name: 'Docker', category: 'tooling' },
  { name: 'Figma', category: 'tooling' },
  { name: 'Storybook', category: 'tooling' },
]

const categories = [
  { key: 'all', label: 'All' },
  { key: 'frontend', label: 'Frontend' },
  { key: '3d', label: '3D & Animation' },
  { key: 'streaming', label: 'Streaming' },
  { key: 'tooling', label: 'Tooling' },
] as const

/**
 * TechGrid component
 * Displays technology stack with category filtering
 * Cards have hover light-follow effect
 */
export default function TechGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const { reduceMotion } = useMotionSettings()

  const filteredTech =
    activeCategory === 'all'
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.01 : 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: reduceMotion ? 0.01 : 0.2,
      },
    },
  }

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Technologies
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, interactive web experiences
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.key
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/50'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech, index) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
                className="card-shine group"
              >
                <div className="relative bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary-500/50 transition-all duration-300 cursor-default">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-lg font-medium text-white group-hover:text-primary-400 transition-colors">
                      {tech.name}
                    </span>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/20 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

