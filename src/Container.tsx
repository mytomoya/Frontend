import WebSocketStomp from "./HandleWebsocket";
import style from "./css/Container.module.css";
import LineChart from "./LineChart";

const Container = () => {
    return (
        <div id={style.container}>
            <h1>Deadlift Form Checker</h1>
            <WebSocketStomp />
            <LineChart />
        </div>
    );
};

export default Container;
