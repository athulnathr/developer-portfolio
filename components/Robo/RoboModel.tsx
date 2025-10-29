"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SectionName } from "@/hooks/useScrollProgress";
import { roboPositions } from "@/constants/animations";
import {
  GESTURES,
  WALK_CYCLE,
  RUN_CYCLE,
  TRANSFORMATION_STAGES,
  interpolateKeyframes,
  ANIMATION_TIMINGS,
} from "@/constants/robotAnimations";
import { HolographicSign } from "./HolographicSign";
import { RoboFaceReveal } from "./RoboFaceReveal";
import { TechBadges } from "./TechBadges";
import { GeometricRobot } from "./GeometricRobot";
import { CuteRobot } from "./CuteRobot";
import { MechanicalRobot } from "./MechanicalRobot";
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
  useRunAnimation?: boolean; // Use run instead of walk
  robotType?: "cute" | "mechanical"; // Select robot type
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
  useRunAnimation = false,
  robotType = "cute",
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Object3D | null>(null);
  const leftArmRef = useRef<THREE.Object3D | null>(null);
  const rightArmRef = useRef<THREE.Object3D | null>(null);
  const bodyRef = useRef<THREE.Object3D | null>(null);
  const leftLegRef = useRef<THREE.Group | null>(null);
  const rightLegRef = useRef<THREE.Group | null>(null);
  const leftKneeRef = useRef<THREE.Group | null>(null);
  const rightKneeRef = useRef<THREE.Group | null>(null);

  // Additional refs for MechanicalRobot
  const torsoRef = useRef<THREE.Object3D | null>(null);
  const waistRef = useRef<THREE.Object3D | null>(null);
  const leftElbowRef = useRef<THREE.Object3D | null>(null);
  const rightElbowRef = useRef<THREE.Object3D | null>(null);
  const leftHandRef = useRef<THREE.Object3D | null>(null);
  const rightHandRef = useRef<THREE.Object3D | null>(null);

  const [targetPosition, setTargetPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );
  const [targetScale, setTargetScale] = useState(1);
  const [walkProgress, setWalkProgress] = useState(0);
  const [heroAnimationTime, setHeroAnimationTime] = useState(0);

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

        // Walk/Run cycle during stand up
        const cycleSpeed = useRunAnimation ? RUN_CYCLE.speed : WALK_CYCLE.speed;
        setWalkProgress((prev) => prev + delta * cycleSpeed);
        if (useRunAnimation) {
          applyRunCycle(walkProgress);
        } else {
          applyWalkCycle(walkProgress);
        }
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

    // Elbow bend during walk (for mechanical robot)
    if (leftElbowRef.current && rightElbowRef.current) {
      const leftElbowBend = Math.max(0, Math.sin(cycle * Math.PI * 2)) * 0.2;
      const rightElbowBend =
        Math.max(0, Math.sin(cycle * Math.PI * 2 + Math.PI)) * 0.2;
      leftElbowRef.current.rotation.x = -leftElbowBend;
      rightElbowRef.current.rotation.x = -rightElbowBend;
    }

    // Finger curl during walk (for mechanical robot)
    if (leftHandRef.current && rightHandRef.current) {
      const fingerCurl = Math.sin(cycle * Math.PI * 2) * 0.1;
      leftHandRef.current.rotation.x = fingerCurl;
      rightHandRef.current.rotation.x = fingerCurl;
    }

    // Torso counter-rotation for natural movement
    if (torsoRef.current) {
      const torsoTwist = Math.sin(cycle * Math.PI * 2) * 0.05;
      torsoRef.current.rotation.y = torsoTwist;
    }

    // Animate legs if refs are available
    if (leftLegRef.current && rightLegRef.current) {
      // Hip swing - legs move opposite to each other
      leftLegRef.current.rotation.x =
        Math.sin(cycle * Math.PI * 2) * WALK_CYCLE.legSwing;
      rightLegRef.current.rotation.x =
        Math.sin(cycle * Math.PI * 2 + Math.PI) * WALK_CYCLE.legSwing;
    }

    // Knee bend - bend when leg is forward
    if (leftKneeRef.current && rightKneeRef.current) {
      const leftBend = Math.max(0, Math.sin(cycle * Math.PI * 2)) * 0.4;
      const rightBend =
        Math.max(0, Math.sin(cycle * Math.PI * 2 + Math.PI)) * 0.4;
      leftKneeRef.current.rotation.x = -leftBend;
      rightKneeRef.current.rotation.x = -rightBend;
    }

    if (groupRef.current) {
      // Body bob
      const bob = Math.abs(Math.sin(cycle * Math.PI * 2)) * WALK_CYCLE.bodyBob;
      groupRef.current.position.y += bob;
    }
  }

  function applyRunCycle(progress: number) {
    const cycle = progress % 1;

    if (leftArmRef.current && rightArmRef.current) {
      // Arms pump more vigorously when running
      leftArmRef.current.rotation.x =
        Math.sin(cycle * Math.PI * 2) * RUN_CYCLE.armSwing;
      rightArmRef.current.rotation.x =
        Math.sin(cycle * Math.PI * 2 + Math.PI) * RUN_CYCLE.armSwing;
    }

    // Elbow bend during run - more pronounced
    if (leftElbowRef.current && rightElbowRef.current) {
      const leftElbowBend = Math.max(0, Math.sin(cycle * Math.PI * 2)) * 0.4;
      const rightElbowBend =
        Math.max(0, Math.sin(cycle * Math.PI * 2 + Math.PI)) * 0.4;
      leftElbowRef.current.rotation.x = -leftElbowBend - 0.3;
      rightElbowRef.current.rotation.x = -rightElbowBend - 0.3;
    }

    // Finger curl during run - tighter fists
    if (leftHandRef.current && rightHandRef.current) {
      const fingerCurl = Math.sin(cycle * Math.PI * 2) * 0.15;
      leftHandRef.current.rotation.x = fingerCurl + 0.2;
      rightHandRef.current.rotation.x = fingerCurl + 0.2;
    }

    // Torso counter-rotation - more dramatic for running
    if (torsoRef.current) {
      const torsoTwist = Math.sin(cycle * Math.PI * 2) * 0.1;
      torsoRef.current.rotation.y = torsoTwist;
    }

    // Waist forward lean
    if (waistRef.current) {
      waistRef.current.rotation.x = 0.1;
    }

    // Animate legs with more exaggerated motion
    if (leftLegRef.current && rightLegRef.current) {
      // Hip swing - more dramatic for running
      leftLegRef.current.rotation.x =
        Math.sin(cycle * Math.PI * 2) * RUN_CYCLE.hipSwing;
      rightLegRef.current.rotation.x =
        Math.sin(cycle * Math.PI * 2 + Math.PI) * RUN_CYCLE.hipSwing;
    }

    // Knee bend - more pronounced when running
    if (leftKneeRef.current && rightKneeRef.current) {
      const leftBend =
        Math.max(0, Math.sin(cycle * Math.PI * 2)) * RUN_CYCLE.kneeSwing;
      const rightBend =
        Math.max(0, Math.sin(cycle * Math.PI * 2 + Math.PI)) *
        RUN_CYCLE.kneeSwing;
      leftKneeRef.current.rotation.x = -leftBend;
      rightKneeRef.current.rotation.x = -rightBend;
    }

    if (groupRef.current) {
      // More body bob when running
      const bob = Math.abs(Math.sin(cycle * Math.PI * 2)) * RUN_CYCLE.bodyBob;
      groupRef.current.position.y += bob;

      // Forward lean while running
      groupRef.current.rotation.x = RUN_CYCLE.bodyTilt;
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

    // Elbow bend for more realistic wave
    if (rightElbowRef.current) {
      const elbowBend = Math.sin(progress * Math.PI * 4) * 0.3 - 0.5;
      rightElbowRef.current.rotation.x = elbowBend;
    }

    // Fingers open/close during wave
    if (rightHandRef.current) {
      const fingerExtension = Math.sin(progress * Math.PI * 4) * 0.3;
      rightHandRef.current.rotation.x = fingerExtension;
    }
  }

  function applyThumbsUpGesture(time: number) {
    if (rightArmRef.current) {
      const gesture = Math.sin(time * 2) * 0.5;
      rightArmRef.current.rotation.x = -1 + gesture * 0.2;
      rightArmRef.current.rotation.z = 0.3;
    }

    // Elbow angle for thumbs up pose
    if (rightElbowRef.current) {
      rightElbowRef.current.rotation.x = -0.8;
    }

    // Thumb extended, other fingers curled
    if (rightHandRef.current) {
      rightHandRef.current.rotation.x = 0.5; // Fingers curled
      rightHandRef.current.rotation.z = -0.2; // Thumb out
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

    // Torso expansion/contraction
    if (torsoRef.current) {
      const torsoBreathing =
        Math.sin(time * ANIMATION_TIMINGS.BREATHING_SPEED) * 0.015;
      torsoRef.current.scale.x = 1 + torsoBreathing;
      torsoRef.current.scale.z = 1 + torsoBreathing;
    }

    // Waist slight rotation
    if (waistRef.current) {
      const waistRotation =
        Math.sin(time * ANIMATION_TIMINGS.BREATHING_SPEED * 0.5) * 0.02;
      waistRef.current.rotation.y = waistRotation;
    }
  }

  function applyTransformationEffects(level: number, time: number) {
    // Excited bounce during absorption
    if (groupRef.current && level > 0) {
      const bounce = Math.abs(Math.sin(time * 5)) * 0.1;
      groupRef.current.position.y += bounce;

      // Add slight rotation during transformation
      const rotation = Math.sin(time * 2) * 0.05;
      groupRef.current.rotation.y += rotation;
    }

    // Torso rotation during transformation
    if (torsoRef.current && level > 0) {
      const torsoSpin = Math.sin(time * 3) * 0.15 * level;
      torsoRef.current.rotation.y = torsoSpin;
    }

    // Waist rotation pulse
    if (waistRef.current && level > 0) {
      const waistPulse = Math.sin(time * 4) * 0.1 * level;
      waistRef.current.rotation.y = waistPulse;
    }

    // Mechanical details pulse - hands flex
    if (leftHandRef.current && rightHandRef.current && level > 0) {
      const handPulse = Math.sin(time * 6) * 0.2;
      leftHandRef.current.rotation.x = handPulse;
      rightHandRef.current.rotation.x = handPulse;
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
      {/* Conditionally render robot based on type */}
      {robotType === "mechanical" ? (
        <MechanicalRobot
          headRef={headRef}
          torsoRef={torsoRef}
          waistRef={waistRef}
          leftArmRef={leftArmRef}
          rightArmRef={rightArmRef}
          leftElbowRef={leftElbowRef}
          rightElbowRef={rightElbowRef}
          leftHandRef={leftHandRef}
          rightHandRef={rightHandRef}
          bodyRef={bodyRef}
          leftLegRef={leftLegRef}
          rightLegRef={rightLegRef}
          leftKneeRef={leftKneeRef}
          rightKneeRef={rightKneeRef}
        />
      ) : (
        <CuteRobot
          headRef={headRef}
          leftArmRef={leftArmRef}
          rightArmRef={rightArmRef}
          bodyRef={bodyRef}
          leftLegRef={leftLegRef}
          rightLegRef={rightLegRef}
          leftKneeRef={leftKneeRef}
          rightKneeRef={rightKneeRef}
        />
      )}

      {/* Additional lighting for the robot */}
      {robotType === "mechanical" ? (
        <>
          <pointLight position={[2, 2, 2]} intensity={0.6} color="#ff6600" />
          <pointLight position={[-2, 2, 2]} intensity={0.4} color="#ff8800" />
        </>
      ) : (
        <>
          <pointLight position={[2, 2, 2]} intensity={0.5} color="#00d9ff" />
          <pointLight position={[-2, 2, 2]} intensity={0.3} color="#ff00ff" />
        </>
      )}

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
