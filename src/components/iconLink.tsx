import Link from "next/link";
import { ReactNode } from "react";

export default function IconLink(props: {link: string, icon: ReactNode, size: number}) {
    const size = props.size / 4;

    return (
        <Link href={props.link} target="_blank">
            <div className="aspect-square" style={{height: `${size}rem;`}}>
                {props.icon}
            </div>
        </Link>
    );
}