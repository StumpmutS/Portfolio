import {Rgb} from "../types/rgb";

export default class Pointer {
    /**
     * Identifier for the pointer object
     * Valid IDs are always either zero or a positive integer (-1 is invalid and should
     * be managed upon creation of a new pointer object.)
     */
    id: number;

    /**
     * Horizontal (x) position of the pointer
     */
    x: number;
    /**
     * Vertical (y) position of the pointer
     */
    y : number;

    /**
     * Velocity data describing the positional change in the horizontal (x) axis of this pointer
     */
    dx: number;
    /**
     * Velocity data describing the positional change in the vertical (y) axis of this pointer
     */
    dy: number;

    /**
     * Boolean data member used to store whether the pointer is in a clicked state and/or a moving state
     */
    down: boolean;
    moved: boolean;

    /**
     * The color the pointer will render as
     */
    color: Rgb;

    constructor (color?: Rgb) {
        this.id = -1;
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.down = false;
        this.moved = false;
        this.color = color ?? { r: 0, g: 0, b: 0 };
    }
}