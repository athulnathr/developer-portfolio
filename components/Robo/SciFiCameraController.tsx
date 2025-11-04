"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SectionName } from "@/hooks/useScrollProgress";

interface SciFiCameraControllerProps {
  cursorPosition: { normalizedX: number; normalizedY: number };
  isInitialLoad?: boolean;
  currentSection?: SectionName;
  sectionProgress?: number;
}

// Helper function for smooth interpolation
const lerp = (start: number, end: number, t: number) => {
  return start + (end - start) * t;
};

// Helper function to clamp value between min and max
const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

export const SciFiCameraController: React.FC<SciFiCameraControllerProps> = ({
  cursorPosition,
  isInitialLoad,
  currentSection = "hero",
  sectionProgress = 0,
}) => {
  const { camera } = useThree();
  const basePosition = useRef(new THREE.Vector3(0, 2, 8));
  const baseLookAt = useRef(new THREE.Vector3(0, 1.2, 0));
  const initialLoadTime = useRef(0);
  const hasCompletedInitialLoad = useRef(false);
  const initialCameraPosition = new THREE.Vector3(0, 3, 15);

  // Initialize camera position
  useEffect(() => {
    if (isInitialLoad && !hasCompletedInitialLoad.current) {
      camera.position.copy(initialCameraPosition);
      camera.lookAt(0, 1.5, 0);
    }
  }, [camera, isInitialLoad]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Handle initial load animation - zoom in
    if (isInitialLoad && !hasCompletedInitialLoad.current) {
      initialLoadTime.current += delta;
      const loadProgress = Math.min(initialLoadTime.current / 2.5, 1);

      if (loadProgress < 1) {
        // Smooth zoom from initial position to base position
        const easeProgress = 1 - Math.pow(1 - loadProgress, 3);

        camera.position.lerpVectors(
          initialCameraPosition,
          basePosition.current,
          easeProgress
        );

        const lookAtTarget = new THREE.Vector3();
        lookAtTarget.lerpVectors(
          new THREE.Vector3(0, 1.5, 0),
          baseLookAt.current,
          easeProgress
        );

        camera.lookAt(lookAtTarget);
        return;
      } else {
        hasCompletedInitialLoad.current = true;
      }
    }

    // After load complete: handle section-based camera movement
    if (hasCompletedInitialLoad.current) {
      // Calculate responsive target positions based on screen size
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const isTablet =
        typeof window !== "undefined" &&
        window.innerWidth < 1024 &&
        window.innerWidth >= 768;

      // Camera positions for About section
      let aboutCameraPosition = new THREE.Vector3(
        isMobile ? -1.5 : -2,
        2,
        isMobile ? 6 : 5
      );
      let aboutLookAtPosition = new THREE.Vector3(
        lerp(0, isMobile ? 1.5 : 2.5, clamp(sectionProgress, 0, 1)),
        1.5,
        0
      );

      // Determine target position based on current section
      let targetPosition = basePosition.current.clone();
      let targetLookAt = baseLookAt.current.clone();

      if (currentSection === "about") {
        // In About section, move camera to focus on human
        const progress = clamp(sectionProgress, 0, 1);

        // Smooth transition to About camera position
        targetPosition = aboutCameraPosition;
        targetLookAt = aboutLookAtPosition;

        // Follow human as they walk to the wall
        if (progress > 0.4) {
          const walkProgress = (progress - 0.4) / 0.6;
          targetLookAt.x = lerp(
            targetLookAt.x,
            isMobile ? 1.8 : 3,
            walkProgress
          );
        }
      } else {
        // Default position with subtle mouse parallax
        const parallaxStrength = 0.15;
        const mouseOffsetX = cursorPosition.normalizedX * parallaxStrength;
        const mouseOffsetY =
          cursorPosition.normalizedY * parallaxStrength * 0.5;

        targetPosition.x += mouseOffsetX;
        targetPosition.y += mouseOffsetY;

        // Add subtle bob
        targetLookAt.y += Math.sin(time * 0.5) * 0.02;
      }

      // Smooth lerp to target position and look at
      camera.position.lerp(targetPosition, delta * 2);
      camera.lookAt(targetLookAt);
    }
  });

  return null;
};
