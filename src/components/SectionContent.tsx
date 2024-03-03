import { PropsWithChildren } from "react";

export default function SectionContent(props: PropsWithChildren) {
    return (
        <div className="mx-dmain">
            <div>
                {props.children}
            </div>
        </div>
    );
}