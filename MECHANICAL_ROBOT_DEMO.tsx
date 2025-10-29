/**
 * MECHANICAL ROBOT DEMO
 *
 * This file shows how to use the new mechanical robot in your application.
 * Copy the relevant sections to your actual components.
 */

import { RoboCanvas } from "@/components/Robo/RoboCanvas";
import { RoboModel } from "@/components/Robo/RoboModel";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera } from "@react-three/drei";

// ============================================
// EXAMPLE 1: Simple Switch in RoboCanvas
// ============================================

// Update your RoboCanvas.tsx file to pass robotType prop:
export function RoboCanvasWithMechanical() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <Canvas
        shadows={false}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

          {/* Use mechanical robot */}
          <RoboModel
            currentSection="hero"
            sectionProgress={0}
            cursorPosition={{ normalizedX: 0, normalizedY: 0 }}
            robotType="mechanical" // 👈 ADD THIS LINE
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// ============================================
// EXAMPLE 2: Dynamic Robot Switching by Section
// ============================================

import { SectionName } from "@/hooks/useScrollProgress";

export function DynamicRobotCanvas({
  currentSection,
}: {
  currentSection: SectionName;
}) {
  // Choose robot based on section
  const robotType =
    currentSection === "skills" || currentSection === "projects"
      ? "mechanical"
      : "cute";

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

          <RoboModel
            currentSection={currentSection}
            sectionProgress={0}
            cursorPosition={{ normalizedX: 0, normalizedY: 0 }}
            robotType={robotType} // 👈 Dynamic switching
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// ============================================
// EXAMPLE 3: User Toggle Button
// ============================================

import { useState } from "react";

export function RobotWithToggle() {
  const [robotType, setRobotType] = useState<"cute" | "mechanical">("cute");

  return (
    <div className="relative w-full h-screen">
      {/* Toggle Button */}
      <button
        onClick={() =>
          setRobotType(robotType === "cute" ? "mechanical" : "cute")
        }
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
      >
        Switch to {robotType === "cute" ? "Mechanical" : "Cute"} Robot
      </button>

      {/* Canvas with Robot */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

            <RoboModel
              currentSection="hero"
              sectionProgress={0}
              cursorPosition={{ normalizedX: 0, normalizedY: 0 }}
              robotType={robotType} // 👈 User-controlled
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Comparison View (Side by Side)
// ============================================

export function RobotComparison() {
  return (
    <div className="grid grid-cols-2 gap-4 h-screen">
      {/* Cute Robot */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-50 text-white bg-black/50 px-3 py-1 rounded">
          Cute Robot
        </div>
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <RoboModel
              currentSection="hero"
              sectionProgress={0}
              cursorPosition={{ normalizedX: 0, normalizedY: 0 }}
              robotType="cute"
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Mechanical Robot */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-50 text-white bg-black/50 px-3 py-1 rounded">
          Mechanical Robot
        </div>
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <RoboModel
              currentSection="hero"
              sectionProgress={0}
              cursorPosition={{ normalizedX: 0, normalizedY: 0 }}
              robotType="mechanical"
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 5: Update Existing RoboCanvas.tsx
// ============================================

/**
 * To use the mechanical robot in your existing application,
 * update your /components/Robo/RoboCanvas.tsx file:
 *
 * 1. Add robotType to the interface:
 */

interface RoboCanvasProps {
  currentSection: SectionName;
  sectionProgress: number;
  cursorPosition: { normalizedX: number; normalizedY: number };
  showParticles?: boolean;
  transformationLevel?: number;
  onProjectHover?: number | null;
  robotType?: "cute" | "mechanical"; // 👈 ADD THIS
}

/**
 * 2. Use it in the component:
 */

export const UpdatedRoboCanvas: React.FC<RoboCanvasProps> = ({
  currentSection,
  sectionProgress,
  cursorPosition,
  showParticles = false,
  transformationLevel = 0,
  onProjectHover = null,
  robotType = "cute", // 👈 ADD THIS with default
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

          <RoboModel
            currentSection={currentSection}
            sectionProgress={sectionProgress}
            cursorPosition={cursorPosition}
            transformationLevel={transformationLevel}
            onProjectHover={onProjectHover}
            robotType={robotType} // 👈 PASS IT DOWN
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

/**
 * 3. Then use it in your page:
 */

export function PageExample() {
  return (
    <RoboCanvas
      currentSection="hero"
      sectionProgress={0}
      cursorPosition={{ normalizedX: 0, normalizedY: 0 }}
      robotType="mechanical" // 👈 USE IT HERE
    />
  );
}

// ============================================
// QUICK START: MINIMAL EXAMPLE
// ============================================

/**
 * Quickest way to see the mechanical robot:
 *
 * Just add robotType="mechanical" to your existing RoboModel usage:
 */

export function QuickStartExample() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

      <RoboModel
        currentSection="hero"
        sectionProgress={0}
        cursorPosition={{ normalizedX: 0, normalizedY: 0 }}
        robotType="mechanical" // 👈 THAT'S IT!
      />
    </Canvas>
  );
}

// ============================================
// ANIMATION EXAMPLES
// ============================================

/**
 * The mechanical robot supports all the same animations as the cute robot:
 * - Walk cycle with enhanced elbow and finger movement
 * - Run cycle with pronounced arm pumping
 * - Wave gesture with realistic elbow bend
 * - Thumbs up with proper hand articulation
 * - Breathing animation with torso expansion
 * - Transformation effects with torso rotation
 */

export function AnimationExample() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

      <RoboModel
        currentSection="hero"
        sectionProgress={0.5}
        cursorPosition={{ normalizedX: 0.2, normalizedY: -0.1 }}
        useRunAnimation={true} // Try run animation
        robotType="mechanical"
      />
    </Canvas>
  );
}

/**
 * That's it! The mechanical robot is ready to use.
 * See MECHANICAL_ROBOT_GUIDE.md for more detailed documentation.
 */
