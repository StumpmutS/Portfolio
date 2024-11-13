/**
 * A WebGL program with the given vertex and fragment shaders.
 */
export class GLProgram {
    uniforms: Record<string, WebGLUniformLocation | null>;
    webGL: WebGL2RenderingContext;
    program: WebGLProgram | null;

    constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader, webGL: WebGL2RenderingContext) {
        this.uniforms = {};
        this.webGL = webGL;
        this.program = webGL.createProgram();

        if (!this.program) {
            throw "Error creating WebGL Program";
        }

        // Create program from shader
        webGL.attachShader(this.program, vertexShader);
        webGL.attachShader(this.program, fragmentShader);
        webGL.linkProgram(this.program);

        // Check linking status
        if (!webGL.getProgramParameter(this.program, webGL.LINK_STATUS))
            throw webGL.getProgramInfoLog(this.program);

        // Cache uniforms to class
        const uniformCount = webGL.getProgramParameter(this.program, webGL.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            const uniformName = webGL.getActiveUniform(this.program, i)?.name;
            if (uniformName) {
                this.uniforms[uniformName] = webGL.getUniformLocation(this.program, uniformName);
            }
        }
    }

    /**
     * Sets shader program as part of current rendering state.
     */
    bind() {
        this.webGL.useProgram(this.program);
    }
}

export type ShaderPrograms = {
    displayBloomProgram: GLProgram,
    vorticityProgram: GLProgram,
    displayShadingProgram: GLProgram,
    displayBloomShadingProgram: GLProgram,
    gradientSubtractProgram: GLProgram,
    advectionProgram: GLProgram,
    bloomBlurProgram: GLProgram,
    colorProgram: GLProgram,
    divergenceProgram: GLProgram,
    clearProgram: GLProgram,
    splatProgram: GLProgram,
    displayProgram: GLProgram,
    bloomPreFilterProgram: GLProgram,
    curlProgram: GLProgram,
    bloomFinalProgram: GLProgram,
    pressureProgram: GLProgram,
    backgroundProgram: GLProgram,
    displayInvertedProgram: GLProgram,
}