'use client'

import { useEffect, useRef } from 'react'
import { createPinnedSequence } from '@/lib/gsap'
import { useMotionSettings } from '@/hooks/useMotionSettings'

interface PinnedScrollerProps {
  lines: string[]
}

/**
 * PinnedScroller component
 * Creates a scroll-pinned sequence that fades through narrative lines
 * Uses GSAP ScrollTrigger for smooth transitions
 */
export default function PinnedScroller({ lines }: PinnedScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<HTMLDivElement[]>([])
  const { reduceMotion } = useMotionSettings()

  useEffect(() => {
    if (!containerRef.current || reduceMotion) return

    const timeline = createPinnedSequence(
      containerRef.current,
      lineRefs.current,
      reduceMotion
    )

    return () => {
      timeline?.kill()
    }
  }, [reduceMotion])

  // If reduce motion, show all lines stacked vertically without pinning
  if (reduceMotion) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center gap-12 px-4 py-20">
        {lines.map((line, index) => (
          <div
            key={index}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
              {line}
            </h2>
          </div>
        ))}
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center"
    >
      {lines.map((line, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) lineRefs.current[index] = el
          }}
          className="absolute inset-0 flex items-center justify-center px-4"
        >
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white text-center max-w-5xl">
            {line}
          </h2>
        </div>
      ))}
    </section>
  )
}

