"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  createMonolithGeometry,
  getFracturePoints,
} from "@/app/lib/monolith/geometry";
import { calculateCrackLines } from "@/app/lib/monolith/fracture";
import {
  monolithVertexShader,
  monolithFragmentShader,
} from "@/app/lib/shaders/monolithMaterial";

interface MonolithProps {
  crackStage: number;
  onShatter: () => void;
  visible: boolean;
  position?: [number, number, number];
  lightPosition: THREE.Vector3;
}

export default function Monolith({
  crackStage,
  onShatter,
  visible,
  position = [0, 0, 0],
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
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uCrackProgress.value = THREE.MathUtils.lerp(
        material.uniforms.uCrackProgress.value,
        crackStage / 3,
        0.1
      );
      material.uniforms.uLightPosition.value.copy(lightPosition);

      // Subtle idle animation
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.02;

      // Pulse crack glow lines
      crackLinesRef.current.forEach((line) => {
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      });
    }
  });

  const handleClick = () => {
    if (crackStage < 3) {
      // Crack further
    } else {
      // Trigger shatter
      onShatter();
    }
  };

  if (!visible) return null;

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      onClick={handleClick}
      castShadow
      receiveShadow
    >
      <shaderMaterial
        vertexShader={monolithVertexShader}
        fragmentShader={monolithFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
