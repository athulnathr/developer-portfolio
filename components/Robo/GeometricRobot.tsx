"use client";

import { useRef } from "react";
import * as THREE from "three";

interface GeometricRobotProps {
  headRef?: React.MutableRefObject<THREE.Object3D | null>;
  leftArmRef?: React.MutableRefObject<THREE.Object3D | null>;
  rightArmRef?: React.MutableRefObject<THREE.Object3D | null>;
  bodyRef?: React.MutableRefObject<THREE.Object3D | null>;
}

/**
 * Fallback geometric robot made of primitives
 * Used when GLB model is not available
 */
export const GeometricRobot: React.FC<GeometricRobotProps> = ({
  headRef,
  leftArmRef,
  rightArmRef,
  bodyRef,
}) => {
  const internalHeadRef = useRef<THREE.Group>(null);
  const internalLeftArmRef = useRef<THREE.Group>(null);
  const internalRightArmRef = useRef<THREE.Group>(null);
  const internalBodyRef = useRef<THREE.Group>(null);

  return (
    <group>
      {/* Body */}
      <group ref={bodyRef || internalBodyRef} position={[0, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 1, 0.5]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Head */}
      <group ref={headRef || internalHeadRef} position={[0, 0.8, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.15, 0.1, 0.26]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
        <mesh position={[0.15, 0.1, 0.26]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#ff00ff" />
        </mesh>
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef || internalLeftArmRef} position={[-0.5, 0.3, 0]}>
        {/* Upper arm */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={0.2}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Hand */}
        <mesh position={[0, -0.6, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#00d9ff"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef || internalRightArmRef} position={[0.5, 0.3, 0]}>
        {/* Upper arm */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={0.2}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Hand */}
        <mesh position={[0, -0.6, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#00d9ff"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Left Leg */}
      <group position={[-0.25, -0.8, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
          <meshStandardMaterial
            color="#00d9ff"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Foot */}
        <mesh position={[0, -0.35, 0.1]}>
          <boxGeometry args={[0.2, 0.1, 0.3]} />
          <meshStandardMaterial
            color="#00d9ff"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.25, -0.8, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
          <meshStandardMaterial
            color="#00d9ff"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Foot */}
        <mesh position={[0, -0.35, 0.1]}>
          <boxGeometry args={[0.2, 0.1, 0.3]} />
          <meshStandardMaterial
            color="#00d9ff"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Chest glow */}
      <mesh position={[0, 0.2, 0.26]}>
        <circleGeometry args={[0.15, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
