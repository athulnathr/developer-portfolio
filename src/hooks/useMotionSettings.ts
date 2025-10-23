'use client'

import { useState, useEffect } from 'react'
import { prefersReducedMotion } from '@/lib/utils'

/**
 * Hook to manage motion preferences
 * Respects system settings and allows user override
 */
export function useMotionSettings() {
    const [reduceMotion, setReduceMotion] = useState(false)

    useEffect(() => {
        // Check system preference on mount
        const systemPref = prefersReducedMotion()
        setReduceMotion(systemPref)

        // Listen for changes
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        const handleChange = (e: MediaQueryListEvent) => {
            setReduceMotion(e.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const toggleReduceMotion = () => {
        setReduceMotion((prev) => !prev)
        // Apply class to HTML element for CSS targeting
        document.documentElement.classList.toggle('reduce-motion', !reduceMotion)
    }

    // Apply class on mount
    useEffect(() => {
        document.documentElement.classList.toggle('reduce-motion', reduceMotion)
    }, [reduceMotion])

    return {
        reduceMotion,
        toggleReduceMotion,
    }
}

