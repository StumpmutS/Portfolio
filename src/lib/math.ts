export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

export function clamp(n: number, min: number, max: number): number {
    return Math.max(Math.min(n, max), min);
}