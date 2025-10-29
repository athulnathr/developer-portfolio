"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  techFloorVertexShader,
  techFloorFragmentShader,
} from "@/app/lib/shaders/techFloorShader";

interface TechFloorProps {
  mousePosition: THREE.Vector3;
  shadowPosition: THREE.Vector3;
}

export default function TechFloor({
  mousePosition,
  shadowPosition,
}: TechFloorProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMousePosition: { value: mousePosition },
      uShadowPosition: { value: shadowPosition },
      uIntensity: { value: 1.0 },
      uColor1: { value: new THREE.Color(0x1a1a2e) },
      uColor2: { value: new THREE.Color(0x6366f1) },
    }),
    [mousePosition, shadowPosition]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uMousePosition.value.copy(mousePosition);
      material.uniforms.uShadowPosition.value.copy(shadowPosition);
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, 0]}
      receiveShadow
    >
      <planeGeometry args={[20, 20, 100, 100]} />
      <shaderMaterial
        vertexShader={techFloorVertexShader}
        fragmentShader={techFloorFragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
