import Image from "next/image";
import headshot from "../../public/DrewMoultonHeadshotCropped.jpeg";
import IconLink from "./iconLink";
import github from "../../public/github-mark-white.png";
import linkedin from "../../public/In-White-128@2x.png";
import mail from "../../public/mail-2569.png";

export default function Drew(props: {className?: string}) {
    return (
        <div className={props.className}>
            <div className="flex border-y-4 border-r-4 border-gray-200 shadow-sm shadow-black backdrop-blur-md rounded-full items-center space-x-8 w-auto h-28">
                <div className="relative w-28 h-28">
                    <Image className="rounded-full object-fill border-4 border-gray-200" src={headshot} alt="Drew headshot"/>
                </div>
                <h1 className="name">Drew Moulton</h1>
                <IconLink link="https://github.com/StumpmutS" icon={<Image src={github} alt="GitHub"/>} size={20}/>
                <IconLink link="https://www.linkedin.com/in/drew-moulton" icon={<Image src={linkedin} alt="LinkedIn"/>} size={20}/>
                <IconLink link="mailto: drew.m.moulton@gmail.com" icon={<Image src={mail} alt="Mail"/>} size={24}/>
            </div>
        </div>
    );
}