import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { Suspense } from "react";

const GLTFCanvas = () => {
    const src = "./model.gltf";

    return (
        <div style={{ height: "500px" }}>
            <h2>Animation</h2>
            <Canvas>
                <OrbitControls />
                <ambientLight />
                {/* <pointLight position={[10, 10, 10]} /> */}
                <Suspense fallback={null}>
                    <Model src={src} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default GLTFCanvas;
