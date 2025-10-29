"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { TECH_COLORS } from "@/constants/robotAnimations";

interface TechBadgesProps {
  badges: string[];
  radius?: number;
  speed?: number;
}

export const TechBadges: React.FC<TechBadgesProps> = ({
  badges,
  radius = 2,
  speed = 0.5,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Rotate all badges around the robot
    groupRef.current.rotation.y = state.clock.elapsedTime * speed;
  });

  if (badges.length === 0) return null;

  return (
    <group ref={groupRef}>
      {badges.map((badge, index) => {
        const angle = (index / badges.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(index * 0.5 + angle) * 0.5; // Varying heights

        const color = TECH_COLORS[badge] || "#00d9ff";

        return (
          <group key={`${badge}-${index}`} position={[x, y, z]}>
            {/* Badge background */}
            <mesh>
              <boxGeometry args={[0.4, 0.4, 0.1]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Badge glow */}
            <mesh scale={1.2}>
              <boxGeometry args={[0.4, 0.4, 0.1]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* Badge text */}
            <Text
              position={[0, 0, 0.06]}
              fontSize={0.12}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.35}
            >
              {badge.length > 8 ? badge.substring(0, 6) + "..." : badge}
            </Text>

            {/* Orbiting particle trail */}
            <points>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={10}
                  array={
                    new Float32Array(
                      Array.from({ length: 10 }, (_, i) => [
                        (Math.random() - 0.5) * 0.2,
                        (Math.random() - 0.5) * 0.2,
                        (Math.random() - 0.5) * 0.2,
                      ]).flat()
                    )
                  }
                  itemSize={3}
                />
              </bufferGeometry>
              <pointsMaterial
                size={0.05}
                color={color}
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
              />
            </points>
          </group>
        );
      })}
    </group>
  );
};
