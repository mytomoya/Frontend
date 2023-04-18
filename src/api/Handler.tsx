import axios from "axios";
import { ListOutputType } from "./Types";
import { Data } from "../Container";

const endpoint = "http://localhost:8080";

export const save = async (data: Data): Promise<boolean> => {
    if (data.time.length === 0) {
        console.log(`No data to send`);
        return false;
    }

    try {
        const response = axios.post(endpoint + "/add", {
            time: data.time,
            activities: data.activities,
            yAcc: data.yAcc,
            zAcc: data.zAcc,
            yCorrect: data.yCorrect,
            zCorrect: data.zCorrect,
        });
        console.log(response);
        return true;
    } catch (error) {
        console.log(`[Error] ${error}`);
        return false;
    }
};

export const getRecords = async (
    offset: number
): Promise<ListOutputType | null> => {
    try {
        const response = axios.get(endpoint + `/list?offset=${offset}`);
        const data: ListOutputType = (await response).data;
        console.log(`[Success] ${response}`);
        return data;
    } catch (error) {
        console.log(`[Error] ${error}`);
        return null;
    }
};

export const deleteRecord = async (id: number): Promise<boolean> => {
    try {
        const response = await axios.get(endpoint + `/delete?id=${id}`);
        console.log(`[Success] ${response}`);
        return true;
    } catch (error) {
        console.log(`[Error] ${error}`);
        return false;
    }
};
