"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Fragment } from "@/app/lib/monolith/fracture";
import { updateFragmentPhysics } from "@/app/lib/monolith/physics";
import {
  monolithVertexShader,
  monolithFragmentShader,
} from "@/app/lib/shaders/monolithMaterial";

interface MonolithFragmentsProps {
  fragments: Fragment[];
  visible: boolean;
  onReassemble?: () => void;
  reassembling: boolean;
  targetPosition: THREE.Vector3;
  lightPosition: THREE.Vector3;
}

export default function MonolithFragments({
  fragments,
  visible,
  onReassemble,
  reassembling,
  targetPosition,
  lightPosition,
}: MonolithFragmentsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const fragmentRefs = useRef<THREE.Mesh[]>([]);
  const lastTime = useRef(0);

  useEffect(() => {
    fragmentRefs.current = fragmentRefs.current.slice(0, fragments.length);
  }, [fragments.length]);

  useFrame((state) => {
    if (!visible || !groupRef.current) return;

    const deltaTime = state.clock.elapsedTime - lastTime.current;
    lastTime.current = state.clock.elapsedTime;

    fragmentRefs.current.forEach((mesh, index) => {
      if (!mesh) return;

      const fragment = fragments[index];
      if (!fragment) return;

      if (reassembling) {
        // Smooth reassembly animation
        const speed = 0.08;
        fragment.position.lerp(targetPosition, speed);

        // Rotate to upright
        fragment.rotation.x *= 0.9;
        fragment.rotation.y *= 0.9;
        fragment.rotation.z *= 0.9;

        // Scale down as merging
        const targetScale = 0.01;
        fragment.scale.x += (targetScale - fragment.scale.x) * speed;
        fragment.scale.y += (targetScale - fragment.scale.y) * speed;
        fragment.scale.z += (targetScale - fragment.scale.z) * speed;

        // Check if reassembly complete
        const distance = fragment.position.distanceTo(targetPosition);
        if (distance < 0.1 && index === 0 && onReassemble) {
          onReassemble();
        }
      } else {
        // Physics simulation
        updateFragmentPhysics(fragment, Math.min(deltaTime, 0.05));
      }

      // Update mesh transform
      mesh.position.copy(fragment.position);
      mesh.rotation.copy(fragment.rotation);
      mesh.scale.copy(fragment.scale);

      // Update shader uniforms
      const material = mesh.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.elapsedTime;
        material.uniforms.uLightPosition.value.copy(lightPosition);
      }
    });
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {fragments.map((fragment, index) => (
        <mesh
          key={fragment.id}
          ref={(el) => {
            if (el) fragmentRefs.current[index] = el;
          }}
          geometry={fragment.geometry}
          position={fragment.position.toArray()}
          rotation={fragment.rotation.toArray() as [number, number, number]}
          scale={fragment.scale.toArray()}
          castShadow
          receiveShadow
          onClick={() => {
            // Mini shatter effect on click
            if (!reassembling) {
              fragment.velocity.y += 1;
              fragment.angularVelocity.set(
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5
              );
            }
          }}
        >
          <shaderMaterial
            vertexShader={monolithVertexShader}
            fragmentShader={monolithFragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uCrackProgress: { value: 0 },
              uBaseColor: { value: new THREE.Color(0x2a2a3e) },
              uGlowColor: { value: new THREE.Color(0x6366f1) },
              uMetallic: { value: 0.8 },
              uRoughness: { value: 0.3 },
              uLightPosition: { value: lightPosition },
            }}
          />
        </mesh>
      ))}
    </group>
  );
}
