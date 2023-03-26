import WebSocketStomp from "./HandleWebsocket";
import style from "./css/Container.module.css";

const Container = () => {
    return (
        <div id={style.container}>
            <h1>Deadlift Form Checker</h1>
            <WebSocketStomp />
        </div>
    );
};

export default Container;
