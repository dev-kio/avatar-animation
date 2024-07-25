import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sky,
} from "@react-three/drei";
import Avatar from "./Avatar";
import Room from "../Room";

export default function MyCanvas() {
  return (
    <div>
      <Canvas
        shadows
        style={{
          width: "100vw",
          height: "100vh",
        }}
        camera={{
          position: [0, 1, 5],
          fov: 50,
        }}
      >
        <color attach="background" args={["#ececec"]} />
        <OrbitControls />
        <Sky />
        <Environment preset="sunset" />
        <group position-y={-1}>
          <ContactShadows
            opacity={0.42}
            scale={10}
            blur={1}
            far={10}
            resolution={256}
            color="#000000"
          />
          <Avatar outfit={"blue"} animation={"Yawning"} position-x={-1} />
          <Avatar outfit={"black"} animation={"Bored"} position-z={0.5} />
          <Avatar outfit={"brown"} animation={"Talking"} position-x={1} />

          <Room />
        </group>
      </Canvas>
    </div>
  );
}
