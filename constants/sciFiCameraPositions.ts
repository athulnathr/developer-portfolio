import * as THREE from "three";
import { SectionName } from "@/hooks/useScrollProgress";

export interface CameraPosition {
    position: THREE.Vector3;
    lookAt: THREE.Vector3;
    fov: number;
}

export const sciFiCameraPositions: Record<SectionName, CameraPosition> = {
    hero: {
        // Medium view showing robot on chair in room
        position: new THREE.Vector3(0, 1.5, 10),
        lookAt: new THREE.Vector3(0, 1.2, 0),
        fov: 50,
    },
    about: {
        // Begin subtle zoom, still showing room context
        position: new THREE.Vector3(0, 1.5, 7),
        lookAt: new THREE.Vector3(0, 1.3, 0),
        fov: 48,
    },
    skills: {
        // Continuing zoom, room still visible in periphery
        position: new THREE.Vector3(0, 1.55, 5),
        lookAt: new THREE.Vector3(0, 1.4, 0),
        fov: 45,
    },
    projects: {
        // Closer zoom, focusing more on robot
        position: new THREE.Vector3(0, 1.58, 3.5),
        lookAt: new THREE.Vector3(0, 1.5, 0),
        fov: 40,
    },
    contact: {
        // Close-up on robot face
        position: new THREE.Vector3(0, 1.6, 2.5),
        lookAt: new THREE.Vector3(0, 1.6, 0),
        fov: 35,
    },
    footer: {
        // Maintain face close-up
        position: new THREE.Vector3(0, 1.6, 2.5),
        lookAt: new THREE.Vector3(0, 1.6, 0),
        fov: 35,
    },
};

// Initial camera position for page load animation - far back to show entire room
export const sciFiInitialCameraPosition = new THREE.Vector3(0, 3, 18);

// Smooth interpolation between camera positions
export function interpolateSciFiCameraPosition(
    currentSection: SectionName,
    nextSection: SectionName,
    progress: number
): { position: THREE.Vector3; lookAt: THREE.Vector3; fov: number } {
    const current = sciFiCameraPositions[currentSection];
    const next = sciFiCameraPositions[nextSection];

    // Smooth easing function (ease-in-out)
    const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    const position = new THREE.Vector3().lerpVectors(
        current.position,
        next.position,
        easeProgress
    );

    const lookAt = new THREE.Vector3().lerpVectors(
        current.lookAt,
        next.lookAt,
        easeProgress
    );

    const fov = THREE.MathUtils.lerp(current.fov, next.fov, easeProgress);

    return { position, lookAt, fov };
}

