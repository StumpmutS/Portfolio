export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

export function clamp(n: number, min: number, max: number): number {
    return Math.max(Math.min(n, max), min);
}

export function remap(n: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number) {
    return toLow + (clamp(n, fromLow, fromHigh) - fromLow) * 
    (toHigh - toLow) / (fromHigh - fromLow);
}