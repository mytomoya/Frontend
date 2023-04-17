import { useState } from "react";
import Stomp, { Subscription } from "stompjs";
import LineChart from "./LineChart";
import { connect } from "../websocket/connect";

import style from "../scss/WebSocketStomp.module.scss";

interface Props {
    setUpdated: (updated: boolean) => void;
    yValues: number[];
    setYValues: React.Dispatch<React.SetStateAction<number[]>>;
    zValues: number[];
    setZValues: React.Dispatch<React.SetStateAction<number[]>>;
}

const Visualizer = ({
    setUpdated,
    yValues,
    setYValues,
    zValues,
    setZValues,
}: Props) => {
    // For y_acc values
    const yAccTopic = "/topic/y_acc";
    const [yAccConnected, setYAccConnected] = useState<boolean>(false);
    const [yAccStompClient, setYAccStompClient] = useState<Stomp.Client | null>(
        null
    );
    const [yAccSubscription, setAccYSubscription] =
        useState<Subscription | null>(null);

    // For z_acc values
    const zAccTopic = "/topic/z_acc";
    const [zAccConnected, setZAccConnected] = useState<boolean>(false);
    const [zAccStompClient, setZAccStompClient] = useState<Stomp.Client | null>(
        null
    );
    const [zAccSubscription, setZAccSubscription] =
        useState<Subscription | null>(null);

    const disconnect = (
        topic: string,
        subscription: Stomp.Subscription | null,
        stompClient: Stomp.Client | null,
        setConnected: (value: React.SetStateAction<boolean>) => void
    ) => {
        if (subscription) {
            subscription.unsubscribe();
        }

        if (stompClient != null) {
            stompClient.disconnect(() => {
                console.log(`disconnect from ${topic}`);
                setConnected(false);
            });
        }
    };

    const toggleConnection = () => {
        if (yAccConnected) {
            disconnect(
                yAccTopic,
                yAccSubscription,
                yAccStompClient,
                setYAccConnected
            );
        } else {
            connect({
                topic: yAccTopic,
                setSubscription: setAccYSubscription,
                setConnected: setYAccConnected,
                setValues: setYValues,
                setStompClient: setYAccStompClient,
            });
        }
        if (zAccConnected) {
            disconnect(
                zAccTopic,
                zAccSubscription,
                zAccStompClient,
                setZAccConnected
            );
        } else {
            connect({
                topic: zAccTopic,
                setSubscription: setZAccSubscription,
                setConnected: setZAccConnected,
                setValues: setZValues,
                setStompClient: setZAccStompClient,
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
                            checked={yAccConnected || zAccConnected}
                            onChange={toggleConnection}
                        />
                    </div>
                </label>
                <LineChart
                    yValues={yValues}
                    zValues={zValues}
                    setUpdated={setUpdated}
                />
            </div>
        </>
    );
};

export default Visualizer;
