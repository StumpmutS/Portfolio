import Image from "next/image";
import headshot from "../../public/DrewMoultonHeadshotCropped.jpeg";
import github from "../../public/github-mark-white.png";
import linkedin from "../../public/In-White-128@2x.png";
import mail from "../../public/mail-2569.png";
import Link from "next/link";

export default function Drew(props: {className?: string}) {
    return (
        <div className={props.className}>
            <div className="drewContainer">
                <div className="drew flex-none relative">
                    <Image className="rounded-full object-fill border-dmain border-gray-200" src={headshot} alt="Drew headshot"/>
                </div>
                <h1>Drew</h1>
                <h1>Moulton</h1>
                <div className="flex-grow"></div>
                <Link className="drewIcon flex-none relative" href={"https://github.com/StumpmutS"} target="_blank">
                    <Image src={github} alt="GitHub"/>
                </Link>
                <Link className="drewIcon flex-none relative" href={"https://www.linkedin.com/in/drew-moulton"} target="_blank">
                    <Image src={linkedin} alt="LinkedIn"/>
                </Link>
                <Link className="drewIcon mr-[5%] flex-none relative" href={"mailto:drew.m.moulton@gmail.com"} target="_blank">
                    <Image src={mail} alt="Mail"/>
                </Link>
            </div>
        </div>
    );
}