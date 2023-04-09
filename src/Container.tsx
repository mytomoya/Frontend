import WebSocketStomp from "./visualizer/HandleWebsocket";
import style from "./scss/Container.module.scss";
import GLTFCanvas from "./3dmodel/GLTFCanvas";
import History from "./history/History";
import { useState } from "react";

const Container = (): JSX.Element => {
    const [updated, setUpdated] = useState<boolean>(false);
    const [values, setValues] = useState<number[]>([]);

    return (
        <div id={style.container}>
            <h1>Deadlift Form Checker</h1>
            <WebSocketStomp
                setUpdated={setUpdated}
                values={values}
                setValues={setValues}
            />
            <GLTFCanvas values={values} />
            <History updated={updated} setUpdated={setUpdated} />
        </div>
    );
};

export default Container;
