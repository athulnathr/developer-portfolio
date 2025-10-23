import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Detect if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Smooth lerp for cursor follow
 */
export function lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor
}

/**
 * Map range utility
 */
export function mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}

/**
 * Download file helper
 */
export function downloadResume() {
    // Replace with actual resume URL
    const resumeUrl = '/resume-athul-nath.pdf'
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'Athul-Nath-Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

