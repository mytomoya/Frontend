import WebSocketStomp from "./HandleWebsocket";
import style from "./css/Container.module.css";
import GLTFCanvas from "./3dmodel/GLTFCanvas";

const Container = (): JSX.Element => {
    return (
        <div id={style.container}>
            <h1>Deadlift Form Checker</h1>
            <WebSocketStomp />
            <GLTFCanvas />
        </div>
    );
};

export default Container;
