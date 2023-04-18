import Visualizer from "./visualizer/Visualizer";
import style from "./scss/Container.module.scss";
import GLTFCanvas from "./3dmodel/GLTFCanvas";
import History from "./history/History";
import { useState } from "react";


export interface Data {
    time: number[];
    activities: boolean[];
    yAcc: number[];
    zAcc: number[];
    yCorrect: boolean[];
    zCorrect: boolean[];
}

const Container = (): JSX.Element => {
    const [updated, setUpdated] = useState<boolean>(false);

    // values sent from the server
    const [data, setData] = useState<Data>({
        time: [],
        activities: [],
        yAcc: [],
        zAcc: [],
        yCorrect: [],
        zCorrect: [],
    });


    return (
        <div id={style.container}>
            <h1>Deadlift Form Checker</h1>
            <Visualizer setUpdated={setUpdated} data={data} setData={setData} />
            <GLTFCanvas yAccValues={data.yAcc} />
            <History updated={updated} setUpdated={setUpdated} />
        </div>
    );
};

export default Container;
