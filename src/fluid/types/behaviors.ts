import {Rgb} from "@/fluid/types/rgb";

export type Behaviors = {
    sim_resolution?: number,
    dye_resolution?: number,
    paused?: boolean,
    clamp_values?: boolean,
    embedded_dither?: boolean,

    /* Fluid Dissipation Behaviors*/
    dissipation?: number,
    velocity?: number,
    pressure?: number,
    pressure_iteration?: number,

    /* Fluid Color */
    fluid_color?: Rgb,
    invert_color?: boolean,

    /* Characteristics */
    curl?: number,
    emitter_size?: number,
    render_shaders?: boolean,
    multi_color?: boolean,

    /* Bloom */
    render_bloom?: boolean,
    bloom_iterations?: number,
    bloom_resolution?: number,
    intensity?: number,
    threshold?: number,
    soft_knee?: number,

    /* Background */
    background_color?: { r: number, g: number, b: number },
    transparent?: boolean
}