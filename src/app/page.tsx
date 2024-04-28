import Drew from "../components/drew";
import SectionContent from "@/components/SectionContent";
import SectionHeader from "@/components/sectionHeader";
import AnimalArmies from "@/components/animalArmies";
import WorkExperience from "@/components/workExperience";
import Additional from "@/components/additional";

export default function Home() {
    return (
        <div>
            <div className="pageBar headerBg">
                <Drew className="p-dmain"/>
            </div>
            <div className="py-dmain mx-[5vw] md:mx-[10vw] lg:mx-[15vw] 2xl:mx-[20vw] flex flex-col gap-dmain">
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
            <div className="mirrorV pageBar headerBg">
                <Drew className="mirrorV p-dmain"/>
            </div>
        </div>
    );
}