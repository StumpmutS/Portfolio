export type ColorFormats = {
    formatRGBA: Format,
    formatRG: Format,
    formatR: Format,
    halfFloatTexType: number,
    supportLinearFiltering: OES_texture_float_linear | null,
}

type Format = {
    internalFormat: GLint,
    format: GLenum,
}