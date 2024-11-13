export type Texture = {
    texture: WebGLTexture,
    width: number,
    height: number,
    attach(id: number): number
}