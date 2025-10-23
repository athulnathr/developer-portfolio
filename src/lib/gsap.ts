/**
 * GSAP utility configuration and ScrollTrigger setup
 * Provides centralized animation utilities and Lenis integration
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Initialize Lenis smooth scroll and sync with GSAP ScrollTrigger
 */
export function initSmoothScroll(lenisInstance: any) {
    if (typeof window === 'undefined') return;

    // Sync Lenis with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
        lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

/**
 * Create pinned scroll sequence for hero narrative
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
            end: '+=300%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
        },
    });

    lines.forEach((line, index) => {
        // Fade in current line
        tl.fromTo(
            line,
            { opacity: 0, y: 50, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1 },
            index * 1.5
        );

        // Hold
        tl.to(line, { opacity: 1, duration: 0.5 });

        // Fade out (except last line)
        if (index < lines.length - 1) {
            tl.to(line, { opacity: 0, y: -50, scale: 1.1, duration: 1 });
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

export { gsap, ScrollTrigger };

