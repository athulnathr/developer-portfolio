import React from "react";
import { useGLTF } from "@react-three/drei";

interface GLTFResult {
  nodes: Record<string, any>;
  materials: Record<string, any>;
}

//

export function ImportedRoom(props: any): JSX.Element {
  const { nodes, materials } = useGLTF(
    "./models/scene.gltf"
  ) as unknown as GLTFResult;

  return (
    <group
      {...props}
      dispose={null}
      rotation={[0, -Math.PI / 2.95, 0]}
      scale={1.95}
      position={[0, 0, 2]}
    >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.6}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Window_Glass_0.geometry}
              material={materials.Glass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Window_Window_border_0.geometry}
              material={materials.Window_border}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.TV_Screen_0.geometry}
              material={materials.Screen}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.TV_Emmisive_0.geometry}
              material={materials.Emmisive}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.TV_Led_Panel_Emmisve_0.geometry}
              material={materials.Emmisve}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.TV_Led_Panel_Emmisive_0.geometry}
              material={materials.Emmisive}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Led_Downlight_Cylinder001_LED_housing_0.geometry}
              material={materials.LED_housing}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Led_Downlight_Cylinder001_LED_emmisive_0.geometry}
              material={materials.LED_emmisive}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Led_Downlight_Cylinder003_LED_housing_0.geometry}
              material={materials.LED_housing}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Led_Downlight_Cylinder003_LED_emmisive_0.geometry}
              material={materials.LED_emmisive}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Bed_Top_Light_Bed_Top_Light_Metal_0.geometry}
              material={materials.Bed_Top_Light_Metal}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Bed_Top_Light_Bed_Top_Light_Emmision_0.geometry}
              material={materials.Bed_Top_Light_Emmision}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Wall_Base_Material_0.geometry}
            material={materials.Base_Material}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ceiling_Base_Material_0.geometry}
            material={materials.Base_Material}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Floor_Base_Material_0.geometry}
            material={materials.Base_Material}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Decal_Decal_0.geometry}
            material={materials.Decal}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bed_Lamp_Bed_Lamp_0.geometry}
            material={materials.Bed_Lamp}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bedfrozen__0.geometry}
            material={materials["Bed.frozen__0"]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./models/scene.gltf");
