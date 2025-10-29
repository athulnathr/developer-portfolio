"use client";

import { useEffect, useState } from "react";

export type SectionName = "hero" | "about" | "skills" | "projects" | "contact" | "footer";

interface ScrollProgress {
    currentSection: SectionName;
    progress: number;
    scrollY: number;
    sectionProgress: Record<SectionName, number>;
}

// Initial state that matches server-rendered content
const initialScrollProgress: ScrollProgress = {
    currentSection: "hero",
    progress: 0,
    scrollY: 0,
    sectionProgress: {
        hero: 0,
        about: 0,
        skills: 0,
        projects: 0,
        contact: 0,
        footer: 0,
    },
};

export const useScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState<ScrollProgress>(initialScrollProgress);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = documentHeight > 0 ? scrollY / documentHeight : 0;

            // Calculate section progress
            const sections: SectionName[] = ["hero", "about", "skills", "projects", "contact", "footer"];
            const sectionProgress: Record<SectionName, number> = {
                hero: 0,
                about: 0,
                skills: 0,
                projects: 0,
                contact: 0,
                footer: 0,
            };

            let currentSection: SectionName = "hero";

            sections.forEach((sectionName) => {
                const element = document.getElementById(sectionName);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + scrollY;
                    const elementBottom = elementTop + rect.height;

                    // Calculate progress for this section (0 to 1)
                    if (scrollY >= elementTop && scrollY <= elementBottom) {
                        sectionProgress[sectionName] = (scrollY - elementTop) / rect.height;
                        currentSection = sectionName;
                    } else if (scrollY > elementBottom) {
                        sectionProgress[sectionName] = 1;
                    } else {
                        sectionProgress[sectionName] = 0;
                    }
                }
            });

            setScrollProgress({
                currentSection,
                progress,
                scrollY,
                sectionProgress,
            });
        };

        handleScroll(); // Initial call
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return scrollProgress;
};

