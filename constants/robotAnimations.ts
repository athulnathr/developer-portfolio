import * as THREE from "three";

// Animation timing constants
export const ANIMATION_TIMINGS = {
    // Hero section
    STAND_UP_DURATION: 2,
    WALK_IN_DURATION: 2,
    WAVE_DURATION: 1.5,
    WAVE_START_TIME: 4,

    // Transitions
    SECTION_TRANSITION: 1.5,
    SCURRY_SPEED: 2,

    // Skills
    TECH_CARD_FLY_DURATION: 1.2,
    TECH_CARD_ORBIT_DURATION: 2,
    ABSORPTION_DURATION: 0.5,

    // Idle animations
    BREATHING_SPEED: 2,
    IDLE_GESTURE_MIN: 5,
    IDLE_GESTURE_MAX: 15,
} as const;

// Gesture keyframe animations
export const GESTURES = {
    wave: {
        keyframes: [
            { time: 0, rotation: { x: 0, y: 0, z: 0 } },
            { time: 0.25, rotation: { x: 0, y: 0, z: 0.5 } },
            { time: 0.5, rotation: { x: 0, y: 0, z: -0.3 } },
            { time: 0.75, rotation: { x: 0, y: 0, z: 0.5 } },
            { time: 1, rotation: { x: 0, y: 0, z: 0 } },
        ],
        duration: 1.5,
    },

    point: {
        keyframes: [
            { time: 0, rotation: { x: 0, y: 0, z: 0 }, position: { x: 0, y: 0, z: 0 } },
            { time: 0.3, rotation: { x: -0.5, y: 0.3, z: 0 }, position: { x: 0.2, y: 0.1, z: 0 } },
            { time: 1, rotation: { x: -0.5, y: 0.3, z: 0 }, position: { x: 0.2, y: 0.1, z: 0 } },
        ],
        duration: 1,
    },

    thumbsUp: {
        keyframes: [
            { time: 0, rotation: { x: 0, y: 0, z: 0 } },
            { time: 0.3, rotation: { x: -1, y: 0, z: 0.3 } },
            { time: 0.7, rotation: { x: -1, y: 0, z: 0.3 } },
            { time: 1, rotation: { x: 0, y: 0, z: 0 } },
        ],
        duration: 1.2,
    },

    celebrate: {
        keyframes: [
            { time: 0, position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            { time: 0.25, position: { x: 0, y: 0.3, z: 0 }, rotation: { x: 0, y: 0.5, z: 0 } },
            { time: 0.5, position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 1, z: 0 } },
            { time: 0.75, position: { x: 0, y: 0.3, z: 0 }, rotation: { x: 0, y: 1.5, z: 0 } },
            { time: 1, position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 2, z: 0 } },
        ],
        duration: 1.5,
    },

    sit: {
        keyframes: [
            { time: 0, position: { x: 0, y: -0.5, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            { time: 1, position: { x: 0, y: -0.5, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
        ],
        duration: 0.1,
    },

    materialize: {
        keyframes: [
            { time: 0, scale: 0, opacity: 0 },
            { time: 0.5, scale: 0.5, opacity: 0.5 },
            { time: 1, scale: 1, opacity: 1 },
        ],
        duration: 1.5,
    },

    standUp: {
        keyframes: [
            { time: 0, position: { x: 0, y: -0.8, z: 0 }, rotation: { x: 0.3, y: 0, z: 0 }, scale: 0.8 },
            { time: 0.5, position: { x: 0, y: -0.4, z: 0 }, rotation: { x: 0.15, y: 0, z: 0 }, scale: 0.9 },
            { time: 1, position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: 1 },
        ],
        duration: 2,
    },

    lookAt: {
        // Smooth head rotation to look at something
        duration: 0.5,
    },

    bounce: {
        keyframes: [
            { time: 0, position: { x: 0, y: 0, z: 0 } },
            { time: 0.5, position: { x: 0, y: 0.2, z: 0 } },
            { time: 1, position: { x: 0, y: 0, z: 0 } },
        ],
        duration: 0.6,
    },

    powerDown: {
        keyframes: [
            { time: 0, position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            { time: 0.5, position: { x: 0, y: -0.3, z: 0 }, rotation: { x: 0.2, y: 0, z: 0 } },
            { time: 1, position: { x: 0, y: -0.5, z: 0 }, rotation: { x: 0.3, y: 0, z: 0 } },
        ],
        duration: 2,
    },
} as const;

// Walk cycle animation
export const WALK_CYCLE = {
    legSwing: 0.4, // How much legs swing
    bodyBob: 0.1, // Vertical body movement
    speed: 4, // Steps per second
    armSwing: 0.3, // Arm movement
};

// Run cycle animation - faster and more exaggerated
export const RUN_CYCLE = {
    hipSwing: 0.8, // Hip rotation forward/back
    kneeSwing: 1.2, // Knee bend amount
    bodyBob: 0.15, // Vertical body movement (more than walk)
    bodyTilt: 0.15, // Forward lean while running
    speed: 8, // Steps per second (2x walk speed)
    armSwing: 0.6, // Arm pumping (2x walk)
    armBend: 0.3, // Arms bend more at elbow when running
};

// Robot transformation stages (Skills section)
export const TRANSFORMATION_STAGES = {
    base: {
        scale: 1,
        emissiveIntensity: 0,
        badges: 0,
    },
    learning: {
        scale: 1.1,
        emissiveIntensity: 0.3,
        badges: 4,
        glowColor: new THREE.Color(0x00d9ff),
    },
    skilled: {
        scale: 1.2,
        emissiveIntensity: 0.6,
        badges: 8,
        glowColor: new THREE.Color(0x00ff88),
    },
    master: {
        scale: 1.3,
        emissiveIntensity: 1,
        badges: 12,
        glowColor: new THREE.Color(0xff00ff),
    },
} as const;

// Tech card colors for Skills section
export const TECH_COLORS: Record<string, string> = {
    React: "#61dafb",
    "Next.js": "#000000",
    TypeScript: "#3178c6",
    JavaScript: "#f7df1e",
    "Three.js": "#000000",
    "React Three Fiber": "#61dafb",
    GSAP: "#88ce02",
    "Framer Motion": "#0055ff",
    "Tailwind CSS": "#06b6d4",
    CSS3: "#1572b6",
    "Styled Components": "#db7093",
    SASS: "#cc6699",
    Git: "#f05032",
    Webpack: "#8dd6f9",
    Vite: "#646cff",
    "Node.js": "#339933",
};

// Easing functions
export const EASING = {
    easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeOut: (t: number) => t * (2 - t),
    easeIn: (t: number) => t * t,
    elastic: (t: number) => {
        const p = 0.3;
        return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
    },
    bounce: (t: number) => {
        if (t < 1 / 2.75) {
            return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
            return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        } else if (t < 2.5 / 2.75) {
            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        }
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    },
} as const;

// Helper function to interpolate between keyframes
export function interpolateKeyframes(
    keyframes: any[],
    progress: number,
    property: string
) {
    if (keyframes.length === 0) return null;
    if (progress <= keyframes[0].time) return keyframes[0][property];
    if (progress >= keyframes[keyframes.length - 1].time)
        return keyframes[keyframes.length - 1][property];

    for (let i = 0; i < keyframes.length - 1; i++) {
        const current = keyframes[i];
        const next = keyframes[i + 1];

        if (progress >= current.time && progress <= next.time) {
            const segmentProgress = (progress - current.time) / (next.time - current.time);
            const easedProgress = EASING.easeInOut(segmentProgress);

            if (typeof current[property] === "object") {
                const result: any = {};
                for (const key in current[property]) {
                    result[key] =
                        current[property][key] +
                        (next[property][key] - current[property][key]) * easedProgress;
                }
                return result;
            }

            return current[property] + (next[property] - current[property]) * easedProgress;
        }
    }

    return keyframes[0][property];
}

