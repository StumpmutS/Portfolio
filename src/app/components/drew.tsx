import Image from "next/image";

export default function Drew() {
    return (
        <div>
            <div className="w-32 h-32">
                <Image className="rounded-full aspect-square object-cover shadow-lg" src="/DrewMoultonHeadshot.jpeg" alt="Drew headshot" width={200} height={200}/>
            </div>
            <p className="pt-4">Hello, this is Drew!</p>
        </div>
    );
}