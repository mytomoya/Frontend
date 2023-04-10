import { useState } from "react";
import Stomp, { Subscription } from "stompjs";
import LineChart from "./LineChart";
import { connect } from "../websocket/connect";

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

    const [connected, setConnected] = useState<boolean>(false);
    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const disconnect = (
        subscription: Stomp.Subscription | null,
        stompClient: Stomp.Client | null
    ) => {
        if (subscription) {
            subscription.unsubscribe();
        }

        if (stompClient != null) {
            stompClient.disconnect(() => {
                console.log("disconnect");
                setConnected(false);
            });
        }
    };

    const toggleConnection = () => {
        if (connected) {
            disconnect(subscription, stompClient);
        } else {
            connect({
                topic: topic,
                setSubscription: setSubscription,
                setConnected: setConnected,
                setValues: setValues,
                setStompClient: setStompClient,
            });
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
