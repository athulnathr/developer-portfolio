"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { RoboModel } from "./RoboModel";
import { SciFiRoom } from "./SciFiRoom";
import { SciFiCameraController } from "./SciFiCameraController";
import { Chair } from "./Chair";
import { SectionName } from "@/hooks/useScrollProgress";
import { PerspectiveCamera } from "@react-three/drei";

interface SciFiRoboCanvasProps {
  currentSection: SectionName;
  sectionProgress: number;
  cursorPosition: { normalizedX: number; normalizedY: number };
  showParticles?: boolean;
  transformationLevel?: number;
  onProjectHover?: number | null;
  robotType?: "cute" | "mechanical";
  isInitialLoad?: boolean;
}

export const SciFiRoboCanvas: React.FC<SciFiRoboCanvasProps> = ({
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
    if (typeof window !== "undefined" && typeof document !== "undefined") {
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
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting setup for indoor scene */}
          <ambientLight intensity={0.3} color="#ffffff" />

          {/* Main directional light from ceiling */}
          <directionalLight
            position={[0, 8, 0]}
            intensity={0.8}
            color="#ffffff"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          {/* Fill lights */}
          <directionalLight
            position={[5, 3, 5]}
            intensity={0.3}
            color="#00d9ff"
          />
          <directionalLight
            position={[-5, 3, 5]}
            intensity={0.3}
            color="#00d9ff"
          />

          {/* Back fill */}
          <directionalLight
            position={[0, 2, -5]}
            intensity={0.2}
            color="#0088cc"
          />

          {/* Camera with SciFi Controller */}
          <PerspectiveCamera makeDefault position={[0, 3, 18]} fov={50} />
          <SciFiCameraController
            currentSection={currentSection}
            sectionProgress={sectionProgress}
            cursorPosition={cursorPosition}
            isInitialLoad={isInitialLoad}
          />

          {/* SciFi Room Environment */}
          <SciFiRoom />

          {/* Chair (always visible since robot is sitting) */}
          <Chair />

          {/* Robot */}
          <RoboModel
            currentSection={currentSection}
            sectionProgress={sectionProgress}
            cursorPosition={cursorPosition}
            transformationLevel={transformationLevel}
            onProjectHover={onProjectHover}
            robotType={robotType}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
