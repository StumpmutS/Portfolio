import Drew from "../components/drew";
import lineRenderer from "../../public/Line Renderer Speed.gif";
import dragonRig from "../../public/DragonRigFly.gif";
import HighlightCard from "@/components/highlightCard";
import hexGen from "../../public/Hex Gen Speed.gif";
import flightSystem from "../../public/EagleCarpetBomb.gif";
import menu from "../../public/AATMenu.gif";
import shaders from "../../public/Shaders.gif";
import gameplay from "../../public/AATGameplay.png";
import wolfHowl from "../../public/WolfHowl.gif";
import hitfactor from "../../public/hitfactor-logo.png";
import Image from "next/image";
import SectionContent from "@/components/SectionContent";
import SectionHeader from "@/components/sectionHeader";
import Link from "next/link";
import AnimalArmies from "@/components/animalArmies";
import WorkExperience from "@/components/workExperience";
import Additional from "@/components/additional";

export default function Home() {
    return (
        <div>
            <div className="pageBar bg-[url('../../public/stacked-waves-haikei.png')]">
                <Drew className="p-dmain"/>
            </div>
            <div className="p-dmain bg-blue-950 grid grid-cols-1 gap-dmain">
                <SectionHeader header="Professional Experience"/>
                <SectionContent>
                    <WorkExperience />
                </SectionContent>

                <SectionHeader header="Personal Projects"/>
                <SectionContent>
                    <AnimalArmies />
                </SectionContent>

                <SectionHeader header="Additional Interests / Media"/>
                <SectionContent>
                    <Additional />
                </SectionContent>
            </div>
            <div className="mirrorV pageBar bg-[url('../../public/stacked-waves-haikei.png')]">
                <Drew className="mirrorV p-dmain"/>
            </div>
        </div>
    );
}