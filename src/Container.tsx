import Visualizer from "./visualizer/Visualizer";
import style from "./scss/Container.module.scss";
import GLTFCanvas from "./3dmodel/GLTFCanvas";
import History from "./history/History";
import { useState } from "react";

const Container = (): JSX.Element => {
    const [updated, setUpdated] = useState<boolean>(false);
    const [yAccValues, setYAccValues] = useState<number[]>([]);
    const [zAccValues, setZAccValues] = useState<number[]>([]);

    return (
        <div id={style.container}>
            <h1>Deadlift Form Checker</h1>
            <Visualizer
                setUpdated={setUpdated}
                yAccValues={yAccValues}
                setYAccValues={setYAccValues}
                zAccValues={zAccValues}
                setZAccValues={setZAccValues}
            />
            <GLTFCanvas yAccValues={yAccValues} />
            <History updated={updated} setUpdated={setUpdated} />
        </div>
    );
};

export default Container;
