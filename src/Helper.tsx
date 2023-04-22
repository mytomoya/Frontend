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

export const kalmanFilter2ndOrder = (
    accData: number[],
    dt: number
): number[] => {
    // const dt = 0.01; // time step in seconds
    const A = [
        [1, dt, 0.5 * dt ** 2],
        [0, 1, dt],
        [0, 0, 1],
    ]; // state transition matrix

    const C = [[1, 0, 0]]; // observation matrix
    const Q = [
        [0, 0, 0],
        [0, 0.1, 0],
        [0, 0, 0.01],
    ]; // process noise covariance matrix
    const R = [[0.01]]; // measurement noise covariance matrix

    let x = [[0], [0], [0]]; // initial state estimate
    let P = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ]; // initial error covariance matrix

    const posEstimates = [];

    for (let i = 0; i < accData.length; i++) {
        // Predict
        const xPred = matrixMultiply(A, x);
        const PPred = matrixAdd(
            matrixMultiply(matrixMultiply(A, P), matrixTranspose(A)),
            Q
        );

        // Update
        const y = accData[i] - matrixMultiply(C, xPred)[0][0];
        const S = matrixAdd(
            matrixMultiply(matrixMultiply(C, PPred), matrixTranspose(C)),
            R
        );
        const K = matrixMultiply(
            matrixMultiply(PPred, matrixTranspose(C)),
            matrixInverse(S)
        );
        const xNew = matrixAdd(xPred, matrixMultiply(K, [[y]]));
        const PNew = matrixMultiply(
            matrixSubtract(identityMatrix(3), matrixMultiply(K, C)),
            PPred
        );

        // Save estimate
        posEstimates.push(xNew[0][0]);

        // Update state and error covariance for next iteration
        x = xNew;
        P = PNew;
    }

    return posEstimates;
};

const matrixMultiply = (a: number[][], b: number[][]): number[][] => {
    const numRowsA = a.length;
    const numColsA = a[0].length;
    const numRowsB = b.length;
    const numColsB = b[0].length;
    const result: number[][] = [];

    if (numColsA !== numRowsB) {
        throw new Error("Invalid matrix dimensions for multiplication.");
    }

    for (let i = 0; i < numRowsA; i++) {
        const row: number[] = [];
        for (let j = 0; j < numColsB; j++) {
            let sum = 0;
            for (let k = 0; k < numColsA; k++) {
                sum += a[i][k] * b[k][j];
            }
            row.push(sum);
        }
        result.push(row);
    }

    return result;
};

const matrixTranspose = (a: number[][]): number[][] => {
    const numRows = a.length;
    const numCols = a[0].length;
    const result: number[][] = [];

    for (let j = 0; j < numCols; j++) {
        const row: number[] = [];
        for (let i = 0; i < numRows; i++) {
            row.push(a[i][j]);
        }
        result.push(row);
    }

    return result;
};

const matrixSubtract = (a: number[][], b: number[][]): number[][] => {
    const numRows = a.length;
    const numCols = a[0].length;
    const result: number[][] = [];

    if (numRows !== b.length || numCols !== b[0].length) {
        throw new Error("Invalid matrix dimensions for subtraction.");
    }

    for (let i = 0; i < numRows; i++) {
        const row: number[] = [];
        for (let j = 0; j < numCols; j++) {
            row.push(a[i][j] - b[i][j]);
        }
        result.push(row);
    }

    return result;
};

const matrixAdd = (a: number[][], b: number[][]): number[][] => {
    const numRows = a.length;
    const numCols = a[0].length;
    const result: number[][] = [];

    if (numRows !== b.length || numCols !== b[0].length) {
        throw new Error("Invalid matrix dimensions for addition.");
    }

    for (let i = 0; i < numRows; i++) {
        const row: number[] = [];
        for (let j = 0; j < numCols; j++) {
            row.push(a[i][j] + b[i][j]);
        }
        result.push(row);
    }

    return result;
};

const matrixInverse = (a: number[][]): number[][] => {
    const n = a.length;
    const x: number[][] = [];
    const b: number[][] = [];
    const index: number[] = [];

    for (let i = 0; i < n; i++) {
        x[i] = [];
        b[i] = [];
        for (let j = 0; j < n; j++) {
            x[i][j] = 0;
            b[i][j] = a[i][j];
        }
        x[i][i] = 1;
    }

    for (let k = 0; k < n; k++) {
        let pivot = 0;
        let pivotRow = 0;
        for (let i = k; i < n; i++) {
            if (Math.abs(b[i][k]) > pivot) {
                pivot = Math.abs(b[i][k]);
                pivotRow = i;
            }
        }
        if (pivot === 0) {
            throw new Error("Matrix is singular and cannot be inverted.");
        }
        const temp = b[k];
        b[k] = b[pivotRow];
        b[pivotRow] = temp;
        const temp2 = x[k];
        x[k] = x[pivotRow];
        x[pivotRow] = temp2;
        index[k] = pivotRow;
        const pivotVal = b[k][k];
        b[k][k] = 1;
        for (let j = k + 1; j < n; j++) {
            b[k][j] /= pivotVal;
        }
        for (let j = 0; j < n; j++) {
            x[k][j] /= pivotVal;
        }
        for (let i = 0; i < n; i++) {
            if (i !== k) {
                const temp3 = b[i][k];
                b[i][k] = 0;
                for (let j = k + 1; j < n; j++) {
                    b[i][j] -= temp3 * b[k][j];
                }
                for (let j = 0; j < n; j++) {
                    x[i][j] -= temp3 * x[k][j];
                }
            }
        }
    }

    for (let k = n - 1; k >= 0; k--) {
        if (index[k] !== k) {
            const temp = x[k];
            x[k] = x[index[k]];
            x[index[k]] = temp;
        }
    }

    return x;
};

const identityMatrix = (n: number): number[][] => {
    const matrix: number[][] = [];
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = i === j ? 1 : 0;
        }
    }
    return matrix;
};
