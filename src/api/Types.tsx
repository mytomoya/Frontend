export interface Item {
    id: number;
    datetime: string;
    dataJson: {
        time: number[];
        values: number[];
    };
}

export interface ListOutputType {
    data: Item[];
    error: string;
}
