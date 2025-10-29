"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const HeroEnvironment: React.FC = () => {
  const gridRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Animated particles
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;

      // Animate particle positions
      const positions = particlesRef.current.geometry.attributes.position;
      if (positions) {
        for (let i = 0; i < positions.count; i++) {
          const i3 = i * 3;
          const x = positions.array[i3];
          const z = positions.array[i3 + 2];
          positions.array[i3 + 1] = Math.sin(time + x + z) * 0.5;
        }
        positions.needsUpdate = true;
      }
    }

    if (gridRef.current) {
      gridRef.current.rotation.y = time * 0.02;
    }
  });

  // Create particle geometry
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <group>
      {/* Floor Grid */}
      <group ref={gridRef} position={[0, -0.5, 0]}>
        <gridHelper
          args={[20, 40, "#00d9ff", "#151515"]}
          rotation={[0, 0, 0]}
        />
      </group>

      {/* Subtle ambient particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#00d9ff"
          transparent
          opacity={0.3}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Background geometric shapes */}
      <mesh position={[-8, 3, -10]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#151515"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>

      <mesh position={[8, 2, -8]} rotation={[0.3, 0.8, 0]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#00d9ff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      <mesh position={[0, 5, -12]} rotation={[0.5, 0, 0.3]}>
        <torusGeometry args={[2, 0.3, 8, 32]} />
        <meshStandardMaterial
          color="#151515"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Accent rim lights */}
      <pointLight
        position={[-5, 2, 5]}
        intensity={0.5}
        color="#00d9ff"
        distance={10}
      />
      <pointLight
        position={[5, 2, 5]}
        intensity={0.3}
        color="#0088cc"
        distance={10}
      />

      {/* Subtle fill light from below */}
      <pointLight
        position={[0, -2, 0]}
        intensity={0.2}
        color="#00d9ff"
        distance={8}
      />
    </group>
  );
};
