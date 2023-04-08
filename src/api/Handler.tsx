import axios from "axios";

const endpoint = "http://localhost:8080";

interface Props {
    name: string;
    data: {
        x: number;
        y: number;
    }[];
}

export const save = async ({ data }: Props): Promise<boolean> => {
    const time = data.map((value) => {
        return value.x;
    });
    const values = data.map((value) => {
        return value.y;
    });

    if (time.length === 0 || values.length === 0) {
        console.log(`No data to send\ntime: ${time}\nvalues: ${values}`);
        return false;
    }

    try {
        const response = axios.post(endpoint + "/add", {
            time: time,
            values: values,
        });
        console.log(response);
        return true;
    } catch (error) {
        console.log(`[Error] ${error}`);
        return false;
    }
};
