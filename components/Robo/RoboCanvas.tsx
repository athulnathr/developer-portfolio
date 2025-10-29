"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { RoboModel } from "./RoboModel";
import { ParticleSystem } from "./ParticleSystem";
import { HeroEnvironment } from "../effects/HeroEnvironment";
import { OrbitalCameraController } from "./OrbitalCameraController";
import { SectionStations } from "./SectionStations";
import { Chair } from "./Chair";
import { SectionName } from "@/hooks/useScrollProgress";
import { PerspectiveCamera } from "@react-three/drei";

interface RoboCanvasProps {
  currentSection: SectionName;
  sectionProgress: number;
  cursorPosition: { normalizedX: number; normalizedY: number };
  showParticles?: boolean;
  transformationLevel?: number;
  onProjectHover?: number | null;
  robotType?: "cute" | "mechanical";
  isInitialLoad?: boolean;
}

export const RoboCanvas: React.FC<RoboCanvasProps> = ({
  currentSection,
  sectionProgress,
  cursorPosition,
  showParticles = false,
  transformationLevel = 0,
  onProjectHover = null,
  robotType = "cute",
  isInitialLoad = false,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're in the browser and DOM is ready
    // Add a small delay to ensure React and all dependencies are fully initialized
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      // Use requestAnimationFrame to ensure the DOM is ready
      requestAnimationFrame(() => {
        setIsClient(true);
      });
    }
  }, []);

  // Don't render until we're sure we're in the browser and React is ready
  if (!isClient) {
    return null;
  }

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
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />

          {/* Camera with Orbital Controller */}
          <PerspectiveCamera makeDefault position={[0, 1.5, 12]} fov={50} />
          <OrbitalCameraController
            currentSection={currentSection}
            sectionProgress={sectionProgress}
            cursorPosition={cursorPosition}
            isInitialLoad={isInitialLoad}
          />

          {/* Hero Environment (always visible) */}
          <HeroEnvironment />

          {/* Chair (visible in hero section) */}
          {currentSection === "hero" && <Chair />}

          {/* Section Stations */}
          <SectionStations
            currentSection={currentSection}
            sectionProgress={sectionProgress}
          />

          {/* Robot */}
          <RoboModel
            currentSection={currentSection}
            sectionProgress={sectionProgress}
            cursorPosition={cursorPosition}
            transformationLevel={transformationLevel}
            onProjectHover={onProjectHover}
            robotType={robotType}
          />

          {/* Particle Effects */}
          <ParticleSystem
            count={100}
            position={[0, 0, 0]}
            active={showParticles}
          />

          {/* Optional: Enable for development/debugging */}
          {/* <OrbitControls /> */}
        </Suspense>
      </Canvas>
    </div>
  );
};
