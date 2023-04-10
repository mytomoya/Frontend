import Stomp, { Frame, Message } from "stompjs";

const endpoint = "ws://localhost:8080/endpoint";

interface Props {
    topic: string;
    setSubscription: (
        value: React.SetStateAction<Stomp.Subscription | null>
    ) => void;
    setConnected: (value: React.SetStateAction<boolean>) => void;
    setValues: (value: React.SetStateAction<number[]>) => void;
    setStompClient: React.Dispatch<React.SetStateAction<Stomp.Client | null>>;
}

export const connect = ({
    topic,
    setSubscription,
    setConnected,
    setValues,
    setStompClient,
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
                    setValues((oldValues) => [...oldValues, value]);
                }
            }
        );

        setSubscription(subscription);
        setConnected(true);
        setValues([]);
    });

    setStompClient(newStompClient);
};
