import Link from "next/link";
import HighlightCard from "./highlightCard";
import Image from "next/image";
import hitfactor from "../../public/hitfactor-logo.png";

export default function WorkExperience() {
    return (
        <div className="grid grid-cols-2 auto-rows-min gap-dmain">
            <HighlightCard 
                bg="HF" title="Software Engineer Intern Jun-Aug 2021" 
                media={<Link href="https://hitfactor.com" target="_blank"><Image className="HF showcaseImage" src={hitfactor} alt="Hit Factor Logo"/></Link>} 
                description="Worked primarily on UI in the Unity game engine, developing new features and fixing/extending pre-existing systems. Some of my contributions were smaller, like drag-and-drop and tab functionality, and some involved revamping entire main menu screens. This was my first experience working on a massive codebase in an agile environment, and was a blast."
            />
            <HighlightCard 
                bg="HF" title="Software Engineer Intern Jun-Aug 2022" 
                media={<Link href="https://hitfactor.com" target="_blank"><Image className="HF showcaseImage" src={hitfactor} alt="Hit Factor Logo"/></Link>} 
                description="Much wider range of responsibilities, working more on gameplay features. Adjusted level environments and movement abilities and interactions for smoother gameplay experience. Created a generic settings menu for use across multiple titles. Lots of bug fixing! Was an absolute joy working with the other engineers, QA, designers, management, and artists on the team."
            />
        </div>
    );
}