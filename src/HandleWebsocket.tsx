import { useState } from "react";
import Stomp, { Frame, Message, Subscription } from "stompjs";

const WebSocketStomp = () => {
    const topic = "/topic/message";
    const endpoint = "ws://localhost:8080/endpoint";

    const [connected, setConnected] = useState<boolean>(false);
    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const [message, setMessage] = useState<string>("");

    const connect = () => {
        const socket = new WebSocket(endpoint);
        const newStompClient = Stomp.over(socket);

        newStompClient.debug = () => {};

        newStompClient.connect({}, (frame?: Frame) => {
            if (frame != null) {
                const subscription = newStompClient.subscribe(
                    topic,
                    (newMessage: Message) => {
                        console.log("Received: " + newMessage.body);
                        setMessage(newMessage.body);
                    }
                );
                setSubscription(subscription);
                setConnected(true);
            }
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
            <div>WebSocket Stomp</div>
            <p>Received: {message}</p>
            <button onClick={toggleConnection}>
                status: {connected.toString()}
            </button>
        </>
    );
};

export default WebSocketStomp;
