"use client";

import { useRef } from "react";
import * as THREE from "three";

export const Chair: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={[0, 0, 0]} name="Chair">
      {/* Seat */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 0.9, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.9, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Left armrest */}
      <group position={[-0.45, 0.65, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.5, 0.6]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Right armrest */}
      <group position={[0.45, 0.65, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.5, 0.6]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Front left leg */}
      <mesh position={[-0.3, 0.2, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Front right leg */}
      <mesh position={[0.3, 0.2, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Back left leg */}
      <mesh position={[-0.3, 0.2, -0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Back right leg */}
      <mesh position={[0.3, 0.2, -0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Subtle accent glow on seat edge */}
      <pointLight
        position={[0, 0.4, 0.4]}
        intensity={0.3}
        color="#00d9ff"
        distance={1}
      />
    </group>
  );
};
