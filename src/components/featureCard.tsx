import { ReactNode } from "react";

export default function FeatureCard(props: {visuals: ReactNode, description: string}) {
    return (
        <div className={"shadow-sm rounded shadow-black bg-[url('../../public/blob-scene-haikei-orange-bright.png')] bg-auto bg-no-repeat"}>
            <center className="m-4 grid grid-cols-1 gap-4 justify-center">
                {props.visuals ? props.visuals : false}
                <div className="shadow-sm shadow-blue-950 backdrop-blur-2xl rounded">
                    <p className="p-4 featureDescriptor">{props.description}</p>
                </div>
            </center>
        </div>
    );
}