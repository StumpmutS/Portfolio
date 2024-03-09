import Image from "next/image";
import HighlightCard from "./highlightCard";
import aatScroll from "../../public/AATBlenderScroll.gif";
import serpent from "../../public/Serpent.png";
import donuts from "../../public/menacingDonutsProjectBright.png";
import dragonWalk from "../../public/DragonWalkBright.gif";
import map from "../../public/Map.png";
import angryFace from "../../public/AngryFace.png";
import FluidSim from "./fluid/fluid";
import Link from "next/link";

export default function Additional() {
    return (
        <div className="grid grid-cols-3 auto-rows-min gap-dmain">
            <HighlightCard 
                title="JS Interactive Fluid Sim" 
                media={<FluidSim/> }
                description="Inspired by Jos Stam's Paper: Real-Time Fluid Dynamics for Games"
                link={<Link href="http://graphics.cs.cmu.edu/nsp/course/15-464/Fall09/papers/StamFluidforGames.pdf" target="_blank">{"Jos Stam\'s Paper"}</Link>}
            />
            <HighlightCard title="Procedural Texturing" media={<Image className="showcaseImage" src={serpent} alt="Procedural Texturing"/>} description=""/>
            <HighlightCard title="Sculpting" media={<Image className="showcaseImage" src={angryFace} alt="Sculpting"/>} description=""/>
            <HighlightCard title="AA Assets" media={<Image className="showcaseImage" src={aatScroll} alt="AA Assets"/>} description=""/>
            <HighlightCard title="Animation" media={<Image className="showcaseImage" src={dragonWalk} alt="Animation"/>} description=""/>
            <HighlightCard title="Physics & Simulation" media={<Image className="showcaseImage" src={donuts} alt="Physics & Simulation"/>} description=""/>
            <HighlightCard title="AA Map" media={<Image className="showcaseImage" src={map} alt="AA Map"/>} description=""/>
        </div>
    );
}