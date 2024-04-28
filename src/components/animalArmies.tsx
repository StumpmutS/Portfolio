import Image from "next/image";
import HighlightCard from "./highlightCard";
import SectionHeader from "./sectionHeader";
import lineRenderer from "../../public/Line Renderer Speed.gif";
import dragonRig from "../../public/DragonRigFly.gif";
import hexGen from "../../public/Hex Gen Speed.gif";
import flightSystem from "../../public/EagleCarpetBomb.gif";
import menu from "../../public/AATMenu.gif";
import shaders from "../../public/Shaders.gif";
import gameplay from "../../public/AATGameplay.png";
import wolfHowl from "../../public/WolfHowl.gif";
import Link from "next/link";

export default function AnimalArmies() {
    return (
        <div>
            <SectionHeader header="Animal Armies" className="mb-dmain"/>
            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-min gap-dmain">
                <HighlightCard 
                    title="Networking"
                    media={<div className="videoWrapper"><iframe className="showcaseImage" src="https://www.youtube.com/embed/wGrG0AuZLIs" allowFullScreen width={"max"} height={"max"}/></div>}
                    description="First successful online testing of core gameplay mechanics after implementing multiplayer with Photon Fusion"
                    link={<Link href="https://github.com/StumpmutS/AAT/tree/main/AAT/Assets/Battle/Networking" target="_blank">Code</Link>}
                />
                <HighlightCard 
                    title="Hex Grid" 
                    media={<Image className="showcaseImage" src={hexGen} alt="Hex Gen"/>} 
                    description="Unity editor extension for generating 3D hexagonal grids from an interactable 2D interface"
                    link={<Link href="https://github.com/StumpmutS/AAT/blob/main/AAT/Assets/Editor/HexMapCreator.cs" target="_blank">Code</Link>}
                />
                <HighlightCard 
                    title="3D Pipeline" 
                    media={<Image className="showcaseImage" src={dragonRig} alt="Dragon"/>} 
                    description="Developed a solid foundational knowledge of 3D principles by learning how to model, texture, rig, and animate assets in Blender, then tie in everything on the art side with the gameplay"
                />
                <HighlightCard 
                    className="col-span-1 md:col-span-3"
                    title="Dijkstra Shortest Path Variation"
                    media={<div className="videoWrapper"><iframe className="showcaseImage" src="https://www.youtube.com/embed/UMd4voygMvs" allowFullScreen width={"max"} height={"max"}/></div>}
                    description="Dijkstra's shortest path algorithm is used for determining the fastest route between two sectors (vertices), with sectors being connected by pairs of undirected teleporters (edges) that have a set teleportation time (edge weight). My variation also takes into account whether it would be faster to traverse over/under walls, which some units are capable of to varying degrees of efficiency. Notably, the current implementation ignores the time it takes to walk between two teleporter points when making comparisons, but includes that additional time in the final calculation. Blue: Unsearched, Yellow: Searched, Red: Shortest Path"
                    link={<Link href="https://github.com/StumpmutS/AAT/blob/main/AAT/Assets/Battle/Sectors/SectorManager.cs" target="_blank">Code</Link>}
                />
                <HighlightCard 
                    title="Flight System" 
                    media={<Image className="showcaseImage" src={flightSystem} alt="Flight System"/>} 
                    description="Aerial pathing system using curves, calculus, and eggs"
                    link={<Link href="https://github.com/StumpmutS/AAT/blob/main/AAT/Assets/Battle/ComponentStateMachines/Agents/AdditionalMovement/FlyingController.cs" target="_blank">Code</Link>}
                />
                <HighlightCard 
                    title="Line Renderer" 
                    media={<Image className="showcaseImage" src={lineRenderer} alt="Line Renderer"/>} 
                    description="Custom world-space line renderer using bezier curves and dynamic mesh generation"
                    link={<Link href="https://github.com/StumpmutS/AAT/blob/main/AAT/Assets/Utility/LineRenderer/StumpLineRenderer.cs" target="_blank">Code</Link>}
                />
                <HighlightCard 
                    title="UI/UX" 
                    media={<Image className="showcaseImage" src={menu} alt="Menu"/>} 
                    description="Experimented with all kinds of UI/UX implementations using Figma and Unity"
                />
                <HighlightCard 
                    title="Abilities & State Machine" 
                    media={<Image className="showcaseImage" src={wolfHowl} alt="Wolf Howl"/>} 
                    description="State machine transitions defined with scriptable objects and serializable type references to state classes for ease-of-use in editor, ability shown summons spectral wolf units with decaying health"
                    link={<Link href="https://github.com/StumpmutS/AAT/blob/main/AAT/Assets/Battle/ComponentStateMachines/ComponentStateMachine.cs" target="_blank">Code</Link>}
                />
                <HighlightCard 
                    title="Shaders" 
                    media={<Image className="showcaseImage" src={shaders} alt="Shaders"/>} 
                    description="Wrote shaders in HLSL for cel-shading and transparency effects"
                    link={<Link href="https://github.com/StumpmutS/AAT/blob/main/AAT/Assets/ThreeDArt/ToonStuff/Toon.shader" target="_blank">Code</Link>}
                />
                <HighlightCard 
                    title="Squirrels" 
                    media={<Image className="showcaseImage" src={gameplay} alt="Gameplay"/>} 
                    description="Bullied squirrels with VFX and monsters"
                />
            </div>
        </div>
    );
}