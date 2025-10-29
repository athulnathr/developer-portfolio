"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface HolographicSignProps {
  text: string;
  position?: [number, number, number];
  visible?: boolean;
}

export const HolographicSign: React.FC<HolographicSignProps> = ({
  text,
  position = [0, 1.5, 0],
  visible = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Create holographic effect material
  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00d9ff),
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !visible) return;

    // Floating animation
    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;

    // Gentle rotation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

    // Pulsating glow
    if (glowRef.current) {
      const pulse = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={position}>
      {/* Background panel with glow */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <planeGeometry args={[2, 0.6]} />
        <primitive object={glowMaterial} />
      </mesh>

      {/* Border lines */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(2, 0.6)]} />
        <lineBasicMaterial
          color={0x00d9ff}
          transparent
          opacity={0.8}
          linewidth={2}
        />
      </lineSegments>

      {/* Holographic text */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.25}
        color="#00d9ff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#00ffff"
      >
        {text}
      </Text>

      {/* Scan lines effect */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[0, -0.3 + i * 0.06, 0.02]}>
          <planeGeometry args={[2, 0.01]} />
          <meshBasicMaterial
            color={0x00d9ff}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Corner accents */}
      {[
        [-0.9, 0.25],
        [0.9, 0.25],
        [-0.9, -0.25],
        [0.9, -0.25],
      ].map(([x, y], i) => (
        <mesh key={`corner-${i}`} position={[x, y, 0.03]}>
          <boxGeometry args={[0.1, 0.1, 0.01]} />
          <meshBasicMaterial
            color={0x00ffff}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};
