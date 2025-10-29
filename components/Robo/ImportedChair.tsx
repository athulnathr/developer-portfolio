//create and load the imported chair, models/chair.gltf

import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

export function ImportedChair(props: any): JSX.Element {
  const { nodes, materials } = useGLTF("./models/chair.gltf");
  const groupRef = useRef<THREE.Group>(null);
  return (
    <group
      ref={groupRef}
      {...props}
      dispose={null}
      position={[0, 1, 1]}
      style={{ backgroundColor: "red" }}
      name="ImportedChair"
    >
      {/* Subtle accent glow on seat edge */}
      <pointLight
        position={[0, 0.4, 0.4]}
        intensity={0.3}
        color="#00d9ff"
        distance={1}
      />
      <mesh
        position={[0, 0.4, 0]}
        castShadow
        receiveShadow
        material={materials.MaterialTest}
      />
    </group>
  );
}

useGLTF.preload("./models/chair.gltf");
