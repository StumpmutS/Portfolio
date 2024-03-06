import { CARD_BACKGROUNDS } from "@/lib/backgrounds";

export default function SectionHeader(props: {header: string, className?: string}) {
    return (
        <center className={`${props.className} mt-dmain shadow-sm rounded shadow-black ${CARD_BACKGROUNDS.ORANGE} bg-cover bg-no-repeat`}>
            <h2>{props.header}</h2>
        </center>
    );
}