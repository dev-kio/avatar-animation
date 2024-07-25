import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function Room() {
  const floorTexture = useLoader(THREE.TextureLoader, "concrete.png");
  const wallTexture = useLoader(THREE.TextureLoader, "waves.png");

  return (
    <>
      {/* floor */}
      <mesh scale={5} rotation-x={-Math.PI * 0.5} position-y={-0.001}>
        <planeGeometry />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      {/* back wall */}
      <mesh scale={5} position-z={-2.5} position-y={2.5}>
        <planeGeometry />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      {/* right wall */}
      <mesh
        scale={5}
        rotation-y={-Math.PI * 0.5}
        position-x={2.5}
        position-y={2.5}
      >
        <planeGeometry />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      {/* left wall */}
      <mesh
        scale={5}
        rotation-y={-Math.PI * 0.5}
        position-x={-2.5}
        position-y={2.5}
      >
        <planeGeometry />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
    </>
  );
}
