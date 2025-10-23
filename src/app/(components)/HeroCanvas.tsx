'use client'

import { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Center, Environment } from '@react-three/drei'
import { useLightPointer } from '@/hooks/useLightPointer'
import { useMotionSettings } from '@/hooks/useMotionSettings'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

/**
 * Animated 'I' mesh with reactive lighting and scroll-based movement
 * Light source follows cursor position
 * Moves left by 25% on scroll coordinated with narrative texts
 */
function AnimatedI() {
  const meshRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const position = useLightPointer(0.08)
  const [isHovered, setIsHovered] = useState(false)
  const [targetX, setTargetX] = useState(0)

  // Expose setTargetX globally so we can control it from ScrollTrigger
  useEffect(() => {
    ;(window as any).__setIPosition = setTargetX
    return () => {
      delete (window as any).__setIPosition
    }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return

    // Subtle rotation animation
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1

    // Smooth horizontal movement using lerp for 48FPS animation
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.1

    // Update light position based on cursor (normalized)
    if (lightRef.current) {
      const x = (position.x / window.innerWidth) * 4 - 2
      const y = -(position.y / window.innerHeight) * 4 + 2
      lightRef.current.position.set(x, y, 2)

      // Increase intensity on hover
      lightRef.current.intensity = isHovered ? 5 : 3
    }
  })

  return (
    <>
      {/* Point light that follows cursor */}
      <pointLight ref={lightRef} color="#0ea5e9" intensity={3} distance={8} decay={2} />

      {/* Main 'I' character - using Helvetiker font from drei */}
      <Center>
        <Text3D
          ref={meshRef}
          font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
          size={2.5}
          height={0.5}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}
        >
          I
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.2}
            emissive={isHovered ? '#0ea5e9' : '#000000'}
            emissiveIntensity={isHovered ? 0.5 : 0}
          />
        </Text3D>
      </Center>

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <hemisphereLight intensity={0.5} groundColor="#000000" />
    </>
  )
}

/**
 * Fallback CSS-based 'I' for devices without WebGL support
 */
function FallbackI() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fallback-i">
      <h1
        className={`text-[20rem] font-bold text-white transition-all duration-300 cursor-default select-none ${
          isHovered ? 'glow-text scale-105' : ''
        }`}
        style={{
          textShadow: isHovered
            ? '0 0 40px rgba(14, 165, 233, 0.8), 0 0 80px rgba(14, 165, 233, 0.4)'
            : '0 0 20px rgba(14, 165, 233, 0.3)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        I
      </h1>
    </div>
  )
}

interface HeroSectionProps {
  lines: string[]
}

/**
 * Unified Hero Section Component
 * Combines 3D 'I' logo with narrative texts in a pinned scroll experience
 * - Hero section stays pinned during entire animation sequence
 * - 'I' moves left as user scrolls
 * - Narrative texts appear next to it progressively
 * - Unpins after all texts are shown, allowing normal page scroll
 * Targets 48FPS performance
 */
export default function HeroCanvas({ lines }: HeroSectionProps) {
  const { reduceMotion } = useMotionSettings()
  const [useWebGL, setUseWebGL] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<HTMLDivElement[]>([])
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || reduceMotion) return

    const validRefs = lineRefs.current.filter((ref) => ref !== null)
    if (validRefs.length === 0) return

    // Get the next sections container to control visibility
    const nextSections = document.querySelector('#content-sections')

    // Create coordinated scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${lines.length * 100}%`,
        pin: true,
        pinSpacing: true, // Ensures proper spacing for content below
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress

          // Move 'I' to 25% left during first 10% of scroll, then lock it there
          // progress 0 -> 0.1 maps to position 0 -> -2.5 (25% left)
          // progress > 0.1 stays at -2.5
          const moveProgress = Math.min(progress / 0.1, 1) // 0 to 1 over first 10%
          const targetX = -moveProgress * 2.5

          if ((window as any).__setIPosition) {
            ;(window as any).__setIPosition(targetX)
          }

          // For CSS fallback
          if (canvasContainerRef.current) {
            const fallbackI = canvasContainerRef.current.querySelector('.fallback-i')
            if (fallbackI) {
              const cssProgress = Math.min(progress / 0.1, 1)
              ;(fallbackI as HTMLElement).style.transform = `translateX(-${cssProgress * 25}%)`
            }
          }
        },
        onLeave: () => {
          // When hero unpins, reveal the next sections with smooth transition
          if (nextSections) {
            gsap.to(nextSections, {
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              onStart: () => {
                ;(nextSections as HTMLElement).style.visibility = 'visible'
                ;(nextSections as HTMLElement).style.pointerEvents = 'auto'
              },
            })
          }
        },
        onEnterBack: () => {
          // When scrolling back into hero, hide the sections again
          if (nextSections) {
            gsap.to(nextSections, {
              opacity: 0,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => {
                ;(nextSections as HTMLElement).style.visibility = 'hidden'
                ;(nextSections as HTMLElement).style.pointerEvents = 'none'
              },
            })
          }
        },
      },
    })

    // Set initial state for all text lines
    gsap.set(validRefs, { opacity: 0, x: 100, scale: 0.95 })

    // Set initial state for content sections (hidden and invisible)
    if (nextSections) {
      gsap.set(nextSections, { opacity: 0 })
      ;(nextSections as HTMLElement).style.visibility = 'hidden'
      ;(nextSections as HTMLElement).style.pointerEvents = 'none'
    }

    // Animate each text line
    // Start text animations after 'I' has moved (after first 10% of timeline)
    const textStartOffset = 0.15 // Start texts at 15% to give 'I' time to settle

    validRefs.forEach((line, index) => {
      // Distribute text animations across the remaining timeline
      const textDuration = (1 - textStartOffset) / validRefs.length
      const startTime = textStartOffset + index * textDuration

      // Fade in current line
      tl.to(
        line,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: textDuration * 0.3, // 30% of slot for fade in
          ease: 'power2.out',
        },
        startTime
      )

      // Hold the line visible
      const holdDuration = textDuration * 0.4 // 40% of slot for hold
      tl.to(line, { opacity: 1, duration: holdDuration }, startTime + textDuration * 0.3)

      // Fade out (except last line which stays visible)
      if (index < validRefs.length - 1) {
        tl.to(
          line,
          {
            opacity: 0,
            x: -100,
            scale: 0.95,
            duration: textDuration * 0.3, // 30% of slot for fade out
            ease: 'power2.in',
          },
          startTime + textDuration * 0.7
        )
      }
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill()
        }
      })
      // Reset sections visibility on cleanup
      if (nextSections) {
        ;(nextSections as HTMLElement).style.opacity = '1'
        ;(nextSections as HTMLElement).style.visibility = 'visible'
        ;(nextSections as HTMLElement).style.pointerEvents = 'auto'
      }
    }
  }, [reduceMotion, lines.length])

  // Reduced motion version
  if (reduceMotion) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center gap-12 px-4 py-20 hero-gradient">
        <div className="text-9xl font-bold text-white mb-8">I</div>
        {lines.map((line, index) => (
          <div key={index} className="text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">{line}</h2>
          </div>
        ))}
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden hero-gradient flex items-center justify-center"
    >
      {/* 3D 'I' Logo / Fallback - Full width with transparent background */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {useWebGL ? (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true }}
            onCreated={({ gl }) => {
              gl.setClearColor('#000000', 0) // Transparent background
            }}
            onError={() => setUseWebGL(false)}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <AnimatedI />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        ) : (
          <FallbackI />
        )}
      </div>

      {/* Narrative Texts - Positioned on right side */}
      <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center px-8">
        {lines.map((line, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) lineRefs.current[index] = el
            }}
            className="absolute"
          >
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white">{line}</h2>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-sm text-gray-400 uppercase tracking-wider">Scroll</span>
        <svg
          className="w-6 h-6 text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
