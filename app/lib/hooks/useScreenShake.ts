/**
 * Screen Shake Hook
 * Creates a screen shake effect for dramatic moments
 */

import { useEffect, useState } from "react";

interface ShakeOptions {
    duration?: number;
    intensity?: number;
    frequency?: number;
}

export function useScreenShake() {
    const [isShaking, setIsShaking] = useState(false);

    const shake = (options: ShakeOptions = {}) => {
        const { duration = 500, intensity = 10, frequency = 30 } = options;

        setIsShaking(true);

        const startTime = Date.now();
        const element = document.body;
        const originalTransform = element.style.transform;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;

            if (progress < 1) {
                const currentIntensity = intensity * (1 - progress);
                const offsetX = (Math.random() - 0.5) * currentIntensity;
                const offsetY = (Math.random() - 0.5) * currentIntensity;

                element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

                setTimeout(() => {
                    requestAnimationFrame(animate);
                }, 1000 / frequency);
            } else {
                element.style.transform = originalTransform;
                setIsShaking(false);
            }
        };

        animate();
    };

    return { shake, isShaking };
}

