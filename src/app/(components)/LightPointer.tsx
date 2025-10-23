'use client'

import { useLightPointer } from '@/hooks/useLightPointer'
import { useMotionSettings } from '@/hooks/useMotionSettings'

/**
 * LightPointer component
 * Creates a smooth cursor-following spotlight effect
 * Disabled when reduce motion is enabled
 */
export default function LightPointer() {
  const position = useLightPointer(0.12)
  const { reduceMotion } = useMotionSettings()

  if (reduceMotion) return null

  return (
    <div
      className="spotlight"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      aria-hidden="true"
    />
  )
}

