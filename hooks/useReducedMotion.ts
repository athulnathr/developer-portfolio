"use client";

import { useEffect, useState } from "react";
import { useHasMounted } from "./useHasMounted";

export const useReducedMotion = () => {
    const hasMounted = useHasMounted();
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    // Return false during SSR and initial render to match server-rendered HTML
    if (!hasMounted) {
        return false;
    }

    return prefersReducedMotion;
};

