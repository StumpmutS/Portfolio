export default function SectionHeader(props: {header: string, className?: string}) {
    return (
        <center className={`${props.className} bg-gray-700 shadow-sm rounded shadow-black`}>
            <h2>{props.header}</h2>
        </center>
    );
}