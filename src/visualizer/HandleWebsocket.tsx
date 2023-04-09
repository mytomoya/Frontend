import { useState } from "react";
import Stomp, { Frame, Message, Subscription } from "stompjs";
import LineChart from "./LineChart";

import style from "../scss/WebSocketStomp.module.scss";

interface Props {
    setUpdated: (updated: boolean) => void;
    values: number[];
    setValues: React.Dispatch<React.SetStateAction<number[]>>;
}

interface Data {
    content: number;
}

const WebSocketStomp = ({ setUpdated, values, setValues }: Props) => {
    const topic = "/topic/value";
    const endpoint = "ws://localhost:8080/endpoint";

    const [connected, setConnected] = useState<boolean>(false);
    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

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
                        setValues((oldValues) => [...oldValues, value]);
                    }
                }
            );
            setSubscription(subscription);
            setConnected(true);
            setValues((values) => []);
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
                });
            }
        } else {
            connect();
        }
    };

    return (
        <>
            <div id={style.root}>
                <h2>Realtime () Visualizer</h2>
                <label className="toggle">
                    <div className="toggle-label">Connect</div>
                    <div className="toggle-button">
                        <input
                            type="checkbox"
                            checked={connected}
                            onChange={toggleConnection}
                        />
                    </div>
                </label>
                <LineChart data={values} setUpdated={setUpdated} />
            </div>
        </>
    );
};

export default WebSocketStomp;
