"use client";

import { useRef } from "react";
import * as THREE from "three";

interface CuteRobotProps {
  headRef?: React.MutableRefObject<THREE.Object3D | null>;
  leftArmRef?: React.MutableRefObject<THREE.Object3D | null>;
  rightArmRef?: React.MutableRefObject<THREE.Object3D | null>;
  bodyRef?: React.MutableRefObject<THREE.Object3D | null>;
  leftLegRef?: React.MutableRefObject<THREE.Group | null>;
  rightLegRef?: React.MutableRefObject<THREE.Group | null>;
  leftKneeRef?: React.MutableRefObject<THREE.Group | null>;
  rightKneeRef?: React.MutableRefObject<THREE.Group | null>;
}

/**
 * Custom three.js robot with cute but powerful design
 * Features fully articulated legs for running animations
 */
export const CuteRobot: React.FC<CuteRobotProps> = ({
  headRef,
  leftArmRef,
  rightArmRef,
  bodyRef,
  leftLegRef,
  rightLegRef,
  leftKneeRef,
  rightKneeRef,
}) => {
  const internalHeadRef = useRef<THREE.Group>(null);
  const internalLeftArmRef = useRef<THREE.Group>(null);
  const internalRightArmRef = useRef<THREE.Group>(null);
  const internalBodyRef = useRef<THREE.Group>(null);
  const internalLeftLegRef = useRef<THREE.Group>(null);
  const internalRightLegRef = useRef<THREE.Group>(null);
  const internalLeftKneeRef = useRef<THREE.Group>(null);
  const internalRightKneeRef = useRef<THREE.Group>(null);

  // Material definitions
  const bodyMaterial = (
    <meshStandardMaterial
      color="#00d9ff"
      emissive="#00d9ff"
      emissiveIntensity={0.3}
      metalness={0.9}
      roughness={0.2}
    />
  );

  const accentMaterial = (
    <meshStandardMaterial
      color="#ff00ff"
      emissive="#ff00ff"
      emissiveIntensity={0.5}
      metalness={0.8}
      roughness={0.3}
    />
  );

  const glowMaterial = (
    <meshBasicMaterial color="#00ffff" transparent opacity={0.9} />
  );

  return (
    <group>
      {/* Body - rounded capsule with angular chest panel */}
      <group ref={bodyRef || internalBodyRef} position={[0, 0, 0]}>
        {/* Main body - rounded */}
        <mesh castShadow>
          <capsuleGeometry args={[0.35, 0.8, 16, 32]} />
          {bodyMaterial}
        </mesh>

        {/* Chest panel - angular detail */}
        <mesh position={[0, 0.1, 0.36]} castShadow>
          <boxGeometry args={[0.4, 0.5, 0.05]} />
          <meshStandardMaterial
            color="#004d66"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* Chest core glow */}
        <mesh position={[0, 0.1, 0.39]}>
          <circleGeometry args={[0.12, 32]} />
          {glowMaterial}
        </mesh>

        {/* Shoulder plates - angular */}
        <mesh
          position={[-0.5, 0.35, 0]}
          rotation={[0, 0, Math.PI / 8]}
          castShadow
        >
          <boxGeometry args={[0.2, 0.15, 0.3]} />
          {bodyMaterial}
        </mesh>
        <mesh
          position={[0.5, 0.35, 0]}
          rotation={[0, 0, -Math.PI / 8]}
          castShadow
        >
          <boxGeometry args={[0.2, 0.15, 0.3]} />
          {bodyMaterial}
        </mesh>
      </group>

      {/* Head - sphere with angular visor */}
      <group ref={headRef || internalHeadRef} position={[0, 0.85, 0]}>
        {/* Main head sphere */}
        <mesh castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          {bodyMaterial}
        </mesh>

        {/* Angular visor */}
        <mesh position={[0, 0.05, 0.28]} rotation={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.45, 0.15, 0.08]} />
          <meshStandardMaterial
            color="#001a26"
            metalness={0.95}
            roughness={0.05}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Eyes - glowing */}
        <mesh position={[-0.12, 0.08, 0.29]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          {glowMaterial}
        </mesh>
        <mesh position={[0.12, 0.08, 0.29]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          {glowMaterial}
        </mesh>

        {/* Antenna - angular with orb */}
        <mesh position={[0, 0.32, 0]} castShadow>
          <boxGeometry args={[0.03, 0.25, 0.03]} />
          {accentMaterial}
        </mesh>
        <mesh position={[0, 0.48, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ff00ff" />
        </mesh>

        {/* Head decorative panels */}
        <mesh position={[-0.2, 0, 0.25]} rotation={[0, -0.3, 0]}>
          <boxGeometry args={[0.1, 0.08, 0.02]} />
          {accentMaterial}
        </mesh>
        <mesh position={[0.2, 0, 0.25]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.1, 0.08, 0.02]} />
          {accentMaterial}
        </mesh>
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef || internalLeftArmRef} position={[-0.6, 0.3, 0]}>
        {/* Shoulder joint - sphere */}
        <mesh castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Upper arm - cylinder */}
        <mesh position={[0, -0.25, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.08, 0.5, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Elbow joint */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Forearm - slightly tapered */}
        <mesh position={[0, -0.7, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.09, 0.4, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Hand - rounded with details */}
        <mesh position={[0, -0.95, 0]} castShadow>
          <sphereGeometry args={[0.11, 16, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Hand glow accent */}
        <mesh position={[0, -0.95, 0.11]}>
          <circleGeometry args={[0.06, 16]} />
          {glowMaterial}
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef || internalRightArmRef} position={[0.6, 0.3, 0]}>
        {/* Shoulder joint - sphere */}
        <mesh castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Upper arm - cylinder */}
        <mesh position={[0, -0.25, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.08, 0.5, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Elbow joint */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Forearm - slightly tapered */}
        <mesh position={[0, -0.7, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.09, 0.4, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Hand - rounded with details */}
        <mesh position={[0, -0.95, 0]} castShadow>
          <sphereGeometry args={[0.11, 16, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Hand glow accent */}
        <mesh position={[0, -0.95, 0.11]}>
          <circleGeometry args={[0.06, 16]} />
          {glowMaterial}
        </mesh>
      </group>

      {/* Left Leg - Fully articulated */}
      <group ref={leftLegRef || internalLeftLegRef} position={[-0.22, -0.5, 0]}>
        {/* Hip joint */}
        <mesh castShadow>
          <sphereGeometry args={[0.13, 16, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Thigh - rounded cylinder */}
        <mesh position={[0, -0.25, 0]} castShadow>
          <cylinderGeometry args={[0.11, 0.1, 0.5, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Thigh armor - angular detail */}
        <mesh position={[0, -0.2, 0.11]} castShadow>
          <boxGeometry args={[0.15, 0.3, 0.08]} />
          <meshStandardMaterial
            color="#004d66"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Knee joint group */}
        <group ref={leftKneeRef || internalLeftKneeRef} position={[0, -0.5, 0]}>
          {/* Knee sphere */}
          <mesh castShadow>
            <sphereGeometry args={[0.12, 16, 16]} />
            {bodyMaterial}
          </mesh>

          {/* Shin - tapered cylinder */}
          <mesh position={[0, -0.27, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.11, 0.54, 16]} />
            {bodyMaterial}
          </mesh>

          {/* Shin guard - angular */}
          <mesh position={[0, -0.25, 0.1]} castShadow>
            <boxGeometry args={[0.14, 0.4, 0.08]} />
            <meshStandardMaterial
              color="#004d66"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* Ankle */}
          <mesh position={[0, -0.54, 0]} castShadow>
            <sphereGeometry args={[0.1, 16, 16]} />
            {bodyMaterial}
          </mesh>

          {/* Foot - angular and powerful */}
          <mesh position={[0, -0.64, 0.12]} castShadow>
            <boxGeometry args={[0.18, 0.12, 0.35]} />
            {bodyMaterial}
          </mesh>

          {/* Foot accent glow */}
          <mesh position={[0, -0.58, 0.29]}>
            <circleGeometry args={[0.05, 16]} />
            {glowMaterial}
          </mesh>
        </group>
      </group>

      {/* Right Leg - Fully articulated */}
      <group
        ref={rightLegRef || internalRightLegRef}
        position={[0.22, -0.5, 0]}
      >
        {/* Hip joint */}
        <mesh castShadow>
          <sphereGeometry args={[0.13, 16, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Thigh - rounded cylinder */}
        <mesh position={[0, -0.25, 0]} castShadow>
          <cylinderGeometry args={[0.11, 0.1, 0.5, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Thigh armor - angular detail */}
        <mesh position={[0, -0.2, 0.11]} castShadow>
          <boxGeometry args={[0.15, 0.3, 0.08]} />
          <meshStandardMaterial
            color="#004d66"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Knee joint group */}
        <group
          ref={rightKneeRef || internalRightKneeRef}
          position={[0, -0.5, 0]}
        >
          {/* Knee sphere */}
          <mesh castShadow>
            <sphereGeometry args={[0.12, 16, 16]} />
            {bodyMaterial}
          </mesh>

          {/* Shin - tapered cylinder */}
          <mesh position={[0, -0.27, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.11, 0.54, 16]} />
            {bodyMaterial}
          </mesh>

          {/* Shin guard - angular */}
          <mesh position={[0, -0.25, 0.1]} castShadow>
            <boxGeometry args={[0.14, 0.4, 0.08]} />
            <meshStandardMaterial
              color="#004d66"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* Ankle */}
          <mesh position={[0, -0.54, 0]} castShadow>
            <sphereGeometry args={[0.1, 16, 16]} />
            {bodyMaterial}
          </mesh>

          {/* Foot - angular and powerful */}
          <mesh position={[0, -0.64, 0.12]} castShadow>
            <boxGeometry args={[0.18, 0.12, 0.35]} />
            {bodyMaterial}
          </mesh>

          {/* Foot accent glow */}
          <mesh position={[0, -0.58, 0.29]}>
            <circleGeometry args={[0.05, 16]} />
            {glowMaterial}
          </mesh>
        </group>
      </group>

      {/* Power Core lights */}
      <pointLight
        position={[0, 0.1, 0.5]}
        intensity={0.3}
        color="#00ffff"
        distance={2}
      />
      <pointLight
        position={[0, 0.85, 0.3]}
        intensity={0.2}
        color="#00ffff"
        distance={1.5}
      />
    </group>
  );
};
