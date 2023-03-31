import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { Suspense, useState } from "react";

const GLTFCanvas = (): JSX.Element => {
    const [animate, setAniamte] = useState<boolean>(true);

    return (
        <div style={{ height: "500px" }}>
            <h2>Animation</h2>
            <button onClick={() => setAniamte(!animate)}>
                {animate ? "stop" : "start"}
            </button>
            <Canvas
                camera={{
                    fov: 50,
                    position: [0, 0, 3],
                }}
                style={{ border: "1px solid black" }}
            >
                <OrbitControls />
                <ambientLight />
                {/* <pointLight position={[10, 10, 10]} /> */}
                <Suspense fallback={null}>
                    <Model animate={animate} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default GLTFCanvas;
