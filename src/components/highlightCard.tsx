import { CARD_BACKGROUNDS } from "../lib/backgrounds";
import { ReactNode } from "react";

export default function HighlightCard(props: {bg?: string, title?: string, media?: ReactNode, link?: ReactNode, description?: string}) {
    let bg = props.bg ? props.bg : "ORANGE";
    
    function hasKey<O extends Object>(obj: O, key: PropertyKey): key is keyof O {
        return key in obj;
    }

    if (!hasKey(CARD_BACKGROUNDS, bg)) bg = "ORANGE";
    
    return (
        <div className={`shadow-sm rounded shadow-black ${CARD_BACKGROUNDS[hasKey(CARD_BACKGROUNDS, bg) ? bg : "ORANGE"]} bg-cover bg-no-repeat`}>
            <center className="p-8 grid grid-cols-1 gap-8 justify-center">
                {props.title ? <h3>{props.title}</h3> : false }
                {props.media ? props.media : false}
                {props.link ? props.link : false}
                <div className="shadow-sm shadow-blue-950 backdrop-blur-2xl rounded">
                    <p className="p-4 featureDescriptor">{props.description ? props.description : false}</p>
                </div>
            </center>
        </div>
    );
}