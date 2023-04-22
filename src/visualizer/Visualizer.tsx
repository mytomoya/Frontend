import { useState } from "react";
import Stomp, { Subscription } from "stompjs";
import LineChart from "./LineChart";
import { connect } from "../websocket/connect";
import { Data } from "../Container";

import style from "../scss/WebSocketStomp.module.scss";

interface Item {
    topic: string;
    connected: boolean;
    stoppClient: Stomp.Client | null;
    subscription: Subscription | null;
}

interface WebSocketData {
    time: Item;
    activity: Item;
    yAcc: Item;
    zAcc: Item;
    yCorrect: Item;
    zCorrect: Item;
}

interface Props {
    setUpdated: (updated: boolean) => void;
    data: Data;
    setData: React.Dispatch<React.SetStateAction<Data>>;
}

const Visualizer = ({ setUpdated, data, setData }: Props) => {
    const [webSocketData, setWebSocketData] = useState<WebSocketData>({
        time: {
            topic: "/topic/time",
            connected: false,
            stoppClient: null,
            subscription: null,
        },
        activity: {
            topic: "/topic/activity",
            connected: false,
            stoppClient: null,
            subscription: null,
        },
        yAcc: {
            topic: "/topic/y_acc",
            connected: false,
            stoppClient: null,
            subscription: null,
        },
        zAcc: {
            topic: "/topic/z_acc",
            connected: false,
            stoppClient: null,
            subscription: null,
        },
        yCorrect: {
            topic: "/topic/y_correct",
            connected: false,
            stoppClient: null,
            subscription: null,
        },
        zCorrect: {
            topic: "/topic/z_correct",
            connected: false,
            stoppClient: null,
            subscription: null,
        },
    });

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
        for (const [key, value] of Object.entries(webSocketData)) {
            if (value.connected) {
                disconnect(
                    value.topic,
                    value.subscription,
                    value.stoppClient,
                    (newValue) =>
                        setData((previous: Data) => ({
                            ...previous,
                            [key]: newValue,
                        }))
                );
            } else {
                connect({
                    topic: value.topic,
                    setSubscription: (newValue: Subscription) =>
                        setWebSocketData((previous: WebSocketData) => ({
                            ...previous,
                            [key]: {
                                subsription: newValue,
                            },
                        })),
                    setConnected: (newValue: boolean) =>
                        setWebSocketData((previous: WebSocketData) => ({
                            ...previous,
                            [key]: {
                                connected: newValue,
                            },
                        })),
                    appendValues: (newValue: boolean | number) =>
                        setData((previous: Data) => ({
                            ...previous,
                            [key]: [
                                ...previous[key as keyof typeof previous],
                                newValue,
                            ],
                        })),
                    resetValues: () =>
                        setData((previous: Data) => ({
                            ...previous,
                            [key]: [],
                        })),
                    setStompClient: (newValue: Stomp.Client) =>
                        setWebSocketData((previous: WebSocketData) => ({
                            ...previous,
                            [key]: {
                                stompClient: newValue,
                            },
                        })),
                });
            }
        }
    };

    return (
        <>
            <div id={style.root}>
                <h2>Realtime Acceleration Visualizer</h2>
                <label className="toggle">
                    <div className="toggle-label">Connect</div>
                    <div className="toggle-button">
                        <input
                            type="checkbox"
                            checked={
                                webSocketData.yAcc.connected ||
                                webSocketData.zAcc.connected
                            }
                            onChange={toggleConnection}
                        />
                    </div>
                </label>
                <LineChart data={data} setUpdated={setUpdated} />
            </div>
        </>
    );
};

export default Visualizer;
