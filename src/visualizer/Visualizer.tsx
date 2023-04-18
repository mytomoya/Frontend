import { useState } from "react";
import Stomp, { Subscription } from "stompjs";
import LineChart from "./LineChart";
import { connect } from "../websocket/connect";
import { Data } from "../Container";

import style from "../scss/WebSocketStomp.module.scss";

interface Props {
    setUpdated: (updated: boolean) => void;
    time: number[];
    yAccValues: number[];
    zAccValues: number[];
    data: Data;
}

const Visualizer = ({
    setUpdated,
    time,
    yAccValues,
    zAccValues,
    data,
}: Props) => {
    // For time values
    const timeTopic = "/topic/time";
    const [timeConnected, setTimeConnected] = useState<boolean>(false);
    const [timeStompClient, setTimeStompClient] = useState<Stomp.Client | null>(
        null
    );
    const [timeSubscription, setTimeSubscription] =
        useState<Subscription | null>(null);

    // For activity values
    const activityTopic = "/topic/activity";
    const [activityConnected, setActivityConnected] = useState<boolean>(false);
    const [activityStompClient, setActivityStompClient] =
        useState<Stomp.Client | null>(null);
    const [activitySubscription, setActivitySubscription] =
        useState<Subscription | null>(null);

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

    // For y_correct values
    const yCorrectTopic = "/topic/y_correct";
    const [yCorrectConnected, setYCorrectConnected] = useState<boolean>(false);
    const [yCorrectStompClient, setYCorrectStompClient] =
        useState<Stomp.Client | null>(null);
    const [yCorrectSubscription, setYCorrectSubscription] =
        useState<Subscription | null>(null);

    // For z_correct values
    const zCorrectTopic = "/topic/z_correct";
    const [zCorrectConnected, setZCorrectConnected] = useState<boolean>(false);
    const [zCorrectStompClient, setZCorrectStompClient] =
        useState<Stomp.Client | null>(null);
    const [zCorrectSubscription, setZCorrectSubscription] =
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
        if (timeConnected) {
            disconnect(
                timeTopic,
                timeSubscription,
                timeStompClient,
                setTimeConnected
            );
        } else {
            connect({
                topic: timeTopic,
                setSubscription: setTimeSubscription,
                setConnected: setTimeConnected,
                setValues: data.time.setValue,
                setStompClient: setTimeStompClient,
            });
        }
        if (activityConnected) {
            disconnect(
                activityTopic,
                activitySubscription,
                activityStompClient,
                setActivityConnected
            );
        } else {
            connect({
                topic: activityTopic,
                setSubscription: setActivitySubscription,
                setConnected: setActivityConnected,
                setValues: data.activities.setValue,
                setStompClient: setActivityStompClient,
            });
        }
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
                setValues: data.yAccValues.setValue,
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
                setValues: data.zAccValues.setValue,
                setStompClient: setZAccStompClient,
            });
        }
        if (yCorrectConnected) {
            disconnect(
                yCorrectTopic,
                yCorrectSubscription,
                yCorrectStompClient,
                setYCorrectConnected
            );
        } else {
            connect({
                topic: yCorrectTopic,
                setSubscription: setYCorrectSubscription,
                setConnected: setYCorrectConnected,
                setValues: data.yCorrectValues.setValue,
                setStompClient: setYCorrectStompClient,
            });
        }
        if (zCorrectConnected) {
            disconnect(
                zCorrectTopic,
                zCorrectSubscription,
                zCorrectStompClient,
                setZCorrectConnected
            );
        } else {
            connect({
                topic: zCorrectTopic,
                setSubscription: setZCorrectSubscription,
                setConnected: setZCorrectConnected,
                setValues: data.zCorrectValues.setValue,
                setStompClient: setZCorrectStompClient,
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
                    time={time}
                    yAccValues={yAccValues}
                    zAccValues={zAccValues}
                    setUpdated={setUpdated}
                />
            </div>
        </>
    );
};

export default Visualizer;
