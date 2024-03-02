import Drew from "../components/drew";
import lineRenderer from "../../public/Line Renderer Speed.gif";
import dragon from "../../public/DragonWalkBright.gif";
import FeatureCard from "@/components/featureCard";
import hexGen from "../../public/Hex Gen Speed.gif";
import menu from "../../public/AATMenu.png";
import gameplay from "../../public/AATGameplay.png";
import Image from "next/image";

export default function Home() {
    return (
        <div>
            <div className="shadow-md z-50 relative shadow-black bg-[url('../../public/stacked-waves-haikei.png')] bg-cover bg-no-repeat">
                <Drew className="p-8"/>
            </div>
            <div className="bg-blue-950">
                <div className={`p-8 grid grid-cols-4 auto-rows-fr gap-8`}>
                    <FeatureCard visuals={<Image className="showcaseImage" src={lineRenderer} alt="Line Renderer"/>} description="Custom world-space line renderer using bezier curves and dynamic mesh generation systems"/>
                    <FeatureCard visuals={<Image className="showcaseImage" src={dragon} alt="Dragon"/>} description="Developed a solid foundational knowledge of 3D principles by learning how to model, texture, rig, and animate assets in Blender, then tie in everything on the art side with the gameplay"/>
                    <FeatureCard visuals={<Image className="showcaseImage" src={hexGen} alt="Hex Gen"/>} description="Unity editor extension for generating 3D hexagonal grids from an interactable 2D interface"/>
                    <FeatureCard visuals={<Image className="showcaseImage" src={menu} alt="Menu"/>} description="Experimented with all kinds of UI/UX implementations using Figma and Unity"/>
                    <FeatureCard visuals={<Image className="showcaseImage" src={gameplay} alt="Gameplay"/>} description="Bullied squirrels"/>
                    <FeatureCard visuals={<div className="videoWrapper"><iframe className="showcaseImage" src="https://www.youtube.com/embed/wGrG0AuZLIs" allowFullScreen width={"max"} height={"max"}/></div>} description="First successful online testing of core gameplay mechanics after implementing multiplayer with Photon Fusion"/>
                </div>
            </div>
        </div>
    );
}