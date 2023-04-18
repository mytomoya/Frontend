import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { Suspense, useState } from "react";

import style from "../scss/GLTFCanvas.module.scss";

interface Props {
    yAccValues: number[];
}

const GLTFCanvas = ({ yAccValues }: Props): JSX.Element => {
    const [animate, setAniamte] = useState<boolean>(true);

    return (
        <div id={style.root}>
            <h2>Animation</h2>
            <label className="toggle">
                <div className="toggle-label">Start/Stop</div>
                <div className="toggle-button">
                    <input
                        type="checkbox"
                        checked={animate}
                        onChange={() => setAniamte(!animate)}
                    />
                </div>
            </label>
            <div id={style.container}>
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
                        <Model animate={animate} zValues={yAccValues} />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
};

export default GLTFCanvas;
