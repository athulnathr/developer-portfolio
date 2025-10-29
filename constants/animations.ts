export const animationConfig = {
    // Robo animation states
    robo: {
        spawn: {
            duration: 1.5,
            scale: { from: 0, to: 1 },
            opacity: { from: 0, to: 1 },
        },
        wave: {
            duration: 1,
            armRotation: Math.PI / 4,
        },
        walk: {
            duration: 2,
            steps: 10,
        },
        celebrate: {
            duration: 1.5,
            jumpHeight: 2,
            rotations: 2,
        },
        powerUp: {
            duration: 2,
            scaleMultiplier: 1.2,
            glowIntensity: 2,
        },
        sleep: {
            duration: 2,
            slumpRotation: Math.PI / 6,
        },
    },

    // Section transitions
    transitions: {
        section: {
            duration: 1,
            ease: "power3.out",
        },
        roboMove: {
            duration: 2,
            ease: "power2.inOut",
        },
    },

    // UI animations
    ui: {
        fadeIn: {
            duration: 0.6,
            ease: "easeOut",
        },
        slideUp: {
            duration: 0.8,
            distance: 50,
            ease: "easeOut",
        },
        stagger: {
            duration: 0.5,
            delay: 0.1,
        },
    },

    // Particle effects
    particles: {
        skillAbsorb: {
            count: 50,
            lifetime: 1,
            speed: 2,
        },
        celebrate: {
            count: 100,
            lifetime: 2,
            speed: 3,
        },
        messageWave: {
            count: 30,
            lifetime: 1.5,
            speed: 1.5,
        },
    },
};

// Section positions for Robo
export const roboPositions = {
    hero: { x: 0, y: 0, z: 0, scale: 1 },
    about: { x: -3, y: 0, z: 0, scale: 1 },
    skills: { x: 0, y: 0, z: 1, scale: 1 },
    projects: { x: 2, y: 0.5, z: 0, scale: 1.3 },
    contact: { x: -2, y: 0, z: 0, scale: 1 },
    footer: { x: 0, y: -1, z: 0, scale: 0.8 },
};

