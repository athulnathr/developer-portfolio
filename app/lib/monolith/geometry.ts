/**
 * Monolith Geometry Builder
 * Creates the abstract "I" monolithic structure
 */

import * as THREE from 'three';

export interface MonolithGeometryOptions {
    height?: number;
    width?: number;
    depth?: number;
    segments?: number;
}

/**
 * Creates a monolithic "I" shaped geometry
 * Abstract initially, clearly resolves to "I" after reassembly
 */
export function createMonolithGeometry(options: MonolithGeometryOptions = {}) {
    const {
        height = 4,
        width = 1.2,
        depth = 0.8,
        segments = 32
    } = options;

    // Create the main vertical beam (the shaft of the "I")
    const mainBeam = new THREE.BoxGeometry(width * 0.4, height, depth * 0.5, segments, segments * 2, segments);

    // Create top cap
    const topCap = new THREE.BoxGeometry(width, height * 0.15, depth, segments, 4, segments);

    // Create bottom cap
    const bottomCap = new THREE.BoxGeometry(width, height * 0.15, depth, segments, 4, segments);

    // Merge geometries
    const geometries: THREE.BufferGeometry[] = [];

    // Main beam at center
    geometries.push(mainBeam);

    // Top cap
    topCap.translate(0, height / 2 - (height * 0.075), 0);
    geometries.push(topCap);

    // Bottom cap
    bottomCap.translate(0, -height / 2 + (height * 0.075), 0);
    geometries.push(bottomCap);

    // Merge all geometries
    const mergedGeometry = mergeGeometries(geometries);

    // Center the geometry
    mergedGeometry.center();

    return mergedGeometry;
}

/**
 * Helper to merge multiple geometries into one
 */
function mergeGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
    const merged = new THREE.BufferGeometry();

    let positions: number[] = [];
    let normals: number[] = [];
    let uvs: number[] = [];

    geometries.forEach(geometry => {
        const pos = geometry.attributes.position.array;
        const norm = geometry.attributes.normal.array;
        const uv = geometry.attributes.uv.array;

        positions = positions.concat(Array.from(pos));
        normals = normals.concat(Array.from(norm));
        uvs = uvs.concat(Array.from(uv));
    });

    merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    merged.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    merged.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

    merged.computeBoundingBox();
    merged.computeBoundingSphere();

    return merged;
}

/**
 * Get fracture points for the monolith
 * Returns positions where cracks will emanate from
 */
export function getFracturePoints(stage: number): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];

    if (stage >= 1) {
        // First crack - single point in center
        points.push(new THREE.Vector3(0, 0.5, 0));
    }

    if (stage >= 2) {
        // Second stage - multiple cracks
        points.push(new THREE.Vector3(-0.3, -0.2, 0.2));
        points.push(new THREE.Vector3(0.4, 0.8, -0.1));
        points.push(new THREE.Vector3(-0.2, -0.6, -0.3));
    }

    if (stage >= 3) {
        // Third stage - more intensive cracks before full shatter
        points.push(new THREE.Vector3(0.3, 0.2, 0.3));
        points.push(new THREE.Vector3(-0.4, -0.8, 0.1));
    }

    return points;
}

