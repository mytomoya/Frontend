import { Data } from "../Container";

export interface Item {
    id: number;
    datetime: string;
    dataJson: Data;
}

export interface ListOutputType {
    data: Item[];
    error: string;
}
