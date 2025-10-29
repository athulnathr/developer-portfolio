"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
    threshold?: number;
    triggerOnce?: boolean;
    rootMargin?: string;
}

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * Returns ref to attach to element and inView state
 */
export function useScrollAnimation({
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = "0px",
}: UseScrollAnimationOptions = {}) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            setInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setInView(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, triggerOnce, rootMargin]);

    return { ref, inView };
}

