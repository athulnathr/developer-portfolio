"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Monolith from "./Monolith";
import MonolithFragments from "./MonolithFragments";
import TechFloor from "./TechFloor";
import MouseLight from "./MouseLight";
import ParticleSystem from "./ParticleSystem";
import { generateFragments, Fragment } from "@/app/lib/monolith/fracture";
import { applyExplosionForce } from "@/app/lib/monolith/physics";
import { createMonolithGeometry } from "@/app/lib/monolith/geometry";
import {
  isMobileDevice,
  getOptimalParticleCount,
  hasGyroscope,
} from "@/app/lib/utils/deviceDetection";

interface MonolithSceneProps {
  crackStage: number;
  onCrackProgression: () => void;
  phase: "interactive" | "shattered" | "reassembling" | "complete";
  onShatter: () => void;
  onReassembleComplete: () => void;
  monolithPosition: [number, number, number];
}

export default function MonolithScene({
  crackStage,
  onCrackProgression,
  phase,
  onShatter,
  onReassembleComplete,
  monolithPosition,
}: MonolithSceneProps) {
  const [mousePosition, setMousePosition] = useState(
    new THREE.Vector3(0, 3, 5)
  );
  const [hovering, setHovering] = useState(false);
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [particleCount, setParticleCount] = useState(100);
  const shadowPosition = useRef(new THREE.Vector3(0, -2, 0));

  // Detect mobile on mount
  useEffect(() => {
    setIsMobile(isMobileDevice());
    setParticleCount(getOptimalParticleCount());
  }, []);

  // Mouse tracking for lighting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      setMousePosition(new THREE.Vector3(x * 8, y * 6 + 3, 5));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Touch tracking for mobile
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;

        setMousePosition(new THREE.Vector3(x * 8, y * 6 + 3, 5));
      }
    };

    window.addEventListener("touchmove", handleTouchMove);
    return () => window.removeEventListener("touchmove", handleTouchMove);
  }, []);

  // Gyroscope for mobile (if available)
  useEffect(() => {
    if (!hasGyroscope()) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        const x = (e.gamma / 90) * 5; // -90 to 90
        const y = ((e.beta - 45) / 45) * 3 + 3; // 0 to 90

        setMousePosition(new THREE.Vector3(x, y, 5));
      }
    };

    // Request permission for iOS 13+
    if (
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((response: string) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  // Generate fragments when shattering
  useEffect(() => {
    if (phase === "shattered" && fragments.length === 0) {
      const geometry = createMonolithGeometry();
      const newFragments = generateFragments(geometry, 10);

      // Apply explosion force
      applyExplosionForce(
        newFragments,
        new THREE.Vector3(...monolithPosition),
        2.5
      );

      setFragments(newFragments);
    }
  }, [phase, fragments.length, monolithPosition]);

  const handleMonolithClick = () => {
    if (crackStage < 2) {
      onCrackProgression();
    } else {
      // Final click - shatter
      onShatter();
    }
  };

  return (
    <>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        shadows={!isMobile}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
          ...(isMobile && { pixelRatio: Math.min(window.devicePixelRatio, 2) }),
        }}
        onPointerOver={() => setHovering(true)}
        onPointerOut={() => setHovering(false)}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <MouseLight mousePosition={mousePosition} intensity={2.5} />

          {/* Fog for atmosphere */}
          <fog attach="fog" args={["#000000", 5, 25]} />

          {/* Particle System */}
          <ParticleSystem
            count={particleCount}
            enabled={!isMobile || particleCount <= 50}
          />

          {/* Tech Floor */}
          <TechFloor
            mousePosition={mousePosition}
            shadowPosition={shadowPosition.current}
          />

          {/* Monolith (visible before shattering) */}
          {(phase === "interactive" || phase === "complete") && (
            <Monolith
              crackStage={crackStage}
              onShatter={handleMonolithClick}
              visible={true}
              position={monolithPosition}
              lightPosition={mousePosition}
            />
          )}

          {/* Fragments (visible after shattering) */}
          {(phase === "shattered" || phase === "reassembling") && (
            <MonolithFragments
              fragments={fragments}
              visible={true}
              reassembling={phase === "reassembling"}
              targetPosition={new THREE.Vector3(...monolithPosition)}
              onReassemble={onReassembleComplete}
              lightPosition={mousePosition}
            />
          )}
        </Suspense>
      </Canvas>
    </>
  );
}
