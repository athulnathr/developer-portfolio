"use client";

import { useState, useEffect } from "react";

export type PerformanceMode = "high" | "medium" | "low";

interface PerformanceSettings {
    mode: PerformanceMode;
    particleCount: number;
    enableShaders: boolean;
    enableShadows: boolean;
    enablePostProcessing: boolean;
    pixelRatio: number;
}

export function usePerformanceMode(): PerformanceSettings {
    const [settings, setSettings] = useState<PerformanceSettings>({
        mode: "high",
        particleCount: 100,
        enableShaders: true,
        enableShadows: false,
        enablePostProcessing: true,
        pixelRatio: 2,
    });

    useEffect(() => {
        // Only run on client
        if (typeof window === "undefined") return;

        // Detect device capabilities
        const detectPerformance = () => {
            let mode: PerformanceMode = "high";

            // Check if mobile device
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );

            // Check hardware concurrency (CPU cores)
            const cores = navigator.hardwareConcurrency || 2;

            // Check available memory (if available)
            const memory = (navigator as any).deviceMemory || 4;

            // Simple performance scoring
            if (isMobile || cores < 4 || memory < 4) {
                mode = "medium";
            }

            if (isMobile && (cores < 2 || memory < 2)) {
                mode = "low";
            }

            // Check WebGL capabilities
            const canvas = document.createElement("canvas");
            const gl =
                canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

            if (!gl) {
                mode = "low";
            }

            // Set settings based on performance mode
            switch (mode) {
                case "high":
                    setSettings({
                        mode: "high",
                        particleCount: 100,
                        enableShaders: true,
                        enableShadows: false,
                        enablePostProcessing: true,
                        pixelRatio: Math.min(window.devicePixelRatio, 2),
                    });
                    break;

                case "medium":
                    setSettings({
                        mode: "medium",
                        particleCount: 50,
                        enableShaders: true,
                        enableShadows: false,
                        enablePostProcessing: false,
                        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
                    });
                    break;

                case "low":
                    setSettings({
                        mode: "low",
                        particleCount: 20,
                        enableShaders: false,
                        enableShadows: false,
                        enablePostProcessing: false,
                        pixelRatio: 1,
                    });
                    break;
            }
        };

        detectPerformance();
    }, []);

    return settings;
}

