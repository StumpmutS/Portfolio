import Drew from "../components/drew";
import SectionContent from "@/components/SectionContent";
import SectionHeader from "@/components/sectionHeader";
import AnimalArmies from "@/components/animalArmies";
import WorkExperience from "@/components/workExperience";
import Additional from "@/components/additional";
import WebglFluid from "@/components/fluid/webgl-fluid";
import Navbar from "@/components/navbar";

export default function Home() {
    return (
        <div>
            <WebglFluid className={"fixed"}/>
            <Navbar className={"pointer-events-none"}>
                <Drew />
            </Navbar>
            <div
                className="py-dmain pt-[50vh] md:pt-[40vh] mx-[10vw] md:mx-[10vw] lg:mx-[15vw] 2xl:mx-[20vw] flex flex-col gap-dmain pointer-events-none">
                <SectionHeader header="Professional Experience"/>
                <SectionContent>
                    <WorkExperience/>
                </SectionContent>

                <SectionHeader header="Personal Projects"/>
                <SectionContent>
                    <AnimalArmies/>
                </SectionContent>

                <SectionHeader header="Additional Interests / Media"/>
                <SectionContent>
                    <Additional/>
                </SectionContent>
                <div className={"ink-text"}>Books: "Body found floating by the docks..."</div>
            </div>
        </div>
    );
}