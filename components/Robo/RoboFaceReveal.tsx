"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Load shader code
const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D robotTexture;
uniform sampler2D humanTexture;
uniform vec2 cursorUV;
uniform float revealRadius;
uniform float time;
uniform vec2 trailPositions[20];
uniform int trailCount;

varying vec2 vUv;

void main() {
  vec4 robotColor = texture2D(robotTexture, vUv);
  vec4 humanColor = texture2D(humanTexture, vUv);
  
  float reveal = 0.0;
  
  // Check current cursor position
  float distToCursor = distance(vUv, cursorUV);
  if (distToCursor < revealRadius) {
    float edge = smoothstep(revealRadius, revealRadius * 0.7, distToCursor);
    reveal = max(reveal, edge);
  }
  
  // Check trail positions with fade
  for (int i = 0; i < 20; i++) {
    if (i >= trailCount) break;
    
    float distToTrail = distance(vUv, trailPositions[i]);
    float trailFade = 1.0 - (float(i) / float(trailCount));
    
    if (distToTrail < revealRadius * trailFade) {
      float edge = smoothstep(revealRadius * trailFade, revealRadius * trailFade * 0.7, distToTrail);
      reveal = max(reveal, edge * trailFade);
    }
  }
  
  // Add glow effect at edges
  float glow = reveal * (0.5 + 0.5 * sin(time * 3.0));
  vec4 glowColor = vec4(0.0, 0.8, 1.0, 1.0);
  
  // Mix robot and human textures
  vec4 finalColor = mix(robotColor, humanColor, reveal);
  finalColor += glowColor * glow * 0.2 * (1.0 - reveal);
  
  gl_FragColor = finalColor;
}
`;

interface RoboFaceRevealProps {
  position?: [number, number, number];
  robotFaceUrl?: string;
  humanFaceUrl?: string;
  isActive?: boolean;
}

export const RoboFaceReveal: React.FC<RoboFaceRevealProps> = ({
  position = [0, 0, 0],
  robotFaceUrl = "/images/robot-face.jpg",
  humanFaceUrl = "/images/avatar.jpg",
  isActive = false,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const [cursorUV, setCursorUV] = useState(new THREE.Vector2(0.5, 0.5));
  const [trail, setTrail] = useState<THREE.Vector2[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const lastResetTime = useRef<number>(0);

  // Load textures - use placeholder if images don't exist
  const [robotTexture, humanTexture] = useMemo(() => {
    // Create default textures
    const createDefaultTexture = (color: number) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d")!;

      // Gradient background
      const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      gradient.addColorStop(0, `#${color.toString(16).padStart(6, "0")}`);
      gradient.addColorStop(1, "#000000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    return [
      createDefaultTexture(0x00d9ff), // Robot face (cyan)
      createDefaultTexture(0xffaa88), // Human face (skin tone)
    ];
  }, []);

  // Custom shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        robotTexture: { value: robotTexture },
        humanTexture: { value: humanTexture },
        cursorUV: { value: new THREE.Vector2(0.5, 0.5) },
        revealRadius: { value: 0.15 },
        time: { value: 0 },
        trailPositions: {
          value: Array(20)
            .fill(null)
            .map(() => new THREE.Vector2(0.5, 0.5)),
        },
        trailCount: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });
  }, [robotTexture, humanTexture]);

  // Track cursor position and update UV coordinates
  useFrame((state) => {
    if (!meshRef.current) return;

    // Update time uniform
    shaderMaterial.uniforms.time.value = state.clock.elapsedTime;

    // Raycast to get intersection with mesh
    const { camera, raycaster, pointer } = state;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(meshRef.current);

    if (intersects.length > 0 && intersects[0].uv) {
      const uv = intersects[0].uv;
      setCursorUV(uv);
      shaderMaterial.uniforms.cursorUV.value = uv;
      setIsHovering(true);
      lastResetTime.current = state.clock.elapsedTime;

      // Add to trail
      setTrail((prev) => {
        const newTrail = [uv.clone(), ...prev].slice(0, 20);
        shaderMaterial.uniforms.trailPositions.value = newTrail;
        shaderMaterial.uniforms.trailCount.value = newTrail.length;
        return newTrail;
      });
    } else {
      setIsHovering(false);

      // Reset trail after 2 seconds of no hover
      if (state.clock.elapsedTime - lastResetTime.current > 2) {
        setTrail([]);
        shaderMaterial.uniforms.trailCount.value = 0;
      }
    }
  });

  // Return empty group if not active, but keep hooks above for React rules
  if (!isActive) {
    return <group />;
  }

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[2, 2]} />
      <primitive object={shaderMaterial} attach="material" />

      {/* Glow effect around the face */}
      <mesh position={[0, 0, -0.1]} scale={1.1}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial
          color={0x00d9ff}
          transparent
          opacity={isHovering ? 0.2 : 0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </mesh>
  );
};
