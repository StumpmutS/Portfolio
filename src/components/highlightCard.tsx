import { CARD_BACKGROUNDS } from "../lib/backgrounds";
import { ReactNode } from "react";

export default function HighlightCard(props: {className?: string, bg?: string, title?: string, media?: ReactNode, link?: ReactNode, description?: string}) {
    const bg = props.bg ? props.bg : "ORANGE";
    
    function hasKey<O extends Object>(obj: O, key: PropertyKey): key is keyof O {
        return key in obj;
    }
    
    return (
        <div className={`${props.className} shadow-sm rounded shadow-black ${CARD_BACKGROUNDS[hasKey(CARD_BACKGROUNDS, bg) ? bg : "ORANGE"]} bg-cover bg-no-repeat`}>
            <center className="p-dcard grid grid-cols-1 gap-dcard justify-center">
                {props.title ? <h3>{props.title}</h3> : false }
                {props.media ? props.media : false}
                {props.link ? props.link : false}
                {
                    props.description && (
                        <div className="shadow-sm shadow-blue-950 backdrop-blur-2xl rounded">
                            <p className="p-dcardDetail featureDescriptor">{props.description}</p>
                        </div>
                    )
                }
            </center>
        </div>
    );
}