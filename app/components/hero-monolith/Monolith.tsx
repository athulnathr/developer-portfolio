"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
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

  // Rotation control state
  const [isDragging, setIsDragging] = useState(false);
  const [rotationOffset, setRotationOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const lastRotation = useRef({ x: 0, y: 0 });

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
      // Apply user rotation offset + subtle idle animation
      const idleRotation = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
      meshRef.current.rotation.x = rotationOffset.x;
      meshRef.current.rotation.y = rotationOffset.y + idleRotation;

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

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    // Only trigger click if not dragging (to separate rotation from clicking)
    if (isDragging) return;

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

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsDragging(false); // Will be set to true on move
    dragStart.current = { x: e.clientX, y: e.clientY };
    lastRotation.current = { ...rotationOffset };
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (e.buttons === 0) return; // No button pressed

    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    // If moved more than 5 pixels, consider it dragging
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      setIsDragging(true);
    }

    // Horizontal drag → Y rotation (turntable)
    // Vertical drag → X rotation (tilt)
    const sensitivity = 0.01;
    setRotationOffset({
      x: lastRotation.current.x - deltaY * sensitivity,
      y: lastRotation.current.y + deltaX * sensitivity,
    });
  };

  const handlePointerUp = () => {
    // Reset dragging state after a short delay to prevent click from firing
    setTimeout(() => setIsDragging(false), 100);
  };

  if (!visible) return null;

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      scale={[1, 1, 1]}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
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
