"use client";

import {useCallback, useEffect, useRef} from "react";
import Fluid from "@/fluid/fluid";
import {PropsWithClassName} from "@/lib/types/class-name-props";
import {useRefDimensions} from "@/hooks/useRefDimensions";
import useWindowDimensions from "@/hooks/useWindowDimensions";

export default function WebglFluid(props: PropsWithClassName) {
    const size = useWindowDimensions();
    const canvasRef = useCallback((canvas: HTMLCanvasElement | null) => {
        if (canvas) {
            let fluid = new Fluid(canvas);
            fluid.activate();
        }
    }, []);

    return (
        <div className={props.className}>
            <canvas width={size.width} height={size.height} ref={canvasRef}></canvas>
        </div>
    );
}