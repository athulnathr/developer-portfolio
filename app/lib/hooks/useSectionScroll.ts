"use client";

import { useEffect, useRef } from "react";

interface UseSectionScrollOptions {
    enabled?: boolean;
    debounceTime?: number;
}

export function useSectionScroll({
    enabled = true,
    debounceTime = 600,
}: UseSectionScrollOptions = {}) {
    const isScrollingRef = useRef(false);
    const currentSectionRef = useRef(0);

    useEffect(() => {
        if (!enabled) return;

        const sections = document.querySelectorAll("[data-section]");
        if (sections.length === 0) return;

        const scrollToSection = (index: number) => {
            if (index < 0 || index >= sections.length) return;
            if (isScrollingRef.current) return;

            const section = sections[index] as HTMLElement;
            const lenis = (window as any).lenis;

            isScrollingRef.current = true;
            currentSectionRef.current = index;

            if (lenis) {
                lenis.scrollTo(section, {
                    duration: 1.2,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
            } else {
                section.scrollIntoView({ behavior: "smooth" });
            }

            setTimeout(() => {
                isScrollingRef.current = false;
            }, debounceTime);
        };

        const handleWheel = (e: WheelEvent) => {
            if (isScrollingRef.current) {
                e.preventDefault();
                return;
            }

            // Detect ANY scroll direction with very low threshold
            if (Math.abs(e.deltaY) > 1) {
                e.preventDefault();

                const direction = e.deltaY > 0 ? 1 : -1;
                const nextSection = currentSectionRef.current + direction;

                scrollToSection(nextSection);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrollingRef.current) return;

            if (e.key === "ArrowDown" || e.key === "PageDown") {
                e.preventDefault();
                scrollToSection(currentSectionRef.current + 1);
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                e.preventDefault();
                scrollToSection(currentSectionRef.current - 1);
            }
        };

        // Detect current section based on viewport position
        const updateCurrentSection = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + scrollY;
                const sectionHeight = rect.height;

                // Section is current if it's in the middle portion of viewport
                if (
                    scrollY >= sectionTop - windowHeight / 4 &&
                    scrollY < sectionTop + sectionHeight - windowHeight / 4
                ) {
                    currentSectionRef.current = index;
                }
            });
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("scroll", updateCurrentSection, { passive: true });

        // Initial section detection
        updateCurrentSection();

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("scroll", updateCurrentSection);
        };
    }, [enabled, debounceTime]);

    return null;
}

