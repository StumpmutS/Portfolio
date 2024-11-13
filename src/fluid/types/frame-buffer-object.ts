import {Texture} from "./texture";

export type FrameBufferObject = Texture & {
    fbo: WebGLFramebuffer,
}

export type DoubleFrameBufferObject = {
    read: FrameBufferObject,
    write: FrameBufferObject,
    swap(): void,
};