'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { lerp } from '@/lib/utils'
import type { LightPosition } from '@/types/global'

/**
 * Custom hook for smooth cursor-following light pointer
 * Uses lerp for smooth interpolation
 */
export function useLightPointer(smoothFactor: number = 0.15) {
    const [position, setPosition] = useState<LightPosition>({ x: 0, y: 0 })
    const targetRef = useRef<LightPosition>({ x: 0, y: 0 })
    const rafRef = useRef<number | undefined>(undefined)

    const updatePosition = useCallback(() => {
        setPosition((prev) => ({
            x: lerp(prev.x, targetRef.current.x, smoothFactor),
            y: lerp(prev.y, targetRef.current.y, smoothFactor),
        }))
        rafRef.current = requestAnimationFrame(updatePosition)
    }, [smoothFactor])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetRef.current = { x: e.clientX, y: e.clientY }
        }

        window.addEventListener('mousemove', handleMouseMove)
        rafRef.current = requestAnimationFrame(updatePosition)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [updatePosition])

    return position
}

