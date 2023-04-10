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
    // For y values
    const yTopic = "/topic/y";
    const [yConnected, setYConnected] = useState<boolean>(false);
    const [yStompClient, setYStompClient] = useState<Stomp.Client | null>(null);
    const [ySubscription, setYSubscription] = useState<Subscription | null>(
        null
    );

    // For z values
    const zTopic = "/topic/z";
    const [zConnected, setZConnected] = useState<boolean>(false);
    const [zStompClient, setZStompClient] = useState<Stomp.Client | null>(null);
    const [zSubscription, setZSubscription] = useState<Subscription | null>(
        null
    );

    const disconnect = (
        subscription: Stomp.Subscription | null,
        stompClient: Stomp.Client | null,
        setConnected: (value: React.SetStateAction<boolean>) => void
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
        if (yConnected) {
            disconnect(ySubscription, yStompClient, setYConnected);
            disconnect(zSubscription, zStompClient, setZConnected);
        } else {
            connect({
                topic: yTopic,
                setSubscription: setYSubscription,
                setConnected: setYConnected,
                setValues: setYValues,
                setStompClient: setYStompClient,
            });
            connect({
                topic: zTopic,
                setSubscription: setZSubscription,
                setConnected: setZConnected,
                setValues: setZValues,
                setStompClient: setZStompClient,
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
                            checked={yConnected || zConnected}
                            onChange={toggleConnection}
                        />
                    </div>
                </label>
                <LineChart yValues={yValues} setUpdated={setUpdated} />
            </div>
        </>
    );
};

export default Visualizer;
