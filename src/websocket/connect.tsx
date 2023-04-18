import Stomp, { Frame, Message } from "stompjs";

const endpoint = "ws://localhost:8080/endpoint";

interface Props {
    topic: string;
    setSubscription: (value: Stomp.Subscription) => void;
    setConnected: (value: boolean) => void;
    appendValues: (value: boolean | number) => void;
    resetValues: () => void;
    setStompClient: (value: Stomp.Client) => void;
}

export const connect = ({
    topic,
    setSubscription,
    setConnected,
    setStompClient,
    appendValues,
    resetValues,
}: Props) => {
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
                console.log(`[${topic}] Received: ${newMessage.body}`);
                const value = parseFloat(newMessage.body);

                if (!isNaN(value)) {
                    appendValues(value);
                }
            }
        );

        setSubscription(subscription);
        setConnected(true);
        resetValues();
    });

    setStompClient(newStompClient);
};
