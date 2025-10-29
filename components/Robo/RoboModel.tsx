"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { SectionName } from "@/hooks/useScrollProgress";
import { roboPositions } from "@/constants/animations";

interface RoboModelProps {
  currentSection: SectionName;
  sectionProgress: number;
  cursorPosition: { normalizedX: number; normalizedY: number };
  onWave?: () => void;
  scale?: number;
}

export const RoboModel: React.FC<RoboModelProps> = ({
  currentSection,
  sectionProgress,
  cursorPosition,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Object3D | null>(null);
  const [targetPosition, setTargetPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );
  const [targetScale, setTargetScale] = useState(1);

  // Load the robot model
  const { scene } = useGLTF("/models/robot.glb");

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();

  useEffect(() => {
    // Find the head bone/object if it exists
    clonedScene.traverse((child) => {
      if (child.name.toLowerCase().includes("head")) {
        headRef.current = child;
      }
    });
  }, [clonedScene]);

  // Update target position based on current section
  useEffect(() => {
    const pos = roboPositions[currentSection];
    setTargetPosition(new THREE.Vector3(pos.x, pos.y, pos.z));
    setTargetScale(pos.scale * scale);
  }, [currentSection, scale]);

  // Animation loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth position transition
    groupRef.current.position.lerp(targetPosition, delta * 2);

    // Smooth scale transition
    const currentScale = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 2);
    groupRef.current.scale.set(newScale, newScale, newScale);

    // Idle breathing animation
    const breathingOffset = Math.sin(state.clock.elapsedTime * 2) * 0.03;
    groupRef.current.position.y += breathingOffset;

    // Gentle rotation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

    // Head follows cursor
    if (headRef.current) {
      const targetRotationY = cursorPosition.normalizedX * 0.3;
      const targetRotationX = -cursorPosition.normalizedY * 0.2;

      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        delta * 3
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        delta * 3
      );
    }

    // Section-specific animations
    switch (currentSection) {
      case "hero":
        // Wave animation on hero
        if (sectionProgress < 0.3) {
          const waveIntensity = Math.sin(state.clock.elapsedTime * 3) * 0.5;
          groupRef.current.rotation.z = waveIntensity * 0.2;
        }
        break;

      case "skills":
        // Power-up glow effect in skills section
        clonedScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material && "emissive" in mesh.material) {
              const material = mesh.material as THREE.MeshStandardMaterial;
              const glowIntensity =
                0.5 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
              material.emissiveIntensity = glowIntensity * sectionProgress;
            }
          }
        });
        break;

      case "projects":
        // Proud pose - slightly raised
        groupRef.current.rotation.y =
          Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        break;

      case "footer":
        // Sleep animation
        groupRef.current.rotation.x =
          Math.sin(state.clock.elapsedTime) * 0.1 - 0.3;
        break;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
      {/* Additional lighting for the robot */}
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#00d9ff" />
      <pointLight position={[-2, 2, 2]} intensity={0.3} color="#ff00ff" />
    </group>
  );
};

// Preload the model
useGLTF.preload("/models/robot.glb");
