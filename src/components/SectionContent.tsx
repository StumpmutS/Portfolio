import { PropsWithChildren } from "react";

export default function SectionContent(props: PropsWithChildren) {
    return (
        <div className="sectionContent">
            <div>
                {props.children}
            </div>
        </div>
    );
}