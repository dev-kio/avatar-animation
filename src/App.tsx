import { Suspense, useState } from "react";
import { default as ControlCanvas } from "./components/control/Canvas";
import { default as RandomCanvas } from "./components/random/Canvas";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

type ModeType = "CONTROL" | "RANDOM";

function App() {
  const [mode, setMode] = useState<ModeType>("CONTROL");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        caretColor: "transparent",
      }}
    >
      <div
        style={{
          margin: "10px",
          position: "absolute",
          zIndex: 1,
        }}
      >
        Switch to
        <button
          style={{
            marginLeft: "5px",
            marginRight: "5px",
          }}
          onClick={() =>
            mode === "CONTROL" ? setMode("RANDOM") : setMode("CONTROL")
          }
        >
          {mode === "CONTROL" ? "RANDOM CLICK" : "CONTROL"}
        </button>
        mode
      </div>
      <Suspense fallback={<Loading />}>
        {mode === "CONTROL" ? <ControlCanvas /> : <RandomCanvas />}
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
