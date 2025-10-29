import * as THREE from "three";
import { SectionName } from "@/hooks/useScrollProgress";

export interface CameraPosition {
    position: THREE.Vector3;
    lookAt: THREE.Vector3;
    fov: number;
}

export const cameraPositions: Record<SectionName, CameraPosition> = {
    hero: {
        position: new THREE.Vector3(0, 1.5, 8),
        lookAt: new THREE.Vector3(0, 1, 0),
        fov: 50,
    },
    about: {
        position: new THREE.Vector3(-6, 1.2, 2),
        lookAt: new THREE.Vector3(0, 1.2, 0),
        fov: 50,
    },
    skills: {
        position: new THREE.Vector3(2, 5, -5),
        lookAt: new THREE.Vector3(0, 1.5, 0),
        fov: 50,
    },
    projects: {
        position: new THREE.Vector3(7, 1.5, 1),
        lookAt: new THREE.Vector3(0, 1.2, 0),
        fov: 50,
    },
    contact: {
        position: new THREE.Vector3(0, 1.3, 5),
        lookAt: new THREE.Vector3(0, 1.3, 0),
        fov: 50,
    },
    footer: {
        position: new THREE.Vector3(0, 0.5, 6),
        lookAt: new THREE.Vector3(0, 0.5, 0),
        fov: 50,
    },
};

// Initial camera position for page load animation
export const initialCameraPosition = new THREE.Vector3(0, 1.5, 12);

// Smooth interpolation between camera positions
export function interpolateCameraPosition(
    currentSection: SectionName,
    nextSection: SectionName,
    progress: number
): { position: THREE.Vector3; lookAt: THREE.Vector3; fov: number } {
    const current = cameraPositions[currentSection];
    const next = cameraPositions[nextSection];

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

