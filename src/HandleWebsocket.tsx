import { useState } from "react";
import Stomp, { Frame, Message, Subscription } from "stompjs";
import style from "./css/WebSocketStomp.module.css";
import LineChart from "./LineChart";

interface Data {
    content: number;
}

const WebSocketStomp = () => {
    const topic = "/topic/value";
    const endpoint = "ws://localhost:8080/endpoint";

    const [connected, setConnected] = useState<boolean>(false);
    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const [values, setValues] = useState<number[]>([]);

    const connect = () => {
        const socket = new WebSocket(endpoint);
        const newStompClient = Stomp.over(socket);

        newStompClient.debug = () => {};

        newStompClient.connect({}, (frame?: Frame) => {
            if (frame == null) {
                return;
            }
            const subscription = newStompClient.subscribe(
                topic,
                (newMessage: Message) => {
                    console.log("Received: " + newMessage.body);

                    const item = JSON.parse(newMessage.body) as Data;
                    const value = item["content"];

                    if (!isNaN(value)) {
                        setValues((messages) => [...messages, value]);
                    }
                }
            );
            setSubscription(subscription);
            setConnected(true);
        });

        setStompClient(newStompClient);
    };

    const toggleConnection = () => {
        if (connected) {
            if (subscription) {
                subscription.unsubscribe();
            }

            if (stompClient != null) {
                stompClient.disconnect(() => {
                    console.log("disconnect");
                    setConnected(false);
                    setValues((values) => []);
                });
            }
        } else {
            connect();
        }
    };

    return (
        <>
            <div>
                <div id={style["button-wrapper"]}>
                    <button
                        onClick={toggleConnection}
                        id={style["connect-button"]}
                        className={!connected ? style.connected : ""}
                    >
                        {!connected ? "Connect" : "Disconnect"}
                    </button>
                </div>
                <LineChart data={values} />
            </div>
        </>
    );
};

export default WebSocketStomp;
