import SectionContent from "./SectionContent";
import HighlightCard from "./highlightCard";
import SectionHeader from "./sectionHeader"

export default function AboutMe() {
    return (
        <div>
            <SectionHeader header="About Me" className="mb-dmain"/>
            <SectionContent>
                <HighlightCard description="I'm a driven computer science student actively seeking internship or student opportunities in the tech field. I have an aptitude for learning and am constantly looking to develop my understanding of new technologies and skills. I give 100% to everything I’m involved with and thrive in collaborative environments. I have strong experience with React, Unity, JavaScript, TypeScript, C#, and Google Cloud Platform."/>
            </SectionContent>
        </div>
    );
}