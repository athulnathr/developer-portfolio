"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SectionName } from "@/hooks/useScrollProgress";
import {
  cameraPositions,
  initialCameraPosition,
  interpolateCameraPosition,
} from "@/constants/cameraPositions";

interface OrbitalCameraControllerProps {
  currentSection: SectionName;
  sectionProgress: number;
  cursorPosition: { normalizedX: number; normalizedY: number };
  isInitialLoad?: boolean;
}

export const OrbitalCameraController: React.FC<
  OrbitalCameraControllerProps
> = ({ currentSection, sectionProgress, cursorPosition, isInitialLoad }) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3(0, 1, 0));
  const initialLoadTime = useRef(0);
  const hasCompletedInitialLoad = useRef(false);

  // Initialize camera position
  useEffect(() => {
    if (isInitialLoad && !hasCompletedInitialLoad.current) {
      camera.position.copy(initialCameraPosition);
      camera.lookAt(0, 1, 0);
    }
  }, [camera, isInitialLoad]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Handle initial load animation
    if (isInitialLoad && !hasCompletedInitialLoad.current) {
      initialLoadTime.current += delta;
      const loadProgress = Math.min(initialLoadTime.current / 2, 1); // 2 second load animation

      if (loadProgress < 1) {
        // Smooth zoom from initial position to hero position
        const heroPos = cameraPositions.hero.position;
        camera.position.lerpVectors(
          initialCameraPosition,
          heroPos,
          loadProgress
        );
        camera.lookAt(0, 1, 0);
        return;
      } else {
        hasCompletedInitialLoad.current = true;
      }
    }

    // Determine target camera position based on section
    const sections: SectionName[] = [
      "hero",
      "about",
      "skills",
      "projects",
      "contact",
      "footer",
    ];
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
    const nextSection = sections[nextIndex];

    // Interpolate between current and next section based on progress
    const { position, lookAt, fov } = interpolateCameraPosition(
      currentSection,
      nextSection,
      sectionProgress
    );

    targetPosition.current.copy(position);
    targetLookAt.current.copy(lookAt);

    // Apply mouse parallax offset
    const parallaxStrength = 0.3;
    const mouseOffsetX = cursorPosition.normalizedX * parallaxStrength;
    const mouseOffsetY = cursorPosition.normalizedY * parallaxStrength * 0.5;

    targetPosition.current.x += mouseOffsetX;
    targetPosition.current.y += mouseOffsetY;

    // Smooth camera movement
    camera.position.lerp(targetPosition.current, delta * 2);
    currentLookAt.current.lerp(targetLookAt.current, delta * 2);
    camera.lookAt(currentLookAt.current);

    // Smooth FOV transition
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, delta * 2);
      camera.updateProjectionMatrix();
    }

    // Add subtle camera bob in hero section
    if (currentSection === "hero" && hasCompletedInitialLoad.current) {
      const bob = Math.sin(time * 0.5) * 0.05;
      camera.position.y += bob;
    }
  });

  return null;
};
