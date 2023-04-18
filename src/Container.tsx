import Visualizer from "./visualizer/Visualizer";
import style from "./scss/Container.module.scss";
import GLTFCanvas from "./3dmodel/GLTFCanvas";
import History from "./history/History";
import { useState } from "react";

interface Item<T> {
    value: T;
    setValue: React.Dispatch<React.SetStateAction<T>>;
}

export interface Data {
    time: Item<number[]>;
    activities: Item<boolean[]>;
    yAccValues: Item<number[]>;
    zAccValues: Item<number[]>;
    yCorrectValues: Item<boolean[]>;
    zCorrectValues: Item<boolean[]>;
}

const Container = (): JSX.Element => {
    const [updated, setUpdated] = useState<boolean>(false);

    // values sent from the server
    const [time, setTime] = useState<number[]>([]);
    const [activities, setActivities] = useState<boolean[]>([]);
    const [yAccValues, setYAccValues] = useState<number[]>([]);
    const [zAccValues, setZAccValues] = useState<number[]>([]);
    const [yCorrectValues, setYCorrectValues] = useState<boolean[]>([]);
    const [zCorrectValues, setZCorrectValues] = useState<boolean[]>([]);

    const data: Data = {
        time: { value: time, setValue: setTime },
        activities: { value: activities, setValue: setActivities },
        yAccValues: { value: yAccValues, setValue: setYAccValues },
        zAccValues: { value: zAccValues, setValue: setZAccValues },
        yCorrectValues: { value: yCorrectValues, setValue: setYCorrectValues },
        zCorrectValues: { value: zCorrectValues, setValue: setZCorrectValues },
    };

    return (
        <div id={style.container}>
            <h1>Deadlift Form Checker</h1>
            <Visualizer
                setUpdated={setUpdated}
                time={time}
                yAccValues={yAccValues}
                zAccValues={zAccValues}
                data={data}
            />
            <GLTFCanvas yAccValues={yAccValues} />
            <History updated={updated} setUpdated={setUpdated} />
        </div>
    );
};

export default Container;
