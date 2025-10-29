/**
 * Fracture Algorithm
 * Handles breaking the monolith into fragments
 */

import * as THREE from 'three';

export interface Fragment {
    id: string;
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    velocity: THREE.Vector3;
    angularVelocity: THREE.Vector3;
    scale: THREE.Vector3;
}

/**
 * Generate fragments from the monolith geometry
 * Uses a simplified Voronoi-like approach
 */
export function generateFragments(
    originalGeometry: THREE.BufferGeometry,
    fragmentCount: number = 10
): Fragment[] {
    const fragments: Fragment[] = [];

    // Get bounding box
    originalGeometry.computeBoundingBox();
    const bbox = originalGeometry.boundingBox!;
    const center = new THREE.Vector3();
    bbox.getCenter(center);

    // Generate seed points for fragments
    const seedPoints = generateSeedPoints(fragmentCount, bbox);

    // For simplicity, create box fragments with slight variations
    // In a production app, you'd use a proper Voronoi fracture algorithm
    seedPoints.forEach((point, index) => {
        const size = new THREE.Vector3(
            0.3 + Math.random() * 0.4,
            0.4 + Math.random() * 0.6,
            0.2 + Math.random() * 0.3
        );

        const geometry = new THREE.BoxGeometry(size.x, size.y, size.z, 8, 8, 8);

        // Add some irregularity to make it look broken
        const positions = geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += (Math.random() - 0.5) * 0.1;
            positions[i + 1] += (Math.random() - 0.5) * 0.1;
            positions[i + 2] += (Math.random() - 0.5) * 0.1;
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.computeVertexNormals();

        // Calculate explosion direction from center
        const direction = point.clone().sub(center).normalize();
        const explosionForce = 1.5 + Math.random() * 2.0;

        fragments.push({
            id: `fragment-${index}`,
            geometry,
            position: point.clone(),
            rotation: new THREE.Euler(
                Math.random() * 0.2,
                Math.random() * 0.2,
                Math.random() * 0.2
            ),
            velocity: direction.multiplyScalar(explosionForce),
            angularVelocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.3
            ),
            scale: new THREE.Vector3(1, 1, 1)
        });
    });

    return fragments;
}

/**
 * Generate seed points for fragment generation
 */
function generateSeedPoints(count: number, bbox: THREE.Box3): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    const center = new THREE.Vector3();
    bbox.getCenter(center);

    const size = new THREE.Vector3();
    bbox.getSize(size);

    for (let i = 0; i < count; i++) {
        // Distribute points within the bounding box
        const x = center.x + (Math.random() - 0.5) * size.x * 0.8;
        const y = center.y + (Math.random() - 0.5) * size.y * 0.8;
        const z = center.z + (Math.random() - 0.5) * size.z * 0.8;

        points.push(new THREE.Vector3(x, y, z));
    }

    return points;
}

/**
 * Calculate crack lines for visual effects
 */
export function calculateCrackLines(
    stage: number,
    geometry: THREE.BufferGeometry
): THREE.Vector3[][] {
    const lines: THREE.Vector3[][] = [];

    if (!geometry.boundingBox) {
        geometry.computeBoundingBox();
    }

    const bbox = geometry.boundingBox!;
    const center = new THREE.Vector3();
    bbox.getCenter(center);

    // Generate crack lines based on stage
    const crackCount = stage * 3;

    for (let i = 0; i < crackCount; i++) {
        const line: THREE.Vector3[] = [];
        const angle = (i / crackCount) * Math.PI * 2;
        const length = 1.5 + Math.random();

        // Start from center
        line.push(center.clone());

        // Add segments
        const segments = 5 + Math.floor(Math.random() * 5);
        for (let j = 1; j <= segments; j++) {
            const t = j / segments;
            const offset = new THREE.Vector3(
                Math.cos(angle + (Math.random() - 0.5) * 0.5) * length * t,
                (Math.random() - 0.5) * 2 * t,
                Math.sin(angle + (Math.random() - 0.5) * 0.5) * length * t
            );
            line.push(center.clone().add(offset));
        }

        lines.push(line);
    }

    return lines;
}

