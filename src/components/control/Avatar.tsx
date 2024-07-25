import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTF, SkeletonUtils } from "three-stdlib";
import { useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    Wolf3D_Hair: THREE.SkinnedMesh;
    Wolf3D_Body: THREE.SkinnedMesh;
    Wolf3D_Outfit_Bottom: THREE.SkinnedMesh;
    Wolf3D_Outfit_Footwear: THREE.SkinnedMesh;
    Wolf3D_Outfit_Top: THREE.SkinnedMesh;
    EyeLeft: THREE.SkinnedMesh;
    EyeRight: THREE.SkinnedMesh;
    Wolf3D_Head: THREE.SkinnedMesh;
    Wolf3D_Teeth: THREE.SkinnedMesh;
    Hips: THREE.Bone;
  };
  materials: {
    Wolf3D_Hair: THREE.MeshStandardMaterial;
    Wolf3D_Body: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Top: THREE.MeshStandardMaterial;
    Wolf3D_Eye: THREE.MeshStandardMaterial;
    Wolf3D_Skin: THREE.MeshStandardMaterial;
    Wolf3D_Teeth: THREE.MeshStandardMaterial;
  };
  // animations: GLTFAction[];
};

export default function Avatar({ animation, ...props }: { animation: string }) {
  const { headFollow, cursorFollow, wireframe } = useControls({
    headFollow: false,
    cursorFollow: false,
    wireframe: false,
  });
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(`models/jeans.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;

  const { animations: boredAnimation } = useFBX("animations/Bored.fbx");
  const { animations: typingAnimation } = useFBX("animations/Typing.fbx");
  const { animations: dancingAnimation } = useFBX(
    "animations/Rumba Dancing.fbx"
  );
  const { animations: sittingOnChairAnimation } = useFBX(
    "animations/Female Sitting Pose.fbx"
  );
  const { animations: gunplayAnimation } = useFBX("animations/Gunplay.fbx");
  const { animations: wavingAnimation } = useFBX("animations/Waving.fbx");

  boredAnimation[0].name = "Bored";
  typingAnimation[0].name = "Typing";
  dancingAnimation[0].name = "Dancing";
  sittingOnChairAnimation[0].name = "Sitting";
  gunplayAnimation[0].name = "Gunplay";
  wavingAnimation[0].name = "Waving";

  const { actions } = useAnimations(
    [
      boredAnimation[0],
      typingAnimation[0],
      dancingAnimation[0],
      sittingOnChairAnimation[0],
      gunplayAnimation[0],
      wavingAnimation[0],
    ],
    group
  );

  useFrame((state) => {
    if (headFollow) {
      group.current.getObjectByName("Head")?.lookAt(state.camera.position);
    }
    if (cursorFollow) {
      const target = new THREE.Vector3(state.pointer.x, state.pointer.y, 1);
      group.current.getObjectByName("Spine2")?.lookAt(target);
    }
  });

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();
    return () => {
      actions[animation]?.reset().fadeOut(0.5);
    };
  }, [animation, actions]);

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.wireframe = wireframe;
    });
  }, [wireframe]);

  return (
    <group {...props} ref={group} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        frustumCulled={false}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        frustumCulled={false}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        frustumCulled={false}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        frustumCulled={false}
      />
    </group>
  );
}

useGLTF.preload("models/jeans.glb");
