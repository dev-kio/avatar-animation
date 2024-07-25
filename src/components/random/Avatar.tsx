import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTF, SkeletonUtils } from "three-stdlib";

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

export default function Avatar({
  outfit,
  animation,
  ...props
}: {
  outfit: string;
  animation: string;
}) {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(`models/${outfit}.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;

  const { animations: boredAnimation } = useFBX("animations/Bored.fbx");
  const { animations: bboyAnimation } = useFBX(
    "animations/Bboy Hip Hop Move.fbx"
  );
  const { animations: fallingAnimation } = useFBX("animations/Fall Flat.fbx");
  const { animations: salsaAnimation } = useFBX("animations/Salsa Dancing.fbx");
  const { animations: surprisedAnimation } = useFBX("animations/Surprised.fbx");
  const { animations: walkingAnimation } = useFBX(
    "animations/Wheelbarrow Walk.fbx"
  );
  const { animations: talkingAnimation } = useFBX("animations/Talking.fbx");
  const { animations: ymcaAnimation } = useFBX("animations/Ymca Dance.fbx");
  const { animations: yawningAnimation } = useFBX("animations/Yawn.fbx");
  const { animations: sambaAnimation } = useFBX("animations/Samba Dancing.fbx");
  const { animations: knockedoutAnimation } = useFBX(
    "animations/Falling Back Death.fbx"
  );

  boredAnimation[0].name = "Bored";
  bboyAnimation[0].name = "Bboy";
  fallingAnimation[0].name = "Falling";
  salsaAnimation[0].name = "Salsa";
  surprisedAnimation[0].name = "Surprised";
  walkingAnimation[0].name = "Walking";
  talkingAnimation[0].name = "Talking";
  ymcaAnimation[0].name = "Ymca";
  yawningAnimation[0].name = "Yawning";
  sambaAnimation[0].name = "Samba";
  knockedoutAnimation[0].name = "Knocked Out";

  const { actions } = useAnimations(
    [
      bboyAnimation[0],
      boredAnimation[0],
      fallingAnimation[0],
      salsaAnimation[0],
      surprisedAnimation[0],
      walkingAnimation[0],
      talkingAnimation[0],
      ymcaAnimation[0],
      yawningAnimation[0],
      sambaAnimation[0],
      knockedoutAnimation[0],
    ],
    group
  );

  const myAnimations = [
    "Bboy",
    "Falling",
    "Salsa",
    "Surprised",
    "Walking",
    "Talking",
    "Ymca",
    "Yawning",
    "Samba",
    "Knocked Out",
  ];

  useEffect(() => {
    actions[animation]?.reset().play();
  }, [actions, animation]);

  function playModifierAnimation(
    from: THREE.AnimationAction,
    to: THREE.AnimationAction,
    speed: number
  ) {
    to.setLoop(THREE.LoopOnce, 1);
    to.reset();
    to.play();
    from.crossFadeTo(to, speed, true);

    setTimeout(
      function () {
        from.enabled = true;
        to.crossFadeTo(from, speed, true);
      },
      // to.getClip().duration * 1000 - speed * 1000,
      to.getClip().duration * 1000
    );
  }

  const getRandomAnimation = () => {
    const randomNum = Math.floor(Math.random() * myAnimations.length) + 0;
    const randomAnim = myAnimations[randomNum];
    const randomAct = actions[randomAnim];
    return randomAct;
  };

  return (
    <group {...props} ref={group} dispose={null}>
      <group
        onClick={() =>
          playModifierAnimation(
            actions[animation] as THREE.AnimationAction,
            getRandomAnimation() as THREE.AnimationAction,
            0.5
          )
        }
      >
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
    </group>
  );
}

useGLTF.preload(`models/blue.glb`);
useGLTF.preload(`models/black.glb`);
useGLTF.preload(`models/brown.glb`);
