"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface SciFiCameraControllerProps {
  cursorPosition: { normalizedX: number; normalizedY: number };
  isInitialLoad?: boolean;
}

export const SciFiCameraController: React.FC<SciFiCameraControllerProps> = ({
  cursorPosition,
  isInitialLoad,
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

    // After load complete: fixed position with subtle mouse parallax
    if (hasCompletedInitialLoad.current) {
      // Very subtle mouse parallax
      const parallaxStrength = 0.15;
      const mouseOffsetX = cursorPosition.normalizedX * parallaxStrength;
      const mouseOffsetY = cursorPosition.normalizedY * parallaxStrength * 0.5;

      const targetPosition = basePosition.current.clone();
      targetPosition.x += mouseOffsetX;
      targetPosition.y += mouseOffsetY;

      // Smooth lerp to target
      camera.position.lerp(targetPosition, delta * 2);

      // Keep looking at robot center with subtle bob
      const lookAtTarget = baseLookAt.current.clone();
      lookAtTarget.y += Math.sin(time * 0.5) * 0.02;
      camera.lookAt(lookAtTarget);
    }
  });

  return null;
};
