export interface Item {
    id: number;
    datetime: string;
    data: {
        time: number[];
        values: number[];
    };
}

export interface ListOutputType {
    data: Item[];
    error: string;
}
