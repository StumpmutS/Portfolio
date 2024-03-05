import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CARD_BACKGROUNDS } from "../lib/backgrounds";
import { ReactNode } from "react";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function HighlightCard(props: {className?: string, bg?: string, title?: string, media?: ReactNode, link?: ReactNode, description?: string}) {
    const bg = props.bg ? props.bg : "ORANGE";
    
    function hasKey<O extends Object>(obj: O, key: PropertyKey): key is keyof O {
        return key in obj;
    }
    
    return (
        <div className={`${props.className} shadow-sm rounded shadow-black ${CARD_BACKGROUNDS[hasKey(CARD_BACKGROUNDS, bg) ? bg : "ORANGE"]} bg-cover bg-no-repeat`}>
            <center className="p-dcard flex flex-col gap-dcard justify-center">
                {props.title ? <h3>{props.title}</h3> : false }
                {props.media ? props.media : false}
                {
                    props.description && (
                        <div className="shadow-sm shadow-blue-950 backdrop-blur-2xl rounded">
                            <p className="p-dcardDetail featureDescriptor">{props.description}</p>
                        </div>
                    )
                }
                {props.link && (
                    <center className="flex gap-1 justify-center">
                        {props.link}
                        <FontAwesomeIcon className="linkIcon" icon={faArrowUpRightFromSquare}/>
                    </center>
                )}
            </center>
        </div>
    );
}