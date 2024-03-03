import { PropsWithChildren } from "react";

export default function SectionContent(props: PropsWithChildren) {
    return (
        <div className="mx-8">
            <div>
                {props.children}
            </div>
        </div>
    );
}