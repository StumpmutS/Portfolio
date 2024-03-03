import Drew from "../components/drew";
import lineRenderer from "../../public/Line Renderer Speed.gif";
import dragon from "../../public/DragonWalkBright.gif";
import HighlightCard from "@/components/highlightCard";
import hexGen from "../../public/Hex Gen Speed.gif";
import menu from "../../public/AATMenu.png";
import gameplay from "../../public/AATGameplay.png";
import hitfactor from "../../public/hitfactor-logo.png";
import Image from "next/image";
import AboutMe from "@/components/aboutMe";
import SectionContent from "@/components/SectionContent";
import SectionHeader from "@/components/sectionHeader";
import Link from "next/link";
import { CARD_BACKGROUNDS } from "@/lib/backgrounds";

export default function Home() {
    return (
        <div>
            <div className="pageBar bg-[url('../../public/stacked-waves-haikei.png')]">
                <Drew className="p-8"/>
            </div>
            <div className="p-8 bg-blue-950 grid grid-cols-1 gap-8">
                <SectionHeader header="Professional Experience"/>
                <SectionContent>
                    <div className="grid grid-cols-2 auto-rows-min gap-8">
                        <HighlightCard bg="HF" title="Software Engineer Intern Jun-Aug 2021" media={<Link href="https://hitfactor.com"><Image className="HF showcaseImage" src={hitfactor} alt="Hit Factor Logo"/></Link>} description="Worked primarily on UI in the Unity game engine, developing new features and fixing/extending pre-existing systems. Some of my contributions were smaller, like drag-and-drop and tab functionality, and some involved revamping entire main menu screens. This was my first experience working on a massive codebase in an agile environment, and was a blast."/>
                        <HighlightCard bg="HF" title="Software Engineer Intern Jun-Aug 2022" media={<Link href="https://hitfactor.com"><Image className="HF showcaseImage" src={hitfactor} alt="Hit Factor Logo"/></Link>} description="Much wider range of responsibilities, working more on gameplay features. Adjusted level environments and movement abilities for smoother gameplay experience. Created a generic settings menu for use across multiple titles. Lots of bug fixing! Was an absolute joy working with the other engineers, QA, designers, management, and artists on the team."/>
                    </div>
                </SectionContent>
                <SectionHeader header="Personal Projects"/>
                <SectionContent>
                    <SectionHeader header="AAT" className="mb-8"/>
                    <div className="grid grid-cols-3 auto-rows-min gap-8">
                        <HighlightCard title="Networking" media={<div className="videoWrapper"><iframe className="showcaseImage" src="https://www.youtube.com/embed/wGrG0AuZLIs" allowFullScreen width={"max"} height={"max"}/></div>} description="First successful online testing of core gameplay mechanics after implementing multiplayer with Photon Fusion"/>
                        <HighlightCard title="Hex Grid" media={<Image className="showcaseImage" src={hexGen} alt="Hex Gen"/>} description="Unity editor extension for generating 3D hexagonal grids from an interactable 2D interface"/>
                        <HighlightCard title="Line Renderer" media={<Image className="showcaseImage" src={lineRenderer} alt="Line Renderer"/>} description="Custom world-space line renderer using bezier curves and dynamic mesh generation"/>
                        <HighlightCard title="3D Concepts" media={<Image className="showcaseImage" src={dragon} alt="Dragon"/>} description="Developed a solid foundational knowledge of 3D principles by learning how to model, texture, rig, and animate assets in Blender, then tie in everything on the art side with the gameplay"/>
                        <HighlightCard title="UI/UX" media={<Image className="showcaseImage" src={menu} alt="Menu"/>} description="Experimented with all kinds of UI/UX implementations using Figma and Unity"/>
                        <HighlightCard title="Squirrels" media={<Image className="showcaseImage" src={gameplay} alt="Gameplay"/>} description="Bullied squirrels"/>
                    </div>
                </SectionContent>
            </div>
            <div className="mirrorV pageBar bg-[url('../../public/stacked-waves-haikei.png')]">
                <Drew className="mirrorV p-8"/>
            </div>
        </div>
    );
}