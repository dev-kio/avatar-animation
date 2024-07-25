import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sky,
} from "@react-three/drei";
import Avatar from "./Avatar";
import { useControls } from "leva";
import Room from "../Room";

export default function MyCanvas() {
  const { animation } = useControls({
    animation: {
      value: "Bored",
      options: ["Bored", "Typing", "Dancing", "Sitting", "Gunplay", "Waving"],
    },
  });

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
          <Avatar animation={animation} position-z={0.1} position-y={0.04} />
          {/* chair */}
          {["Typing", "Sitting"].includes(animation) && (
            <mesh scale={[0.8, 0.5, 0.8]} position-y={0.25}>
              <boxGeometry />
              <meshStandardMaterial color="white" />
            </mesh>
          )}
          <Room />
        </group>
      </Canvas>
    </div>
  );
}
