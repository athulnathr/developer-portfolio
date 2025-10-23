'use client'

import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Center, Environment } from '@react-three/drei'
import { useLightPointer } from '@/hooks/useLightPointer'
import { useMotionSettings } from '@/hooks/useMotionSettings'
import * as THREE from 'three'

/**
 * Animated 'I' mesh with reactive lighting
 * Light source follows cursor position
 */
function AnimatedI() {
  const meshRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const position = useLightPointer(0.08)
  const [isHovered, setIsHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return

    // Subtle rotation animation
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1

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
    <div className="flex items-center justify-center h-full">
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

/**
 * HeroCanvas component
 * Renders interactive 3D 'I' logo with cursor-reactive lighting
 * Falls back to CSS version if WebGL is unavailable
 */
export default function HeroCanvas() {
  const { reduceMotion } = useMotionSettings()
  const [useWebGL, setUseWebGL] = useState(true)

  // Use CSS fallback if reduced motion is preferred
  if (reduceMotion || !useWebGL) {
    return <FallbackI />
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor('#0a0a0f')
        }}
        onError={() => setUseWebGL(false)}
      >
        <Suspense fallback={null}>
          <AnimatedI />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
