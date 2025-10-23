/**
 * GSAP utility configuration and ScrollTrigger setup
 * Provides centralized animation utilities
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

/**
 * Create pinned scroll sequence for hero narrative
 * Optimized for 48FPS with smooth text transitions
 * Each scroll brings a new text, removing the old one
 */
export function createPinnedSequence(
    containerRef: HTMLElement,
    lines: HTMLElement[],
    reduceMotion: boolean = false
) {
    if (reduceMotion) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef,
            start: 'top top',
            end: `+=${lines.length * 100}%`,
            pin: true,
            scrub: 0.5, // Reduced scrub value for smoother, more responsive animation
            anticipatePin: 1,
            invalidateOnRefresh: true,
        },
    });

    // Set initial state for all lines (hidden)
    gsap.set(lines, { opacity: 0, y: 60, scale: 0.95 });

    lines.forEach((line, index) => {
        const startTime = index * 1.2;

        // Fade in current line
        tl.to(
            line,
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'power2.out'
            },
            startTime
        );

        // Hold the line visible
        tl.to(line, { opacity: 1, duration: 0.4 }, startTime + 0.6);

        // Fade out (except last line) - remove old text smoothly
        if (index < lines.length - 1) {
            tl.to(
                line,
                {
                    opacity: 0,
                    y: -60,
                    scale: 0.95,
                    duration: 0.6,
                    ease: 'power2.in'
                },
                startTime + 1.0
            );
        }
    });

    return tl;
}

/**
 * Parallax scroll effect helper
 */
export function parallaxElement(
    element: HTMLElement,
    speed: number = 0.5,
    start: string = 'top bottom',
    end: string = 'bottom top'
) {
    gsap.fromTo(
        element,
        { y: -100 * speed },
        {
            y: 100 * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start,
                end,
                scrub: true,
            },
        }
    );
}

/**
 * Fade in on scroll
 */
export function fadeInOnScroll(elements: HTMLElement | HTMLElement[], stagger: number = 0.1) {
    gsap.fromTo(
        elements,
        { opacity: 0, y: 60 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger,
            scrollTrigger: {
                trigger: Array.isArray(elements) ? elements[0] : elements,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
        }
    );
}

export { gsap, ScrollTrigger, ScrollToPlugin };

