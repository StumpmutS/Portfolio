import Image from "next/image";
import headshot from "../../public/DrewMoultonHeadshotCropped.jpeg";
import Link from "next/link";
import {FaEnvelope, FaGithub, FaLinkedin} from "react-icons/fa6";
import colors from "tailwindcss/colors";

export default function Drew(props: {className?: string}) {
    return (
        <div className={props.className}>
            <div className="drewContainer justify-center backdrop-blur-xl flex py-2 items-center gap-dmain flex-wrap md:flex-nowrap">
                <h1 className={"text-gray-900 basis-full text-center"}>Drew Moulton</h1>
                <div className="hidden md:flex-grow md:block"></div>
                <Link className="drewIcon flex-none relative" href={"https://github.com/StumpmutS"} target="_blank">
                    <FaGithub color={colors.gray["900"]} size={"auto"}/>
                </Link>
                <Link className="drewIcon flex-none relative" href={"https://www.linkedin.com/in/drew-moulton"} target="_blank">
                    <FaLinkedin color={colors.gray["900"]} size={"auto"} />
                </Link>
                <Link className="drewIcon mr-[5%] flex-none relative" href={"mailto:drew.m.moulton@gmail.com"} target="_blank">
                    <FaEnvelope color={colors.gray["900"]} size={"auto"} />
                </Link>
            </div>
        </div>
    );
}