/**
 * Fragment Physics
 * Simple physics simulation for fragments
 */

import * as THREE from 'three';
import { Fragment } from './fracture';

export interface PhysicsConfig {
    gravity: number;
    damping: number;
    angularDamping: number;
    groundY: number;
    restitution: number;
}

const defaultConfig: PhysicsConfig = {
    gravity: -9.8,
    damping: 0.98,
    angularDamping: 0.95,
    groundY: -2,
    restitution: 0.3
};

/**
 * Update fragment physics
 */
export function updateFragmentPhysics(
    fragment: Fragment,
    deltaTime: number,
    config: Partial<PhysicsConfig> = {}
): void {
    const cfg = { ...defaultConfig, ...config };

    // Apply gravity
    fragment.velocity.y += cfg.gravity * deltaTime;

    // Apply damping
    fragment.velocity.multiplyScalar(cfg.damping);
    fragment.angularVelocity.multiplyScalar(cfg.angularDamping);

    // Update position
    fragment.position.add(fragment.velocity.clone().multiplyScalar(deltaTime));

    // Update rotation
    fragment.rotation.x += fragment.angularVelocity.x * deltaTime;
    fragment.rotation.y += fragment.angularVelocity.y * deltaTime;
    fragment.rotation.z += fragment.angularVelocity.z * deltaTime;

    // Ground collision
    if (fragment.position.y < cfg.groundY) {
        fragment.position.y = cfg.groundY;
        fragment.velocity.y *= -cfg.restitution;
        fragment.angularVelocity.multiplyScalar(0.8);

        // Stop if velocity is very low
        if (Math.abs(fragment.velocity.y) < 0.1) {
            fragment.velocity.y = 0;
            fragment.velocity.x *= 0.9;
            fragment.velocity.z *= 0.9;
        }
    }
}

/**
 * Calculate reassembly target positions
 */
export function calculateReassemblyTarget(
    fragmentIndex: number,
    totalFragments: number,
    targetPosition: THREE.Vector3
): {
    position: THREE.Vector3;
    rotation: THREE.Euler;
    scale: THREE.Vector3;
} {
    // All fragments return to center and merge
    return {
        position: targetPosition.clone(),
        rotation: new THREE.Euler(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1)
    };
}

/**
 * Apply explosion force to fragments
 */
export function applyExplosionForce(
    fragments: Fragment[],
    center: THREE.Vector3,
    force: number
): void {
    fragments.forEach(fragment => {
        const direction = fragment.position.clone().sub(center).normalize();
        const randomOffset = new THREE.Vector3(
            (Math.random() - 0.5) * 0.5,
            Math.random() * 0.5,
            (Math.random() - 0.5) * 0.5
        );

        fragment.velocity.add(
            direction.add(randomOffset).multiplyScalar(force)
        );

        // Add spin
        fragment.angularVelocity.add(
            new THREE.Vector3(
                (Math.random() - 0.5) * force * 0.5,
                (Math.random() - 0.5) * force * 0.5,
                (Math.random() - 0.5) * force * 0.5
            )
        );
    });
}

