// "use client";

// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// export const SciFiRoom: React.FC = () => {
//   const leftChargingStationRef = useRef<THREE.Group>(null);
//   const rightChargingStationRef = useRef<THREE.Group>(null);
//   const screenRef = useRef<THREE.Mesh>(null);
//   const ceilingLightsRef = useRef<THREE.Group>(null);

//   useFrame((state) => {
//     const time = state.clock.elapsedTime;

//     // Animate charging stations - pulsing glow
//     if (leftChargingStationRef.current) {
//       const pulse = Math.sin(time * 2) * 0.3 + 0.7;
//       leftChargingStationRef.current.children.forEach((child) => {
//         if (
//           child instanceof THREE.Mesh &&
//           child.material instanceof THREE.MeshStandardMaterial
//         ) {
//           if (child.material.emissive) {
//             child.material.emissiveIntensity = pulse;
//           }
//         }
//       });
//     }

//     if (rightChargingStationRef.current) {
//       const pulse = Math.sin(time * 2 + Math.PI) * 0.3 + 0.7;
//       rightChargingStationRef.current.children.forEach((child) => {
//         if (
//           child instanceof THREE.Mesh &&
//           child.material instanceof THREE.MeshStandardMaterial
//         ) {
//           if (child.material.emissive) {
//             child.material.emissiveIntensity = pulse;
//           }
//         }
//       });
//     }

//     // Animate screen flicker
//     if (
//       screenRef.current &&
//       screenRef.current.material instanceof THREE.MeshStandardMaterial
//     ) {
//       const flicker = Math.sin(time * 10) * 0.1 + 0.9;
//       screenRef.current.material.emissiveIntensity = flicker;
//     }

//     // Subtle ceiling light pulse
//     if (ceilingLightsRef.current) {
//       const lightPulse = Math.sin(time * 0.5) * 0.1 + 0.9;
//       ceilingLightsRef.current.children.forEach((child) => {
//         if (child instanceof THREE.PointLight) {
//           child.intensity = 0.8 * lightPulse;
//         }
//       });
//     }
//   });

//   return (
//     <group>
//       {/* Floor */}
//       <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
//         <planeGeometry args={[14, 10]} />
//         <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
//       </mesh>

//       {/* Floor panel details */}
//       {[...Array(6)].map((_, i) => (
//         <mesh
//           key={`floor-line-x-${i}`}
//           position={[-6 + i * 2.4, 0.01, 0]}
//           rotation={[-Math.PI / 2, 0, 0]}
//         >
//           <planeGeometry args={[0.02, 10]} />
//           <meshStandardMaterial
//             color="#00d9ff"
//             emissive="#00d9ff"
//             emissiveIntensity={0.3}
//           />
//         </mesh>
//       ))}
//       {[...Array(5)].map((_, i) => (
//         <mesh
//           key={`floor-line-z-${i}`}
//           position={[0, 0.01, -4 + i * 2]}
//           rotation={[-Math.PI / 2, 0, 0]}
//         >
//           <planeGeometry args={[14, 0.02]} />
//           <meshStandardMaterial
//             color="#00d9ff"
//             emissive="#00d9ff"
//             emissiveIntensity={0.3}
//           />
//         </mesh>
//       ))}

//       {/* Yellow floor markings (like in garage) */}
//       <mesh position={[-3, 0.01, 2]} rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[0.1, 3]} />
//         <meshStandardMaterial
//           color="#ffaa00"
//           emissive="#ffaa00"
//           emissiveIntensity={0.5}
//         />
//       </mesh>
//       <mesh position={[3, 0.01, 2]} rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[0.1, 3]} />
//         <meshStandardMaterial
//           color="#ffaa00"
//           emissive="#ffaa00"
//           emissiveIntensity={0.5}
//         />
//       </mesh>

//       {/* Ceiling */}
//       <mesh position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
//         <planeGeometry args={[14, 10]} />
//         <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.3} />
//       </mesh>

//       {/* Ceiling LED strips */}
//       <group ref={ceilingLightsRef}>
//         <mesh position={[-2, 5.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
//           <planeGeometry args={[0.3, 8]} />
//           <meshStandardMaterial
//             color="#ffffff"
//             emissive="#ffffff"
//             emissiveIntensity={1}
//           />
//         </mesh>
//         <pointLight
//           position={[-2, 5.8, 0]}
//           intensity={0.8}
//           color="#ffffff"
//           distance={8}
//         />

//         <mesh position={[2, 5.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
//           <planeGeometry args={[0.3, 8]} />
//           <meshStandardMaterial
//             color="#ffffff"
//             emissive="#ffffff"
//             emissiveIntensity={1}
//           />
//         </mesh>
//         <pointLight
//           position={[2, 5.8, 0]}
//           intensity={0.8}
//           color="#ffffff"
//           distance={8}
//         />
//       </group>

//       {/* Back Wall */}
//       <mesh position={[0, 3, -4]} receiveShadow>
//         <boxGeometry args={[14, 6, 0.3]} />
//         <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.4} />
//       </mesh>

//       {/* Back wall panels */}
//       {[...Array(5)].map((_, i) => (
//         <mesh key={`back-panel-${i}`} position={[-5 + i * 2.5, 3, -3.85]}>
//           <boxGeometry args={[2, 5.5, 0.1]} />
//           <meshStandardMaterial
//             color="#1a1a1a"
//             metalness={0.8}
//             roughness={0.3}
//           />
//         </mesh>
//       ))}

//       {/* Left Wall */}
//       <mesh position={[-7, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
//         <boxGeometry args={[10, 6, 0.3]} />
//         <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.4} />
//       </mesh>

//       {/* Right Wall */}
//       <mesh position={[7, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
//         <boxGeometry args={[10, 6, 0.3]} />
//         <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.4} />
//       </mesh>

//       {/* Left Charging Station */}
//       <group ref={leftChargingStationRef} position={[-5.5, 1.5, -2]}>
//         {/* Main panel */}
//         <mesh position={[0, 0, 0]}>
//           <boxGeometry args={[1, 2.5, 0.2]} />
//           <meshStandardMaterial
//             color="#2a2a2a"
//             metalness={0.9}
//             roughness={0.2}
//           />
//         </mesh>

//         {/* Screen */}
//         <mesh position={[0, 0.5, 0.15]}>
//           <boxGeometry args={[0.7, 0.5, 0.05]} />
//           <meshStandardMaterial
//             color="#001a33"
//             emissive="#00d9ff"
//             emissiveIntensity={0.8}
//           />
//         </mesh>

//         {/* Power indicator lights */}
//         {[0, 1, 2, 3].map((i) => (
//           <mesh key={`left-light-${i}`} position={[0, -0.5 - i * 0.3, 0.15]}>
//             <boxGeometry args={[0.6, 0.15, 0.05]} />
//             <meshStandardMaterial
//               color="#003366"
//               emissive="#00d9ff"
//               emissiveIntensity={0.6}
//             />
//           </mesh>
//         ))}

//         {/* Charging port */}
//         <mesh position={[0, -0.8, 0.2]}>
//           <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
//           <meshStandardMaterial
//             color="#00d9ff"
//             emissive="#00d9ff"
//             emissiveIntensity={1}
//             metalness={1}
//             roughness={0.1}
//           />
//         </mesh>

//         <pointLight
//           position={[0, 0, 0.5]}
//           intensity={1.2}
//           color="#00d9ff"
//           distance={3}
//         />
//       </group>

//       {/* Right Charging Station */}
//       <group ref={rightChargingStationRef} position={[5.5, 1.5, -2]}>
//         {/* Main panel */}
//         <mesh position={[0, 0, 0]}>
//           <boxGeometry args={[1, 2.5, 0.2]} />
//           <meshStandardMaterial
//             color="#2a2a2a"
//             metalness={0.9}
//             roughness={0.2}
//           />
//         </mesh>

//         {/* Screen */}
//         <mesh position={[0, 0.5, 0.15]}>
//           <boxGeometry args={[0.7, 0.5, 0.05]} />
//           <meshStandardMaterial
//             color="#001a33"
//             emissive="#00d9ff"
//             emissiveIntensity={0.8}
//           />
//         </mesh>

//         {/* Power indicator lights */}
//         {[0, 1, 2, 3].map((i) => (
//           <mesh key={`right-light-${i}`} position={[0, -0.5 - i * 0.3, 0.15]}>
//             <boxGeometry args={[0.6, 0.15, 0.05]} />
//             <meshStandardMaterial
//               color="#003366"
//               emissive="#00d9ff"
//               emissiveIntensity={0.6}
//             />
//           </mesh>
//         ))}

//         {/* Charging port */}
//         <mesh position={[0, -0.8, 0.2]}>
//           <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
//           <meshStandardMaterial
//             color="#00d9ff"
//             emissive="#00d9ff"
//             emissiveIntensity={1}
//             metalness={1}
//             roughness={0.1}
//           />
//         </mesh>

//         <pointLight
//           position={[0, 0, 0.5]}
//           intensity={1.2}
//           color="#00d9ff"
//           distance={3}
//         />
//       </group>

//       {/* Main Display Screen on back wall */}
//       <mesh ref={screenRef} position={[0, 3.5, -3.85]}>
//         <boxGeometry args={[4, 2, 0.1]} />
//         <meshStandardMaterial
//           color="#001a33"
//           emissive="#00d9ff"
//           emissiveIntensity={0.7}
//         />
//       </mesh>

//       {/* Screen frame */}
//       <mesh position={[0, 3.5, -3.8]}>
//         <boxGeometry args={[4.3, 2.3, 0.15]} />
//         <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
//       </mesh>

//       {/* Equipment boxes - left side */}
//       <mesh position={[-6, 0.3, 2]} castShadow>
//         <boxGeometry args={[0.8, 0.6, 0.6]} />
//         <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.4} />
//       </mesh>

//       {/* Equipment boxes - right side */}
//       <mesh position={[6, 0.3, 1.5]} castShadow>
//         <boxGeometry args={[0.7, 0.6, 0.8]} />
//         <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.4} />
//       </mesh>
//       <mesh position={[6, 0.9, 1.5]} castShadow>
//         <boxGeometry args={[0.5, 0.4, 0.6]} />
//         <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
//       </mesh>

//       {/* Door panel on back wall */}
//       <mesh position={[4, 2, -3.9]}>
//         <boxGeometry args={[1.5, 4, 0.1]} />
//         <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
//       </mesh>

//       {/* Door frame accent */}
//       <mesh position={[4, 2, -3.85]}>
//         <boxGeometry args={[1.6, 4.1, 0.05]} />
//         <meshStandardMaterial
//           color="#00d9ff"
//           emissive="#00d9ff"
//           emissiveIntensity={0.2}
//           metalness={1}
//           roughness={0.1}
//         />
//       </mesh>

//       {/* Door control panel */}
//       <mesh position={[3, 2, -3.85]}>
//         <boxGeometry args={[0.2, 0.4, 0.05]} />
//         <meshStandardMaterial
//           color="#003366"
//           emissive="#00d9ff"
//           emissiveIntensity={0.8}
//         />
//       </mesh>

//       {/* Wall shelves on right wall */}
//       <group position={[6.8, 2.5, -1]}>
//         {[0, 1, 2, 3].map((i) => (
//           <mesh key={`shelf-${i}`} position={[0, 0, i * 0.5]}>
//             <boxGeometry args={[0.15, 0.4, 0.4]} />
//             <meshStandardMaterial
//               color="#1a1a1a"
//               metalness={0.8}
//               roughness={0.3}
//             />
//           </mesh>
//         ))}
//       </group>

//       {/* Additional ambient lighting */}
//       <pointLight
//         position={[0, 3.5, -3.5]}
//         intensity={0.5}
//         color="#00d9ff"
//         distance={5}
//       />
//       <pointLight
//         position={[-5, 2, 0]}
//         intensity={0.3}
//         color="#00d9ff"
//         distance={6}
//       />
//       <pointLight
//         position={[5, 2, 0]}
//         intensity={0.3}
//         color="#00d9ff"
//         distance={6}
//       />

//       {/* Rim lights for depth */}
//       <pointLight
//         position={[-6, 4, 3]}
//         intensity={0.2}
//         color="#0088cc"
//         distance={8}
//       />
//       <pointLight
//         position={[6, 4, 3]}
//         intensity={0.2}
//         color="#0088cc"
//         distance={8}
//       />
//     </group>
//   );
// };
"use client";

import { useRef } from "react";
import * as THREE from "three";

export const SciFiRoom: React.FC = () => {
  return (
    <group>
      {/* Floor - subtly glossy, light concrete */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial
          color="#ececec"
          metalness={0.83}
          roughness={0.26}
          envMapIntensity={0.55}
        />
      </mesh>

      {/* Panel grid lines - faint blue glow */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={`floor-line-x-${i}`}
          position={[-6 + i * 2.4, 0.011, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.02, 10]} />
          <meshStandardMaterial
            color="#b9e9ff"
            emissive="#b9e9ff"
            emissiveIntensity={0.17}
            metalness={0.9}
            roughness={0.18}
          />
        </mesh>
      ))}
      {[...Array(5)].map((_, i) => (
        <mesh
          key={`floor-line-z-${i}`}
          position={[0, 0.011, -4 + i * 2]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[14, 0.02]} />
          <meshStandardMaterial
            color="#b9e9ff"
            emissive="#b9e9ff"
            emissiveIntensity={0.17}
            metalness={0.9}
            roughness={0.18}
          />
        </mesh>
      ))}

      {/* Yellow markings - shiny paint */}
      <mesh position={[-3, 0.012, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 3]} />
        <meshStandardMaterial
          color="#f3c662"
          emissive="#f3c662"
          emissiveIntensity={0.25}
          metalness={0.95}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[3, 0.012, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 3]} />
        <meshStandardMaterial
          color="#f3c662"
          emissive="#f3c662"
          emissiveIntensity={0.25}
          metalness={0.95}
          roughness={0.25}
        />
      </mesh>

      {/* Walls - not too flat, add panel seams */}
      <mesh position={[0, 3, -4]} receiveShadow>
        <boxGeometry args={[14, 6, 0.3]} />
        <meshStandardMaterial
          color="#e3e3e3"
          metalness={0.7}
          roughness={0.41}
        />
      </mesh>
      {/* Wall panels/seams */}
      {[...Array(5)].map((_, i) => (
        <mesh key={`back-panel-${i}`} position={[-5 + i * 2.5, 3, -3.85]}>
          <boxGeometry args={[2, 5.5, 0.1]} />
          <meshStandardMaterial
            color="#dee4ec"
            metalness={0.66}
            roughness={0.36}
          />
        </mesh>
      ))}

      {/* Ceiling - glossy white, soft reflections */}
      <mesh position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial
          color="#f8f9fa"
          metalness={0.82}
          roughness={0.26}
        />
      </mesh>

      {/* Ceiling LED strips - soft white */}
      <mesh position={[-2, 5.94, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 8]} />
        <meshStandardMaterial
          color="#f5ffff"
          emissive="#e8faff"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.18}
        />
      </mesh>
      <mesh position={[2, 5.94, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 8]} />
        <meshStandardMaterial
          color="#f5ffff"
          emissive="#e8faff"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.18}
        />
      </mesh>

      {/* Side and end walls */}
      <mesh position={[-7, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 6, 0.3]} />
        <meshStandardMaterial
          color="#e0e0e0"
          metalness={0.65}
          roughness={0.22}
        />
      </mesh>
      <mesh position={[7, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 6, 0.3]} />
        <meshStandardMaterial
          color="#e0e0e0"
          metalness={0.65}
          roughness={0.22}
        />
      </mesh>

      {/* --- Furniture Upgrades --- */}
      {/* Desk - glass + modern legs */}
      <mesh position={[-3, 0.62, -3]} castShadow>
        <boxGeometry args={[2.4, 0.07, 0.7]} />
        <meshStandardMaterial
          color="#d6f5fd"
          metalness={0.17}
          roughness={0.06}
          transparent
          opacity={0.77}
        />
      </mesh>
      <mesh position={[-3, 0.31, -3.2]} castShadow>
        <boxGeometry args={[0.2, 0.62, 0.2]} />
        <meshStandardMaterial
          color="#c3cbcd"
          metalness={0.89}
          roughness={0.22}
        />
      </mesh>
      <mesh position={[-2.2, 0.31, -3.2]} castShadow>
        <boxGeometry args={[0.2, 0.62, 0.2]} />
        <meshStandardMaterial
          color="#b9bec2"
          metalness={0.89}
          roughness={0.22}
        />
      </mesh>

      {/* Storage drawer - detailed */}
      <mesh position={[3.2, 0.38, -2]}>
        <boxGeometry args={[1.3, 0.45, 0.47]} />
        <meshStandardMaterial
          color="#f1f2f3"
          metalness={0.5}
          roughness={0.32}
        />
      </mesh>
      {/* Drawer handles */}
      {[...Array(3)].map((_, i) => (
        <mesh
          key={`drawer-handle-${i}`}
          position={[2.7 + i * 0.35, 0.48, -1.8]}
        >
          <boxGeometry args={[0.21, 0.05, 0.02]} />
          <meshStandardMaterial
            color="#aeb7bd"
            metalness={0.98}
            roughness={0.14}
          />
        </mesh>
      ))}

      {/* Display screen (simple, glossy, dark) */}
      <mesh position={[0, 2.85, -3.85]}>
        <boxGeometry args={[3.2, 1.5, 0.11]} />
        <meshStandardMaterial
          color="#202426"
          emissive="#f6f7fa"
          emissiveIntensity={0.06}
          metalness={0.78}
          roughness={0.22}
          envMapIntensity={0.37}
        />
      </mesh>
      {/* Screen frame */}
      <mesh position={[0, 2.85, -3.78]}>
        <boxGeometry args={[3.35, 1.65, 0.17]} />
        <meshStandardMaterial
          color="#c7ccd1"
          metalness={0.85}
          roughness={0.13}
        />
      </mesh>

      {/* Wall charging stations, minimal */}
      <group position={[-5.5, 1.5, -2]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 2.5, 0.22]} />
          <meshStandardMaterial
            color="#ddeaf6"
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0, 0.78, 0.16]}>
          <boxGeometry args={[0.7, 0.49, 0.08]} />
          <meshStandardMaterial
            color="#a8dcee"
            emissive="#e4f9fc"
            emissiveIntensity={0.17}
          />
        </mesh>
      </group>
      <group position={[5.5, 1.5, -2]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 2.5, 0.22]} />
          <meshStandardMaterial
            color="#ddeaf6"
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0, 0.78, 0.16]}>
          <boxGeometry args={[0.7, 0.49, 0.08]} />
          <meshStandardMaterial
            color="#a8dcee"
            emissive="#e4f9fc"
            emissiveIntensity={0.17}
          />
        </mesh>
      </group>

      {/* Soft ambient light for furniture realism */}
      <ambientLight intensity={0.42} color="#e9eaec" />
      <pointLight
        position={[0, 4.7, 0]}
        intensity={0.3}
        color="#ffffff"
        distance={12}
      />
      <pointLight
        position={[-4, 1.2, -2]}
        intensity={0.13}
        color="#e9eaec"
        distance={7}
      />
      <pointLight
        position={[4, 1.2, -2]}
        intensity={0.13}
        color="#e9eaec"
        distance={7}
      />
    </group>
  );
};
