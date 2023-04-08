import WebSocketStomp from "./HandleWebsocket";
import style from "./scss/Container.module.scss";
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
