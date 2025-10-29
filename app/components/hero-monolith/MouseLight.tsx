"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MouseLightProps {
  mousePosition: THREE.Vector3;
  intensity?: number;
}

export default function MouseLight({
  mousePosition,
  intensity = 2,
}: MouseLightProps) {
  const lightRef = useRef<THREE.PointLight>(null);
  const targetPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    targetPosition.current.copy(mousePosition);
  }, [mousePosition]);

  useFrame(() => {
    if (lightRef.current) {
      // Smooth follow
      lightRef.current.position.lerp(targetPosition.current, 0.1);
    }
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        position={[mousePosition.x, mousePosition.y, mousePosition.z]}
        intensity={intensity}
        distance={15}
        decay={2}
        color="#6366f1"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />

      {/* Additional ambient lighting */}
      <ambientLight intensity={0.3} />

      {/* Key light for depth */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#818cf8" />

      {/* Fill light */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.3}
        color="#4f46e5"
      />
    </>
  );
}
