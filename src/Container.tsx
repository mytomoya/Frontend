import WebSocketStomp from "./visualizer/HandleWebsocket";
import style from "./scss/Container.module.scss";
import GLTFCanvas from "./3dmodel/GLTFCanvas";
import History from "./history/History";

const Container = (): JSX.Element => {
    return (
        <div id={style.container}>
            <h1>Deadlift Form Checker</h1>
            <WebSocketStomp />
            <GLTFCanvas />
            <History />
        </div>
    );
};

export default Container;
