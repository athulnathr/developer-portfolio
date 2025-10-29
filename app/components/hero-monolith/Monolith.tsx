"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  createMonolithGeometry,
  getFracturePoints,
} from "@/app/lib/monolith/geometry";
import { calculateCrackLines } from "@/app/lib/monolith/fracture";
interface MonolithProps {
  crackStage: number;
  onShatter: () => void;
  onCrackProgression: () => void;
  visible: boolean;
  position?: [number, number, number];
  lightPosition: THREE.Vector3;
}

export default function Monolith({
  crackStage,
  onShatter,
  onCrackProgression,
  visible,
  position = [0, 2, 0],
  lightPosition,
}: MonolithProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const crackLinesRef = useRef<THREE.LineSegments[]>([]);

  const geometry = useMemo(() => createMonolithGeometry(), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCrackProgress: { value: 0 },
      uBaseColor: { value: new THREE.Color(0x2a2a3e) },
      uGlowColor: { value: new THREE.Color(0x6366f1) },
      uMetallic: { value: 0.8 },
      uRoughness: { value: 0.3 },
      uLightPosition: { value: lightPosition },
    }),
    [lightPosition]
  );

  // Update crack lines when crack stage changes
  useEffect(() => {
    if (crackStage > 0 && crackStage < 3) {
      const lines = calculateCrackLines(crackStage, geometry);

      // Clear old lines
      crackLinesRef.current.forEach((line) => {
        if (meshRef.current) {
          meshRef.current.parent?.remove(line);
        }
      });
      crackLinesRef.current = [];

      // Create new crack line visualizations
      lines.forEach((line) => {
        const points: THREE.Vector3[] = [];
        line.forEach((point) => {
          points.push(point);
        });

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x6366f1,
          linewidth: 2,
          transparent: true,
          opacity: 0.8,
        });

        const lineSegment = new THREE.LineSegments(lineGeometry, lineMaterial);
        lineSegment.position.copy(new THREE.Vector3(...position));

        if (meshRef.current?.parent) {
          meshRef.current.parent.add(lineSegment);
          crackLinesRef.current.push(lineSegment);
        }
      });
    }
  }, [crackStage, geometry, position]);

  useFrame((state) => {
    if (meshRef.current && visible) {
      // Subtle idle animation
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.02;

      // Pulse crack glow lines
      crackLinesRef.current.forEach((line) => {
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      });

      // Increase glow intensity based on crack stage
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        const baseIntensity = 0.3;
        const crackBoost = crackStage * 0.2;
        const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        material.emissiveIntensity = baseIntensity + crackBoost + pulse;
      }
    }
  });

  const handleClick = () => {
    if (crackStage < 2) {
      // Progress to next crack stage
      onCrackProgression();

      // Visual feedback - pulse effect
      if (meshRef.current) {
        const originalScale = meshRef.current.scale.clone();
        meshRef.current.scale.multiplyScalar(1.05);
        setTimeout(() => {
          if (meshRef.current) {
            meshRef.current.scale.copy(originalScale);
          }
        }, 150);
      }
    } else {
      // Final stage - trigger shatter
      onShatter();
    }
  };

  if (!visible) return null;

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      scale={[1, 1, 1]}
      onClick={handleClick}
      castShadow
      receiveShadow
      name="monolith"
    >
      <meshStandardMaterial
        color="#6366f1"
        emissive="#4f46e5"
        emissiveIntensity={0.3}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}
