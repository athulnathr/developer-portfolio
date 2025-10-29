"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { SectionName } from "@/hooks/useScrollProgress";
import { roboPositions } from "@/constants/animations";
import {
  GESTURES,
  WALK_CYCLE,
  TRANSFORMATION_STAGES,
  interpolateKeyframes,
  ANIMATION_TIMINGS,
} from "@/constants/robotAnimations";
import { HolographicSign } from "./HolographicSign";
import { RoboFaceReveal } from "./RoboFaceReveal";
import { TechBadges } from "./TechBadges";
import { GeometricRobot } from "./GeometricRobot";
import { content } from "@/constants/content";

interface RoboModelProps {
  currentSection: SectionName;
  sectionProgress: number;
  cursorPosition: { normalizedX: number; normalizedY: number };
  animationState?: string;
  animationProgress?: number;
  transformationLevel?: number;
  onProjectHover?: number | null;
  scale?: number;
}

export const RoboModel: React.FC<RoboModelProps> = ({
  currentSection,
  sectionProgress,
  cursorPosition,
  animationState = "idle",
  animationProgress = 0,
  transformationLevel = 0,
  onProjectHover = null,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Object3D | null>(null);
  const leftArmRef = useRef<THREE.Object3D | null>(null);
  const rightArmRef = useRef<THREE.Object3D | null>(null);
  const bodyRef = useRef<THREE.Object3D | null>(null);

  const [targetPosition, setTargetPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );
  const [targetScale, setTargetScale] = useState(1);
  const [walkProgress, setWalkProgress] = useState(0);
  const [heroAnimationTime, setHeroAnimationTime] = useState(0);

  // Load the robot model
  // Note: If model doesn't exist, we'll use the geometric fallback
  // The parent ErrorBoundary will catch any critical failures
  const { scene } = useGLTF("/models/robot.glb");

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = useMemo(() => scene?.clone(), [scene]);

  // Find important bones/objects in the model (if GLB loaded)
  useEffect(() => {
    if (!clonedScene) return;

    clonedScene.traverse((child) => {
      const name = child.name.toLowerCase();
      if (name.includes("head")) {
        headRef.current = child;
      } else if (name.includes("leftarm") || name.includes("arm_l")) {
        leftArmRef.current = child;
      } else if (name.includes("rightarm") || name.includes("arm_r")) {
        rightArmRef.current = child;
      } else if (name.includes("body") || name.includes("torso")) {
        bodyRef.current = child;
      }
    });
  }, [clonedScene]);

  // Update target position based on current section
  useEffect(() => {
    const pos = roboPositions[currentSection];
    setTargetPosition(new THREE.Vector3(pos.x, pos.y, pos.z));

    // Apply transformation level in skills section
    if (currentSection === "skills") {
      const stages = Object.values(TRANSFORMATION_STAGES);
      const stage = stages[Math.min(transformationLevel, stages.length - 1)];
      setTargetScale(pos.scale * stage.scale * scale);
    } else {
      setTargetScale(pos.scale * scale);
    }
  }, [currentSection, scale, transformationLevel]);

  // Main animation loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // === HERO SECTION SEQUENCE ===
    if (currentSection === "hero") {
      setHeroAnimationTime((prev) => prev + delta);

      // 0-2s: Sitting
      if (heroAnimationTime < ANIMATION_TIMINGS.STAND_UP_DURATION) {
        const sitPose = interpolateKeyframes(
          GESTURES.sit.keyframes as unknown as any[],
          0,
          "position"
        );
        if (sitPose) {
          groupRef.current.position.set(
            targetPosition.x,
            targetPosition.y + sitPose.y,
            targetPosition.z
          );
        }
      }
      // 2-4s: Standing up
      else if (
        heroAnimationTime <
        ANIMATION_TIMINGS.STAND_UP_DURATION + ANIMATION_TIMINGS.WALK_IN_DURATION
      ) {
        const progress =
          (heroAnimationTime - ANIMATION_TIMINGS.STAND_UP_DURATION) /
          ANIMATION_TIMINGS.STAND_UP_DURATION;
        const standUpPose = interpolateKeyframes(
          GESTURES.standUp.keyframes as unknown as any[],
          progress,
          "position"
        );
        if (standUpPose) {
          groupRef.current.position.set(
            targetPosition.x,
            targetPosition.y + standUpPose.y,
            targetPosition.z
          );
        }

        // Walk cycle during stand up
        setWalkProgress((prev) => prev + delta * WALK_CYCLE.speed);
        applyWalkCycle(walkProgress);
      }
      // 4-5.5s: Wave gesture
      else if (
        heroAnimationTime <
        ANIMATION_TIMINGS.WAVE_START_TIME + ANIMATION_TIMINGS.WAVE_DURATION
      ) {
        const waveProgress =
          (heroAnimationTime - ANIMATION_TIMINGS.WAVE_START_TIME) /
          ANIMATION_TIMINGS.WAVE_DURATION;
        applyWaveGesture(waveProgress);
      }
      // After: Idle with breathing
      else {
        applyBreathingAnimation(time);
      }
    }

    // === SMOOTH POSITION TRANSITIONS ===
    else {
      groupRef.current.position.lerp(targetPosition, delta * 2);
    }

    // === SMOOTH SCALE TRANSITIONS ===
    const currentScale = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 2);
    groupRef.current.scale.set(newScale, newScale, newScale);

    // === HEAD CURSOR TRACKING ===
    if (headRef.current) {
      const targetRotationY = cursorPosition.normalizedX * 0.3;
      const targetRotationX = -cursorPosition.normalizedY * 0.2;

      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        delta * 3
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        delta * 3
      );
    }

    // === SECTION-SPECIFIC ANIMATIONS ===
    switch (currentSection) {
      case "about":
        // Gentle bounce when settled
        if (sectionProgress > 0.2) {
          groupRef.current.position.y =
            targetPosition.y + Math.sin(time * 3) * 0.05;
        }
        break;

      case "skills":
        // Apply transformation effects
        applyTransformationEffects(transformationLevel, time);
        break;

      case "projects":
        // Mature confident pose
        groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;

        // React to project hover
        if (onProjectHover !== null) {
          applyThumbsUpGesture(time);
        }
        break;

      case "contact":
        // Welcoming idle
        applyBreathingAnimation(time);
        break;

      case "footer":
        // Power down animation
        const powerDownPose = interpolateKeyframes(
          GESTURES.powerDown.keyframes as unknown as any[],
          Math.min(sectionProgress * 2, 1),
          "position"
        );
        if (powerDownPose) {
          groupRef.current.position.y = targetPosition.y + powerDownPose.y;
        }
        break;
    }
  });

  // === GESTURE FUNCTIONS ===

  function applyWalkCycle(progress: number) {
    const cycle = progress % 1;

    if (leftArmRef.current && rightArmRef.current) {
      // Arms swing opposite to legs
      leftArmRef.current.rotation.x =
        Math.sin(cycle * Math.PI * 2) * WALK_CYCLE.armSwing;
      rightArmRef.current.rotation.x =
        Math.sin(cycle * Math.PI * 2 + Math.PI) * WALK_CYCLE.armSwing;
    }

    if (groupRef.current) {
      // Body bob
      const bob = Math.abs(Math.sin(cycle * Math.PI * 2)) * WALK_CYCLE.bodyBob;
      groupRef.current.position.y += bob;
    }
  }

  function applyWaveGesture(progress: number) {
    if (rightArmRef.current) {
      const waveRotation = interpolateKeyframes(
        GESTURES.wave.keyframes as unknown as any[],
        progress,
        "rotation"
      );
      if (waveRotation) {
        rightArmRef.current.rotation.z = waveRotation.z;
      }
    }
  }

  function applyThumbsUpGesture(time: number) {
    if (rightArmRef.current) {
      const gesture = Math.sin(time * 2) * 0.5;
      rightArmRef.current.rotation.x = -1 + gesture * 0.2;
      rightArmRef.current.rotation.z = 0.3;
    }
  }

  function applyBreathingAnimation(time: number) {
    if (groupRef.current) {
      const breathingOffset =
        Math.sin(time * ANIMATION_TIMINGS.BREATHING_SPEED) * 0.03;
      groupRef.current.position.y += breathingOffset;
    }

    if (bodyRef.current) {
      bodyRef.current.scale.y =
        1 + Math.sin(time * ANIMATION_TIMINGS.BREATHING_SPEED) * 0.02;
    }
  }

  function applyTransformationEffects(level: number, time: number) {
    const stages = Object.values(TRANSFORMATION_STAGES);
    const stage = stages[Math.min(level, stages.length - 1)];

    // Apply glow effect (only if GLB model loaded)
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material && "emissive" in mesh.material) {
            const material = mesh.material as THREE.MeshStandardMaterial;
            const glowIntensity = 0.5 + Math.sin(time * 4) * 0.3;
            material.emissiveIntensity =
              glowIntensity * stage.emissiveIntensity;
            if ("glowColor" in stage && stage.glowColor) {
              material.emissive = stage.glowColor;
            }
          }
        }
      });
    }

    // Excited bounce during absorption
    if (groupRef.current && level > 0) {
      const bounce = Math.abs(Math.sin(time * 5)) * 0.1;
      groupRef.current.position.y += bounce;
    }
  }

  // Show holographic sign in About section
  const showHolographicSign =
    currentSection === "about" && sectionProgress > 0.3;

  // Show face reveal in Contact section
  const showFaceReveal = currentSection === "contact" && sectionProgress > 0.2;

  // Get collected tech badges for Skills section
  const collectedBadges = useMemo(() => {
    if (currentSection !== "skills") return [];

    const allSkills = content.skills.categories.flatMap((cat) => cat.skills);
    const badgeCount = Math.floor(transformationLevel * 4); // Up to 12 badges
    return allSkills.slice(0, Math.min(badgeCount, allSkills.length));
  }, [currentSection, transformationLevel]);

  return (
    <group ref={groupRef}>
      {/* Render GLB model or geometric fallback */}
      {clonedScene ? (
        <primitive object={clonedScene} />
      ) : (
        <GeometricRobot
          headRef={headRef}
          leftArmRef={leftArmRef}
          rightArmRef={rightArmRef}
          bodyRef={bodyRef}
        />
      )}

      {/* Additional lighting for the robot */}
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#00d9ff" />
      <pointLight position={[-2, 2, 2]} intensity={0.3} color="#ff00ff" />

      {/* Dynamic transformation glow */}
      {currentSection === "skills" &&
        transformationLevel > 0 &&
        (() => {
          const stage =
            TRANSFORMATION_STAGES[
              Object.keys(TRANSFORMATION_STAGES)[
                Math.min(transformationLevel, 3)
              ] as keyof typeof TRANSFORMATION_STAGES
            ];
          return "glowColor" in stage && stage.glowColor ? (
            <pointLight
              position={[0, 0, 0]}
              intensity={transformationLevel * 0.5}
              color={stage.glowColor}
              distance={5}
            />
          ) : null;
        })()}

      {/* Holographic Sign for About section */}
      <HolographicSign
        text="About Me"
        position={[1.5, 1.5, 0]}
        visible={showHolographicSign}
      />

      {/* Face Reveal for Contact section */}
      <RoboFaceReveal position={[0, 1, 0.5]} isActive={showFaceReveal} />

      {/* Tech Badges orbiting in Skills section */}
      {currentSection === "skills" && collectedBadges.length > 0 && (
        <TechBadges badges={collectedBadges} radius={2} speed={0.3} />
      )}
    </group>
  );
};

// Preload the model
useGLTF.preload("/models/robot.glb");
