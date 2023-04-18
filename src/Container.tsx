import Visualizer from "./visualizer/Visualizer";
import style from "./scss/Container.module.scss";
import GLTFCanvas from "./3dmodel/GLTFCanvas";
import History from "./history/History";
import { useState } from "react";

const Container = (): JSX.Element => {
    const [updated, setUpdated] = useState<boolean>(false);

    // values sent from the server
    const [time, setTime] = useState<number[]>([]);
    const [activities, setActivities] = useState<boolean[]>([]);
    const [yAccValues, setYAccValues] = useState<number[]>([]);
    const [zAccValues, setZAccValues] = useState<number[]>([]);
    const [yCorrectValues, setYCorrectValues] = useState<boolean[]>([]);
    const [zCorrectValues, setZCorrectValues] = useState<boolean[]>([]);

    return (
        <div id={style.container}>
            <h1>Deadlift Form Checker</h1>
            <Visualizer
                setUpdated={setUpdated}
                setTime={setTime}
                time={time}
                activities={activities}
                setActivities={setActivities}
                yAccValues={yAccValues}
                setYAccValues={setYAccValues}
                zAccValues={zAccValues}
                setZAccValues={setZAccValues}
                yCorrectValues={yCorrectValues}
                setYCorrectValues={setYCorrectValues}
                zCorrectValues={zCorrectValues}
                setZCorrectValues={setZCorrectValues}
            />
            <GLTFCanvas yAccValues={yAccValues} />
            <History updated={updated} setUpdated={setUpdated} />
        </div>
    );
};

export default Container;
