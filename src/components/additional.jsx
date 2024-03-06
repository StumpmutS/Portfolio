import Image from "next/image";
import HighlightCard from "./highlightCard";
import aatScroll from "../../public/AATBlenderScroll.gif";
import serpent from "../../public/Serpent.png";
import donuts from "../../public/menacingDonutsProjectBright.png";
import dragonWalk from "../../public/DragonWalkBright.gif";
import map from "../../public/Map.png";
import angryFace from "../../public/AngryFace.png";

export default function Additional() {
    return (
        <div className="grid grid-cols-3 auto-rows-min gap-dmain">
            <HighlightCard title="AA Assets" media={<Image className="showcaseImage" src={aatScroll} alt="AA Assets"/>} description=""/>
            <HighlightCard title="Procedural Texturing" media={<Image className="showcaseImage" src={serpent} alt="Procedural Texturing"/>} description=""/>
            <HighlightCard title="Animation" media={<Image className="showcaseImage" src={dragonWalk} alt="Animation"/>} description=""/>
            <HighlightCard title="Physics & Simulation" media={<Image className="showcaseImage" src={donuts} alt="Physics & Simulation"/>} description=""/>
            <HighlightCard title="AA Map" media={<Image className="showcaseImage" src={map} alt="AA Map"/>} description=""/>
            <HighlightCard title="Sculpting" media={<Image className="showcaseImage" src={angryFace} alt="Sculpting"/>} description=""/>
        </div>
    );
}