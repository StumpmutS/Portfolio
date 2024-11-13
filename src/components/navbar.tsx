"use client";

import {PropsWithChildren} from "react";
import {PropsWithClassName} from "@/lib/types/class-name-props";
import useDetectScroll from "@smakss/react-scroll-direction";

export default function Navbar(props: PropsWithChildren & PropsWithClassName) {
    const { scrollDir } = useDetectScroll();

    return (
        <div className={`z-50 fixed ${scrollDir == "down" ? "-translate-y-96" : ""} top-dmain inset-x-dmain headerBg transition-transform duration-500 ${props.className}`}>
            {props.children}
        </div>
    );
}