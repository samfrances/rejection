
/**
 * Javascript version of python's range() function
 *
 * [...range(10)] equals [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
 * [...range(5, 10)] equals [5, 6, 7, 8, 9];
 */
export default function* range(
    lower: number,
    upper?: number
): Generator<number, void, unknown> {
    if (upper === undefined) {
        upper = lower;
        lower = 0;
    }
    if (lower !== Math.floor(lower) || upper !== Math.floor(upper)) {
        throw new Error("Parameters must be integers");
    }
    for (let i = lower; i < upper; i++) {
        yield i;
    }
}
