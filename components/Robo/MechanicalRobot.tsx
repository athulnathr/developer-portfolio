"use client";

import { useRef } from "react";
import * as THREE from "three";

interface MechanicalRobotProps {
  headRef?: React.MutableRefObject<THREE.Object3D | null>;
  torsoRef?: React.MutableRefObject<THREE.Object3D | null>;
  waistRef?: React.MutableRefObject<THREE.Object3D | null>;
  leftArmRef?: React.MutableRefObject<THREE.Object3D | null>;
  rightArmRef?: React.MutableRefObject<THREE.Object3D | null>;
  leftElbowRef?: React.MutableRefObject<THREE.Object3D | null>;
  rightElbowRef?: React.MutableRefObject<THREE.Object3D | null>;
  leftHandRef?: React.MutableRefObject<THREE.Object3D | null>;
  rightHandRef?: React.MutableRefObject<THREE.Object3D | null>;
  bodyRef?: React.MutableRefObject<THREE.Object3D | null>;
  leftLegRef?: React.MutableRefObject<THREE.Group | null>;
  rightLegRef?: React.MutableRefObject<THREE.Group | null>;
  leftKneeRef?: React.MutableRefObject<THREE.Group | null>;
  rightKneeRef?: React.MutableRefObject<THREE.Group | null>;
}

/**
 * Industrial mechanical robot with enhanced articulation
 * Features: torso rotation, waist pivot, elbow joints, articulated fingers
 * Visual style: Dark metals, exposed joints, industrial panels
 */
export const MechanicalRobot: React.FC<MechanicalRobotProps> = ({
  headRef,
  torsoRef,
  waistRef,
  leftArmRef,
  rightArmRef,
  leftElbowRef,
  rightElbowRef,
  leftHandRef,
  rightHandRef,
  bodyRef,
  leftLegRef,
  rightLegRef,
  leftKneeRef,
  rightKneeRef,
}) => {
  // Internal refs for parts that don't need external control
  const internalHeadRef = useRef<THREE.Group>(null);
  const internalTorsoRef = useRef<THREE.Group>(null);
  const internalWaistRef = useRef<THREE.Group>(null);
  const internalLeftArmRef = useRef<THREE.Group>(null);
  const internalRightArmRef = useRef<THREE.Group>(null);
  const internalLeftElbowRef = useRef<THREE.Group>(null);
  const internalRightElbowRef = useRef<THREE.Group>(null);
  const internalLeftHandRef = useRef<THREE.Group>(null);
  const internalRightHandRef = useRef<THREE.Group>(null);
  const internalBodyRef = useRef<THREE.Group>(null);
  const internalLeftLegRef = useRef<THREE.Group>(null);
  const internalRightLegRef = useRef<THREE.Group>(null);
  const internalLeftKneeRef = useRef<THREE.Group>(null);
  const internalRightKneeRef = useRef<THREE.Group>(null);

  // Industrial material definitions
  const bodyMaterial = (
    <meshStandardMaterial
      color="#3a3a3a"
      emissive="#1a1a1a"
      emissiveIntensity={0.1}
      metalness={0.95}
      roughness={0.5}
    />
  );

  const darkMetalMaterial = (
    <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.6} />
  );

  const panelMaterial = (
    <meshStandardMaterial color="#4a4a4a" metalness={0.85} roughness={0.4} />
  );

  const jointMaterial = (
    <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.7} />
  );

  const warningGlowMaterial = (
    <meshBasicMaterial color="#ff6600" transparent opacity={0.8} />
  );

  return (
    <group>
      {/* Waist/Pelvis Base */}
      <group ref={waistRef || internalWaistRef} position={[0, -0.6, 0]}>
        {/* Pelvis box - heavy industrial base */}
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.3, 0.45]} />
          {bodyMaterial}
        </mesh>

        {/* Hip connection plates */}
        <mesh position={[-0.25, -0.05, 0]} castShadow>
          <boxGeometry args={[0.15, 0.2, 0.35]} />
          {panelMaterial}
        </mesh>
        <mesh position={[0.25, -0.05, 0]} castShadow>
          <boxGeometry args={[0.15, 0.2, 0.35]} />
          {panelMaterial}
        </mesh>

        {/* Panel rivets */}
        <mesh position={[-0.28, 0, 0.24]}>
          <cylinderGeometry args={[0.02, 0.02, 0.02, 8]} />
          {darkMetalMaterial}
        </mesh>
        <mesh position={[0.28, 0, 0.24]}>
          <cylinderGeometry args={[0.02, 0.02, 0.02, 8]} />
          {darkMetalMaterial}
        </mesh>
      </group>

      {/* Torso - articulated */}
      <group ref={torsoRef || internalTorsoRef} position={[0, 0, 0]}>
        {/* Body reference group */}
        <group ref={bodyRef || internalBodyRef}>
          {/* Main chest box - angular industrial */}
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.9, 0.5]} />
            {bodyMaterial}
          </mesh>

          {/* Chest panel with details */}
          <mesh position={[0, 0.1, 0.26]} castShadow>
            <boxGeometry args={[0.6, 0.6, 0.05]} />
            {panelMaterial}
          </mesh>

          {/* Central power core chamber */}
          <mesh position={[0, 0.1, 0.28]}>
            <boxGeometry args={[0.2, 0.25, 0.03]} />
            {darkMetalMaterial}
          </mesh>

          {/* Power core glow - industrial amber */}
          <mesh position={[0, 0.1, 0.3]}>
            <circleGeometry args={[0.08, 32]} />
            {warningGlowMaterial}
          </mesh>

          {/* Vent grilles on sides */}
          {[...Array(4)].map((_, i) => (
            <mesh
              key={`vent-left-${i}`}
              position={[-0.35, 0.2 - i * 0.12, 0.23]}
            >
              <boxGeometry args={[0.08, 0.03, 0.02]} />
              {darkMetalMaterial}
            </mesh>
          ))}
          {[...Array(4)].map((_, i) => (
            <mesh
              key={`vent-right-${i}`}
              position={[0.35, 0.2 - i * 0.12, 0.23]}
            >
              <boxGeometry args={[0.08, 0.03, 0.02]} />
              {darkMetalMaterial}
            </mesh>
          ))}

          {/* Shoulder mounting plates - angular */}
          <mesh
            position={[-0.5, 0.35, 0]}
            rotation={[0, 0, Math.PI / 6]}
            castShadow
          >
            <boxGeometry args={[0.25, 0.2, 0.35]} />
            {bodyMaterial}
          </mesh>
          <mesh
            position={[0.5, 0.35, 0]}
            rotation={[0, 0, -Math.PI / 6]}
            castShadow
          >
            <boxGeometry args={[0.25, 0.2, 0.35]} />
            {bodyMaterial}
          </mesh>

          {/* Panel separation lines */}
          <mesh position={[0, 0.45, 0.26]}>
            <boxGeometry args={[0.65, 0.02, 0.06]} />
            {darkMetalMaterial}
          </mesh>
          <mesh position={[0, -0.3, 0.26]}>
            <boxGeometry args={[0.65, 0.02, 0.06]} />
            {darkMetalMaterial}
          </mesh>
        </group>

        {/* Head - Industrial angular design */}
        <group ref={headRef || internalHeadRef} position={[0, 0.8, 0]}>
          {/* Main head box - angular */}
          <mesh castShadow>
            <boxGeometry args={[0.45, 0.4, 0.4]} />
            {bodyMaterial}
          </mesh>

          {/* Top panel */}
          <mesh position={[0, 0.21, 0]} castShadow>
            <boxGeometry args={[0.4, 0.02, 0.35]} />
            {panelMaterial}
          </mesh>

          {/* Industrial visor - dark tinted */}
          <mesh position={[0, 0.05, 0.21]} castShadow>
            <boxGeometry args={[0.38, 0.12, 0.05]} />
            <meshStandardMaterial
              color="#0a0a0a"
              metalness={0.95}
              roughness={0.1}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Eye sensors - amber glow */}
          <mesh position={[-0.12, 0.05, 0.23]}>
            <boxGeometry args={[0.08, 0.06, 0.02]} />
            {warningGlowMaterial}
          </mesh>
          <mesh position={[0.12, 0.05, 0.23]}>
            <boxGeometry args={[0.08, 0.06, 0.02]} />
            {warningGlowMaterial}
          </mesh>

          {/* Antenna array */}
          <mesh position={[-0.15, 0.25, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.2, 6]} />
            {darkMetalMaterial}
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.25, 6]} />
            {darkMetalMaterial}
          </mesh>
          <mesh position={[0.15, 0.25, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.2, 6]} />
            {darkMetalMaterial}
          </mesh>

          {/* Antenna tips - warning lights */}
          <mesh position={[-0.15, 0.35, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#ff6600" />
          </mesh>
          <mesh position={[0, 0.375, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#ff6600" />
          </mesh>
          <mesh position={[0.15, 0.35, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#ff6600" />
          </mesh>

          {/* Side panels with rivets */}
          <mesh position={[-0.23, 0, 0.15]}>
            <boxGeometry args={[0.03, 0.25, 0.2]} />
            {panelMaterial}
          </mesh>
          <mesh position={[0.23, 0, 0.15]}>
            <boxGeometry args={[0.03, 0.25, 0.2]} />
            {panelMaterial}
          </mesh>

          {/* Rivets on head panels */}
          {[-1, 1].map((side) => (
            <group key={`head-rivets-${side}`}>
              <mesh position={[side * 0.23, 0.08, 0.2]}>
                <cylinderGeometry args={[0.015, 0.015, 0.01, 6]} />
                {darkMetalMaterial}
              </mesh>
              <mesh position={[side * 0.23, -0.08, 0.2]}>
                <cylinderGeometry args={[0.015, 0.015, 0.01, 6]} />
                {darkMetalMaterial}
              </mesh>
            </group>
          ))}
        </group>

        {/* Left Arm with Elbow Joint */}
        <group
          ref={leftArmRef || internalLeftArmRef}
          position={[-0.65, 0.3, 0]}
        >
          {/* Shoulder joint - exposed mechanical */}
          <mesh castShadow>
            <sphereGeometry args={[0.13, 12, 12]} />
            {jointMaterial}
          </mesh>

          {/* Shoulder piston detail */}
          <mesh position={[0, -0.1, 0.1]} rotation={[Math.PI / 4, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
            {darkMetalMaterial}
          </mesh>

          {/* Upper arm - heavy industrial */}
          <mesh position={[0, -0.25, 0]} castShadow>
            <boxGeometry args={[0.15, 0.5, 0.15]} />
            {bodyMaterial}
          </mesh>

          {/* Upper arm armor panel */}
          <mesh position={[0, -0.25, 0.08]} castShadow>
            <boxGeometry args={[0.12, 0.45, 0.02]} />
            {panelMaterial}
          </mesh>

          {/* Warning stripe on arm */}
          <mesh position={[-0.06, -0.15, 0.09]}>
            <boxGeometry args={[0.03, 0.1, 0.01]} />
            <meshBasicMaterial color="#ff6600" />
          </mesh>

          {/* Elbow joint group */}
          <group
            ref={leftElbowRef || internalLeftElbowRef}
            position={[0, -0.5, 0]}
          >
            {/* Elbow joint - visible mechanics */}
            <mesh castShadow>
              <sphereGeometry args={[0.11, 12, 12]} />
              {jointMaterial}
            </mesh>

            {/* Elbow piston */}
            <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
              {darkMetalMaterial}
            </mesh>

            {/* Forearm - tapered industrial */}
            <mesh position={[0, -0.22, 0]} castShadow>
              <boxGeometry args={[0.13, 0.44, 0.13]} />
              {bodyMaterial}
            </mesh>

            {/* Forearm panel */}
            <mesh position={[0, -0.22, 0.07]} castShadow>
              <boxGeometry args={[0.11, 0.4, 0.02]} />
              {panelMaterial}
            </mesh>

            {/* Hand group */}
            <group
              ref={leftHandRef || internalLeftHandRef}
              position={[0, -0.44, 0]}
            >
              {/* Palm - industrial block */}
              <mesh castShadow>
                <boxGeometry args={[0.13, 0.15, 0.1]} />
                {bodyMaterial}
              </mesh>

              {/* Mechanical fingers - 4 digits with 2 segments each */}
              {/* Thumb */}
              <group
                position={[-0.08, -0.05, 0.02]}
                rotation={[0, 0, -Math.PI / 6]}
              >
                <mesh position={[0, -0.06, 0]} castShadow>
                  <boxGeometry args={[0.03, 0.08, 0.03]} />
                  {bodyMaterial}
                </mesh>
                <mesh position={[0, -0.11, 0]} castShadow>
                  <boxGeometry args={[0.025, 0.06, 0.025]} />
                  {darkMetalMaterial}
                </mesh>
              </group>

              {/* Index finger */}
              <group position={[-0.045, -0.08, 0.06]}>
                <mesh position={[0, -0.06, 0]} castShadow>
                  <boxGeometry args={[0.025, 0.09, 0.025]} />
                  {bodyMaterial}
                </mesh>
                <mesh position={[0, -0.12, 0]} castShadow>
                  <boxGeometry args={[0.022, 0.07, 0.022]} />
                  {darkMetalMaterial}
                </mesh>
              </group>

              {/* Middle finger */}
              <group position={[0, -0.08, 0.06]}>
                <mesh position={[0, -0.07, 0]} castShadow>
                  <boxGeometry args={[0.025, 0.1, 0.025]} />
                  {bodyMaterial}
                </mesh>
                <mesh position={[0, -0.13, 0]} castShadow>
                  <boxGeometry args={[0.022, 0.07, 0.022]} />
                  {darkMetalMaterial}
                </mesh>
              </group>

              {/* Ring finger */}
              <group position={[0.045, -0.08, 0.05]}>
                <mesh position={[0, -0.06, 0]} castShadow>
                  <boxGeometry args={[0.025, 0.09, 0.025]} />
                  {bodyMaterial}
                </mesh>
                <mesh position={[0, -0.11, 0]} castShadow>
                  <boxGeometry args={[0.022, 0.06, 0.022]} />
                  {darkMetalMaterial}
                </mesh>
              </group>

              {/* Hand warning light */}
              <mesh position={[0, -0.05, 0.06]}>
                <circleGeometry args={[0.02, 16]} />
                {warningGlowMaterial}
              </mesh>
            </group>
          </group>
        </group>

        {/* Right Arm with Elbow Joint - Mirror of left */}
        <group
          ref={rightArmRef || internalRightArmRef}
          position={[0.65, 0.3, 0]}
        >
          {/* Shoulder joint */}
          <mesh castShadow>
            <sphereGeometry args={[0.13, 12, 12]} />
            {jointMaterial}
          </mesh>

          <mesh position={[0, -0.1, 0.1]} rotation={[Math.PI / 4, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
            {darkMetalMaterial}
          </mesh>

          <mesh position={[0, -0.25, 0]} castShadow>
            <boxGeometry args={[0.15, 0.5, 0.15]} />
            {bodyMaterial}
          </mesh>

          <mesh position={[0, -0.25, 0.08]} castShadow>
            <boxGeometry args={[0.12, 0.45, 0.02]} />
            {panelMaterial}
          </mesh>

          <mesh position={[0.06, -0.15, 0.09]}>
            <boxGeometry args={[0.03, 0.1, 0.01]} />
            <meshBasicMaterial color="#ff6600" />
          </mesh>

          {/* Elbow joint group */}
          <group
            ref={rightElbowRef || internalRightElbowRef}
            position={[0, -0.5, 0]}
          >
            <mesh castShadow>
              <sphereGeometry args={[0.11, 12, 12]} />
              {jointMaterial}
            </mesh>

            <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
              {darkMetalMaterial}
            </mesh>

            <mesh position={[0, -0.22, 0]} castShadow>
              <boxGeometry args={[0.13, 0.44, 0.13]} />
              {bodyMaterial}
            </mesh>

            <mesh position={[0, -0.22, 0.07]} castShadow>
              <boxGeometry args={[0.11, 0.4, 0.02]} />
              {panelMaterial}
            </mesh>

            {/* Hand group */}
            <group
              ref={rightHandRef || internalRightHandRef}
              position={[0, -0.44, 0]}
            >
              <mesh castShadow>
                <boxGeometry args={[0.13, 0.15, 0.1]} />
                {bodyMaterial}
              </mesh>

              {/* Thumb */}
              <group
                position={[0.08, -0.05, 0.02]}
                rotation={[0, 0, Math.PI / 6]}
              >
                <mesh position={[0, -0.06, 0]} castShadow>
                  <boxGeometry args={[0.03, 0.08, 0.03]} />
                  {bodyMaterial}
                </mesh>
                <mesh position={[0, -0.11, 0]} castShadow>
                  <boxGeometry args={[0.025, 0.06, 0.025]} />
                  {darkMetalMaterial}
                </mesh>
              </group>

              {/* Index finger */}
              <group position={[0.045, -0.08, 0.06]}>
                <mesh position={[0, -0.06, 0]} castShadow>
                  <boxGeometry args={[0.025, 0.09, 0.025]} />
                  {bodyMaterial}
                </mesh>
                <mesh position={[0, -0.12, 0]} castShadow>
                  <boxGeometry args={[0.022, 0.07, 0.022]} />
                  {darkMetalMaterial}
                </mesh>
              </group>

              {/* Middle finger */}
              <group position={[0, -0.08, 0.06]}>
                <mesh position={[0, -0.07, 0]} castShadow>
                  <boxGeometry args={[0.025, 0.1, 0.025]} />
                  {bodyMaterial}
                </mesh>
                <mesh position={[0, -0.13, 0]} castShadow>
                  <boxGeometry args={[0.022, 0.07, 0.022]} />
                  {darkMetalMaterial}
                </mesh>
              </group>

              {/* Ring finger */}
              <group position={[-0.045, -0.08, 0.05]}>
                <mesh position={[0, -0.06, 0]} castShadow>
                  <boxGeometry args={[0.025, 0.09, 0.025]} />
                  {bodyMaterial}
                </mesh>
                <mesh position={[0, -0.11, 0]} castShadow>
                  <boxGeometry args={[0.022, 0.06, 0.022]} />
                  {darkMetalMaterial}
                </mesh>
              </group>

              <mesh position={[0, -0.05, 0.06]}>
                <circleGeometry args={[0.02, 16]} />
                {warningGlowMaterial}
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* Left Leg - Heavy industrial design */}
      <group ref={leftLegRef || internalLeftLegRef} position={[-0.25, -0.7, 0]}>
        {/* Hip joint - exposed mechanical */}
        <mesh castShadow>
          <sphereGeometry args={[0.14, 12, 12]} />
          {jointMaterial}
        </mesh>

        {/* Hip piston */}
        <mesh position={[0, -0.12, 0.1]} rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.18, 8]} />
          {darkMetalMaterial}
        </mesh>

        {/* Thigh - heavy industrial box */}
        <mesh position={[0, -0.28, 0]} castShadow>
          <boxGeometry args={[0.18, 0.55, 0.18]} />
          {bodyMaterial}
        </mesh>

        {/* Thigh armor plate */}
        <mesh position={[0, -0.25, 0.1]} castShadow>
          <boxGeometry args={[0.16, 0.45, 0.03]} />
          {panelMaterial}
        </mesh>

        {/* Warning stripe on thigh */}
        <mesh position={[-0.07, -0.15, 0.11]}>
          <boxGeometry args={[0.03, 0.15, 0.01]} />
          <meshBasicMaterial color="#ff6600" />
        </mesh>
        <mesh position={[0.07, -0.15, 0.11]}>
          <boxGeometry args={[0.03, 0.15, 0.01]} />
          <meshBasicMaterial color="#ff6600" />
        </mesh>

        {/* Knee joint group */}
        <group
          ref={leftKneeRef || internalLeftKneeRef}
          position={[0, -0.55, 0]}
        >
          {/* Knee joint - exposed mechanics */}
          <mesh castShadow>
            <sphereGeometry args={[0.13, 12, 12]} />
            {jointMaterial}
          </mesh>

          {/* Knee piston array */}
          <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
            {darkMetalMaterial}
          </mesh>
          <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
            {darkMetalMaterial}
          </mesh>

          {/* Shin - angular industrial */}
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[0.16, 0.6, 0.16]} />
            {bodyMaterial}
          </mesh>

          {/* Shin guard - heavy armor */}
          <mesh position={[0, -0.28, 0.09]} castShadow>
            <boxGeometry args={[0.15, 0.52, 0.03]} />
            {panelMaterial}
          </mesh>

          {/* Shin mechanical details */}
          {[...Array(3)].map((_, i) => (
            <mesh
              key={`shin-detail-${i}`}
              position={[0, -0.15 - i * 0.15, 0.1]}
            >
              <boxGeometry args={[0.12, 0.02, 0.01]} />
              {darkMetalMaterial}
            </mesh>
          ))}

          {/* Ankle joint */}
          <mesh position={[0, -0.6, 0]} castShadow>
            <sphereGeometry args={[0.11, 12, 12]} />
            {jointMaterial}
          </mesh>

          {/* Foot - heavy industrial boot */}
          <mesh position={[0, -0.7, 0.14]} castShadow>
            <boxGeometry args={[0.2, 0.14, 0.4]} />
            {bodyMaterial}
          </mesh>

          {/* Foot toe cap */}
          <mesh position={[0, -0.7, 0.35]} castShadow>
            <boxGeometry args={[0.18, 0.12, 0.05]} />
            {panelMaterial}
          </mesh>

          {/* Foot warning light */}
          <mesh position={[0, -0.64, 0.34]}>
            <circleGeometry args={[0.025, 16]} />
            {warningGlowMaterial}
          </mesh>

          {/* Foot tread details */}
          <mesh position={[0, -0.77, 0.2]}>
            <boxGeometry args={[0.18, 0.02, 0.35]} />
            {darkMetalMaterial}
          </mesh>
        </group>
      </group>

      {/* Right Leg - Mirror of left */}
      <group
        ref={rightLegRef || internalRightLegRef}
        position={[0.25, -0.7, 0]}
      >
        <mesh castShadow>
          <sphereGeometry args={[0.14, 12, 12]} />
          {jointMaterial}
        </mesh>

        <mesh position={[0, -0.12, 0.1]} rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.18, 8]} />
          {darkMetalMaterial}
        </mesh>

        <mesh position={[0, -0.28, 0]} castShadow>
          <boxGeometry args={[0.18, 0.55, 0.18]} />
          {bodyMaterial}
        </mesh>

        <mesh position={[0, -0.25, 0.1]} castShadow>
          <boxGeometry args={[0.16, 0.45, 0.03]} />
          {panelMaterial}
        </mesh>

        <mesh position={[-0.07, -0.15, 0.11]}>
          <boxGeometry args={[0.03, 0.15, 0.01]} />
          <meshBasicMaterial color="#ff6600" />
        </mesh>
        <mesh position={[0.07, -0.15, 0.11]}>
          <boxGeometry args={[0.03, 0.15, 0.01]} />
          <meshBasicMaterial color="#ff6600" />
        </mesh>

        {/* Knee joint group */}
        <group
          ref={rightKneeRef || internalRightKneeRef}
          position={[0, -0.55, 0]}
        >
          <mesh castShadow>
            <sphereGeometry args={[0.13, 12, 12]} />
            {jointMaterial}
          </mesh>

          <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
            {darkMetalMaterial}
          </mesh>
          <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
            {darkMetalMaterial}
          </mesh>

          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[0.16, 0.6, 0.16]} />
            {bodyMaterial}
          </mesh>

          <mesh position={[0, -0.28, 0.09]} castShadow>
            <boxGeometry args={[0.15, 0.52, 0.03]} />
            {panelMaterial}
          </mesh>

          {[...Array(3)].map((_, i) => (
            <mesh
              key={`shin-detail-${i}`}
              position={[0, -0.15 - i * 0.15, 0.1]}
            >
              <boxGeometry args={[0.12, 0.02, 0.01]} />
              {darkMetalMaterial}
            </mesh>
          ))}

          <mesh position={[0, -0.6, 0]} castShadow>
            <sphereGeometry args={[0.11, 12, 12]} />
            {jointMaterial}
          </mesh>

          <mesh position={[0, -0.7, 0.14]} castShadow>
            <boxGeometry args={[0.2, 0.14, 0.4]} />
            {bodyMaterial}
          </mesh>

          <mesh position={[0, -0.7, 0.35]} castShadow>
            <boxGeometry args={[0.18, 0.12, 0.05]} />
            {panelMaterial}
          </mesh>

          <mesh position={[0, -0.64, 0.34]}>
            <circleGeometry args={[0.025, 16]} />
            {warningGlowMaterial}
          </mesh>

          <mesh position={[0, -0.77, 0.2]}>
            <boxGeometry args={[0.18, 0.02, 0.35]} />
            {darkMetalMaterial}
          </mesh>
        </group>
      </group>

      {/* Industrial warning lights */}
      <pointLight
        position={[0, 0.1, 0.4]}
        intensity={0.4}
        color="#ff6600"
        distance={2}
      />
      <pointLight
        position={[0, 0.8, 0.3]}
        intensity={0.3}
        color="#ff6600"
        distance={1.5}
      />
    </group>
  );
};
