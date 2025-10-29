"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SectionName } from "@/hooks/useScrollProgress";
import {
  sciFiCameraPositions,
  sciFiInitialCameraPosition,
  interpolateSciFiCameraPosition,
} from "@/constants/sciFiCameraPositions";

interface SciFiCameraControllerProps {
  currentSection: SectionName;
  sectionProgress: number;
  cursorPosition: { normalizedX: number; normalizedY: number };
  isInitialLoad?: boolean;
}

export const SciFiCameraController: React.FC<SciFiCameraControllerProps> = ({
  currentSection,
  sectionProgress,
  cursorPosition,
  isInitialLoad,
}) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));
  const initialLoadTime = useRef(0);
  const hasCompletedInitialLoad = useRef(false);

  // Initialize camera position
  useEffect(() => {
    if (isInitialLoad && !hasCompletedInitialLoad.current) {
      camera.position.copy(sciFiInitialCameraPosition);
      camera.lookAt(0, 1.2, 0);
    }
  }, [camera, isInitialLoad]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Handle initial load animation - show full room then zoom to hero position
    if (isInitialLoad && !hasCompletedInitialLoad.current) {
      initialLoadTime.current += delta;
      const loadProgress = Math.min(initialLoadTime.current / 2.5, 1); // 2.5 second load animation

      if (loadProgress < 1) {
        // Smooth zoom from initial wide position to hero position
        const heroPos = sciFiCameraPositions.hero.position;
        const heroLookAt = sciFiCameraPositions.hero.lookAt;

        // Use ease-out for smooth deceleration
        const easeProgress = 1 - Math.pow(1 - loadProgress, 3);

        camera.position.lerpVectors(
          sciFiInitialCameraPosition,
          heroPos,
          easeProgress
        );

        currentLookAt.current.lerpVectors(
          new THREE.Vector3(0, 1.2, 0),
          heroLookAt,
          easeProgress
        );

        camera.lookAt(currentLookAt.current);
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
    const { position, lookAt, fov } = interpolateSciFiCameraPosition(
      currentSection,
      nextSection,
      sectionProgress
    );

    targetPosition.current.copy(position);
    targetLookAt.current.copy(lookAt);

    // Apply subtle mouse parallax offset (reduced as we zoom in)
    const zoomFactor = Math.max(0, (camera.position.z - 2.5) / 15); // Reduce parallax when close
    const parallaxStrength = 0.2 * zoomFactor;
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

    // Add very subtle camera bob in hero section only
    if (currentSection === "hero" && hasCompletedInitialLoad.current) {
      const bob = Math.sin(time * 0.5) * 0.03;
      camera.position.y += bob;
    }
  });

  return null;
};
