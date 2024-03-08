import Drew from "../components/drew";
import SectionContent from "@/components/SectionContent";
import SectionHeader from "@/components/sectionHeader";
import AnimalArmies from "@/components/animalArmies";
import WorkExperience from "@/components/workExperience";
import Additional from "@/components/additional";
import FluidSim from "@/components/fluid/fluid";
import HighlightCard from "@/components/highlightCard";

export default function Home() {
    return (
        <div>
            <div className="pageBar bg-[url('../../public/stacked-waves-haikei.png')]">
                <Drew className="p-dmain"/>
            </div>
            <div className="p-dmain flex flex-col gap-dmain">
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