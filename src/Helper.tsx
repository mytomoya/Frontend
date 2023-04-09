export const formatDate = (jstTime: string): string => {
    const jstDate = new Date(jstTime);
    jstDate.setTime(jstDate.getTime() + 1000 * 60 * 60 * 9);

    const year = jstDate.getFullYear().toString().padStart(4, "0");
    const month = (jstDate.getMonth() + 1).toString().padStart(2, "0");
    const day = jstDate.getDate().toString().padStart(2, "0");
    const hours = jstDate.getHours().toString().padStart(2, "0");
    const minutes = jstDate.getMinutes().toString().padStart(2, "0");
    const seconds = jstDate.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getXYZ = (values: number[]): [number[], number[], number[]] => {
    const x: number[] = [];
    const y: number[] = [];
    const z: number[] = [];

    for (let i = 0; i < values.length; i += 3) {
        x.push(values[i]);
        y.push(values[i + 1]);
        z.push(values[i + 2]);
    }

    return [x, y, z];
};

export const getValues = (x: number[], y: number[], z: number[]): number[] => {
    const values: number[] = [];

    for (let i = 0; i < x.length; i += 1) {
        values.push(x[i]);
        values.push(y[i]);
        values.push(z[i]);
    }

    return values;
};
