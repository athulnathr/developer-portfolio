"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TechGridProps {
  size?: number;
  divisions?: number;
  color?: string;
  opacity?: number;
}

export const TechGrid: React.FC<TechGridProps> = ({
  size = 20,
  divisions = 20,
  color = "#00d9ff",
  opacity = 0.3,
}) => {
  const gridRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Create grid geometry
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const points: THREE.Vector3[] = [];
    const step = size / divisions;
    const halfSize = size / 2;

    // Horizontal lines
    for (let i = 0; i <= divisions; i++) {
      const y = -halfSize + i * step;
      points.push(new THREE.Vector3(-halfSize, y, 0));
      points.push(new THREE.Vector3(halfSize, y, 0));
    }

    // Vertical lines
    for (let i = 0; i <= divisions; i++) {
      const x = -halfSize + i * step;
      points.push(new THREE.Vector3(x, -halfSize, 0));
      points.push(new THREE.Vector3(x, halfSize, 0));
    }

    geometry.setFromPoints(points);
    return geometry;
  }, [size, divisions]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending,
    });
  }, [color, opacity]);

  // Animate grid
  useFrame((state) => {
    if (!gridRef.current) return;

    // Gentle wave effect
    gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;

    // Fade in/out based on scroll or time
    if (linesRef.current) {
      const pulse = 0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      (linesRef.current.material as THREE.LineBasicMaterial).opacity =
        opacity * pulse;
    }
  });

  return (
    <group ref={gridRef} position={[0, 0, -5]} rotation={[0.5, 0, 0]}>
      <lineSegments ref={linesRef} geometry={geometry} material={material} />

      {/* Add some glowing nodes at intersections */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={divisions * divisions}
            array={
              new Float32Array(
                Array.from({ length: divisions * divisions }, (_, i) => {
                  const x = ((i % divisions) / divisions - 0.5) * size;
                  const y =
                    (Math.floor(i / divisions) / divisions - 0.5) * size;
                  return [x, y, 0];
                }).flat()
              )
            }
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color={color}
          transparent
          opacity={opacity * 0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
