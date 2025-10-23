'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Lenis from 'lenis'
import { initSmoothScroll } from '@/lib/gsap'
import Navigation from './(components)/Navigation'
import LightPointer from './(components)/LightPointer'
import CopyBeats from './(components)/CopyBeats'
import TechGrid from './(components)/TechGrid'
import CaseCard from './(components)/CaseCard'
import ContactStrip from './(components)/ContactStrip'
import ResumeCTA from './(components)/ResumeCTA'
import MotionToggle from './(components)/MotionToggle'
import { getAllProjects } from '@/data/projects'

// Dynamically import HeroCanvas (unified hero section) to avoid SSR issues with Three.js
const HeroCanvas = dynamic(() => import('./(components)/HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center hero-gradient">
      <div className="text-9xl font-bold text-white/20 animate-pulse">I</div>
    </div>
  ),
})

/**
 * Main portfolio page
 * Integrates all sections with smooth scroll and interactive elements
 */
export default function Home() {
  const projects = getAllProjects()

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    // Sync with GSAP
    initSmoothScroll(lenis)

    // Store instance globally for potential use
    window.lenis = lenis

    return () => {
      lenis.destroy()
    }
  }, [])

  const narrativeLines = ['Create experiences', 'Tell stories', "I'm Athul Nath"]

  return (
    <>
      {/* Global Components */}
      <Navigation />
      <LightPointer />
      <ResumeCTA />
      <MotionToggle />

      <main className="relative">
        {/* Unified Hero Section - Pinned with 'I' movement and narrative texts */}
        <HeroCanvas lines={narrativeLines} />

        {/* Content Sections - Hidden until hero animation completes */}
        <div
          id="content-sections"
          style={{
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity 0.6s ease-out, visibility 0.6s',
          }}
        >
          {/* Introduction */}
          <section className="min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-b from-transparent to-black/50">
            <div className="max-w-4xl text-center">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                <CopyBeats
                  text="Lead UI Engineer and Senior Frontend Developer crafting immersive digital experiences"
                  delay={0.2}
                />
              </h2>
              <div className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                <CopyBeats
                  text="Specializing in React, TypeScript, 3D web interactions, and performance-optimized interfaces that push the boundaries of what's possible on the web."
                  delay={0.8}
                />
              </div>
            </div>
          </section>

          {/* Technologies Section */}
          <section id="technologies" className="relative">
            <TechGrid />
          </section>

          {/* Works Section */}
          <section
            id="works"
            className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent to-black/30"
          >
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="mb-16 text-center">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Featured Work</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  A showcase of projects combining technical excellence with exceptional user
                  experiences
                </p>
              </div>

              {/* Project Grid */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {projects.map((project, index) => (
                  <CaseCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact">
            <ContactStrip />
          </section>

          {/* Footer */}
          <footer className="py-12 px-4 border-t border-white/10 bg-black/50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Athul Nath. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="#hero" className="hover:text-white transition-colors">
                  Back to Top
                </a>
                <span>•</span>
                <a
                  href="https://github.com/athulnath"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <span>•</span>
                <a
                  href="https://linkedin.com/in/athulnath"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </div>
        {/* End of content-sections */}
      </main>
    </>
  )
}
