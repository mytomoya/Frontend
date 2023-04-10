import Visualizer from "./visualizer/Visualizer";
import style from "./scss/Container.module.scss";
import GLTFCanvas from "./3dmodel/GLTFCanvas";
import History from "./history/History";
import { useState } from "react";

const Container = (): JSX.Element => {
    const [updated, setUpdated] = useState<boolean>(false);
    const [yValues, setYValues] = useState<number[]>([]);
    const [zValues, setZValues] = useState<number[]>([]);

    return (
        <div id={style.container}>
            <h1>Deadlift Form Checker</h1>
            <Visualizer
                setUpdated={setUpdated}
                yValues={yValues}
                setYValues={setYValues}
                zValues={zValues}
                setZValues={setZValues}
            />
            <GLTFCanvas yValues={yValues} />
            <History updated={updated} setUpdated={setUpdated} />
        </div>
    );
};

export default Container;
