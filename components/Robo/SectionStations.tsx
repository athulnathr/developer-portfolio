"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SectionName } from "@/hooks/useScrollProgress";
import { Text } from "@react-three/drei";

interface SectionStationsProps {
  currentSection: SectionName;
  sectionProgress: number;
}

export const SectionStations: React.FC<SectionStationsProps> = ({
  currentSection,
  sectionProgress,
}) => {
  const aboutStationRef = useRef<THREE.Group>(null);
  const skillsStationRef = useRef<THREE.Group>(null);
  const projectsStationRef = useRef<THREE.Group>(null);
  const contactStationRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Animate stations based on proximity
    if (aboutStationRef.current) {
      const opacity = currentSection === "about" ? sectionProgress : 0.3;
      aboutStationRef.current.children.forEach((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.Material
        ) {
          child.material.opacity = opacity;
        }
      });
      aboutStationRef.current.rotation.y = time * 0.5;
    }

    if (skillsStationRef.current) {
      const opacity = currentSection === "skills" ? sectionProgress : 0.3;
      skillsStationRef.current.children.forEach((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.Material
        ) {
          child.material.opacity = opacity;
        }
      });
      skillsStationRef.current.rotation.y = time * 0.3;
      skillsStationRef.current.position.y = 3 + Math.sin(time) * 0.2;
    }

    if (projectsStationRef.current) {
      const opacity = currentSection === "projects" ? sectionProgress : 0.3;
      projectsStationRef.current.children.forEach((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.Material
        ) {
          child.material.opacity = opacity;
        }
      });
      projectsStationRef.current.rotation.y = time * 0.4;
    }

    if (contactStationRef.current) {
      const opacity = currentSection === "contact" ? sectionProgress : 0.3;
      contactStationRef.current.children.forEach((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.Material
        ) {
          child.material.opacity = opacity;
        }
      });
      contactStationRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group>
      {/* About Station - Left side */}
      <group ref={aboutStationRef} position={[-4, 1.5, 0]}>
        {/* Photo frame */}
        <mesh>
          <boxGeometry args={[1.5, 2, 0.1]} />
          <meshStandardMaterial
            color="#00d9ff"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
        <pointLight
          position={[0, 0, 0.5]}
          intensity={0.5}
          color="#00d9ff"
          distance={2}
        />
      </group>

      {/* Skills Station - Above */}
      <group ref={skillsStationRef} position={[0, 3, -3]}>
        {/* Orbiting ring */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.5, 0.1, 8, 32]} />
          <meshStandardMaterial
            color="#00d9ff"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
        {/* Inner glow */}
        <pointLight
          position={[0, 0, 0]}
          intensity={0.8}
          color="#00d9ff"
          distance={3}
        />
      </group>

      {/* Projects Station - Right side */}
      <group ref={projectsStationRef} position={[4, 1.2, 0]}>
        {/* Project cards representation */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.2, 0.8, 0.05]} />
          <meshStandardMaterial
            color="#00d9ff"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
        <mesh position={[0.2, 0, 0.1]}>
          <boxGeometry args={[1.2, 0.8, 0.05]} />
          <meshStandardMaterial
            color="#0088cc"
            transparent
            opacity={0.2}
            wireframe
          />
        </mesh>
        <pointLight
          position={[0, 0, 0.5]}
          intensity={0.5}
          color="#00d9ff"
          distance={2}
        />
      </group>

      {/* Contact Station - Front */}
      <group ref={contactStationRef} position={[0, 1.5, 3]}>
        {/* Communication panel */}
        <mesh>
          <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
          <meshStandardMaterial
            color="#00d9ff"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.9, 1, 32]} />
          <meshStandardMaterial
            color="#00d9ff"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight
          position={[0, 0, 0.5]}
          intensity={0.6}
          color="#00d9ff"
          distance={2}
        />
      </group>
    </group>
  );
};
