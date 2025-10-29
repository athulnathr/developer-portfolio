/**
 * Device Detection Utilities
 * Detect device type and capabilities for optimization
 */

export function isMobileDevice(): boolean {
    if (typeof window === "undefined") return false;

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}

export function isTouchDevice(): boolean {
    if (typeof window === "undefined") return false;

    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
    );
}

export function hasGyroscope(): boolean {
    if (typeof window === "undefined") return false;

    return "DeviceOrientationEvent" in window;
}

export function isLowPowerDevice(): boolean {
    if (typeof navigator === "undefined") return false;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return true;

    // Check for low-end devices (rough heuristic)
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const deviceMemory = (navigator as any).deviceMemory || 4;

    return hardwareConcurrency <= 2 || deviceMemory <= 2;
}

export function getOptimalParticleCount(): number {
    if (isMobileDevice()) return 30;
    if (isLowPowerDevice()) return 50;
    return 100;
}

export function getOptimalShadowQuality(): "low" | "medium" | "high" {
    if (isMobileDevice()) return "low";
    if (isLowPowerDevice()) return "medium";
    return "high";
}

export function shouldEnablePostProcessing(): boolean {
    return !isMobileDevice() && !isLowPowerDevice();
}

