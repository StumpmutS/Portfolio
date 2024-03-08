type initFunction<T> = (i: number, j: number) => T;

export function initializeGrid<T>(size: number, initFunction: initFunction<T>) {
    const result: T[][] = [];

    for (let i = 0; i < size; i++) {
        result.push([]);

        for (let j = 0; j < size; j++) {
            result[i].push(initFunction(i, j));
        }
    }
    
    return result;
}