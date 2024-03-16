/**
 * Implementation based on Jos Stam's Real-Time Fluid Dynamics for Games
 * http://graphics.cs.cmu.edu/nsp/course/15-464/Fall09/papers/StamFluidforGames.pdf
 */

"use client";

import { initializeGrid } from "@/lib/collectionHelpers";
import { clamp, lerp } from "@/lib/math";
import { Circle, Line } from "@react-three/drei";
import { Canvas, MeshProps, ThreeEvent, useFrame } from "@react-three/fiber";
import { Fragment, useState } from "react";
import { Color, MeshBasicMaterial, Vector2, Vector3 } from "three";

export default function FluidSim(props: {}) {
    const screenWidth = typeof window == "undefined" ? 1000 : window.innerWidth;

    return (
        <div className="showcaseImage w-[100%] aspect-square touch-none"> 
            <Canvas orthographic={true}>
                <ambientLight intensity={1} />
                <Fluid simScale={screenWidth / 5}/>
            </Canvas>
        </div>
    );
}

const N = 32;
const SIZE = N + 2;
const DISPLAY_VELOCITY = false;

const SOURCE_ADD_FACTOR = 4;
const DENSITY_DIFFUSION_RATE = .0005;
const DENSITY_DECAY_RATE = .4;

const FORCE_ADD_FACTOR = 2000;
const VELOCITY_DIFFUSION_RATE = .005;

/** 
 * Grid spacing is 1/N
 * ∂ϱ/∂t = -(u*∇)ϱ + (κ∇^2)ϱ + S
 * ϱ is density, first term: density should follow velocity field, 
 * second term is diffusion, third term is increase in density due to sources
 */
function Fluid(props: {simScale: number}) {
    const [rerender, setRerender] = useState(false);
    const [prevHoveredCell, setPrevHoveredCell] = useState<Vector2>(new Vector2(N / 2 + 1, N / 2 + 1));
    const [hoveredCells, setHoveredCells] = useState<boolean[][]>(initializeGrid<boolean>(SIZE, () => false));

    useFrame((state, dt) => {
        setRerender(!rerender);
        if (hoveredCells.length == 0) return;

        const dCopy = initializeGrid<number>(SIZE, (i, j) => densityField[i][j]);
        const vCopy = initializeGrid<Vector2>(SIZE, (i, j) => velocityField[i][j]);
        
        const sources = initializeGrid<number>(SIZE, (i, j) => (hoveredCells[i][j]) && j <= N && j > 0 && i > 0 && i <= N ? SOURCE_ADD_FACTOR : 0);
        applySources(dCopy, sources, dt);
        diffuseDensity(dCopy, DENSITY_DIFFUSION_RATE, dt);
        advectDensity(dCopy, vCopy, dt);
        decayDensity(dCopy, dt);

        const forces = initializeGrid<Vector2>(SIZE, () => new Vector2(0, 0));
        for (let i = 1; i <= N; i++) {
            for (let j = 1; j <= N; j++) {
                if (!hoveredCells[i][j]) continue;

                forces[i][j] = new Vector2(i - prevHoveredCell.x, j - prevHoveredCell.y).multiplyScalar(FORCE_ADD_FACTOR);
            }
        }

        applyForces(vCopy, forces, dt);
        diffuseVelocity(vCopy, VELOCITY_DIFFUSION_RATE, dt);
        projectVelocity(vCopy);
        advectVelocity(vCopy, dt);
        projectVelocity(vCopy);

        setDensityField(dCopy);
        setVelocityField(vCopy);
    });

    const [velocityField, setVelocityField] = useState(initializeGrid<Vector2>(SIZE, () => {
        return new Vector2(0, 0);
    }));
    const [densityField, setDensityField] = useState(initializeGrid<number>(SIZE, () => 0));
    
    let cells: JSX.Element[] = [];
    const offset = window.innerWidth / 256;

    densityField.forEach((row, i) => row.forEach((density, j) => {
        cells.push(
        <Cell 
            row={i}
            column={j}
            cOnHover={(event, ih, jh) => {
                if (ih == 0 || ih == N + 1 || jh == 0 || jh == N + 1) return;

                setHoveredCells(hoveredCells.map((row, ic) => {
                    return row.map((cell, jc) => {
                        return ih == ic && jh == jc;
                    });
                }));
            }}
            cOnHoverStop={(event, ih, jh) => {
                setPrevHoveredCell(new Vector2(ih, jh));

                setHoveredCells(hoveredCells.map((row, ic) => {
                    return row.map(() => {
                        return false;
                    });
                }));
            }}
            color={new Color(lerp(0, 255, j / N), 50, lerp(255, 0, j / N)).multiplyScalar(density)}
            cellScale={new Vector3(props.simScale / (N), props.simScale / (N), 1)}
            key={`${i} ${j}`} 
            pos={new Vector2(i * props.simScale / N - props.simScale / 2 - offset, j * props.simScale / N - props.simScale / 2 - offset)} 
            velocity={velocityField[i][j]}
        />);
    }));

    return (
        <Fragment>
            {cells}
        </Fragment>
    );
}

function applySources(field: number[][], sources: number[][], deltaTime: number) {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            field[i][j] += deltaTime * sources[i][j];
        }
    }
}

function applyForces(field: Vector2[][], forces: Vector2[][], deltaTime: number) {
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            const force = forces[i][j].multiplyScalar(deltaTime);
            field[i][j].add(force);
            
            // Can cheat because low simulation scale
            field[i + 1][j].add(force);
            field[i - 1][j].add(force);
            field[i][j + 1].add(force);
            field[i][j - 1].add(force);
        }
    }

    boundVelocity(field);
}

function diffuseDensity(field: number[][], rate: number, deltaTime: number) {
    const diffusionAmount = rate * deltaTime * N * N;

    for (let gs = 0; gs < 16; gs++) {
        for (let i = 1; i <= N; i++) {
            for (let j = 1; j <= N; j++) {
                field[i][j] = 
                (
                    field[i][j] + 
                    diffusionAmount / 4 * 
                    (field[i][j + 1] + field[i][j - 1] + field[i + 1][j] + field[i - 1][j])
                )
                / (1 + diffusionAmount);
            }
        }
    }
}

function diffuseVelocity(field: Vector2[][], rate: number, deltaTime: number) {
    const diffusionAmount = rate * deltaTime * N * N;

    for (let gs = 0; gs < 16; gs++) {
        for (let i = 1; i <= N; i++) {
            for (let j = 1; j <= N; j++) {
                field[i][j] = new Vector2(
                    (
                        field[i][j].x + 
                        diffusionAmount / 4 *
                        (field[i][j + 1].x + field[i][j - 1].x + field[i + 1][j].x + field[i - 1][j].x)
                    )
                    / (1 + diffusionAmount),
                    (
                        field[i][j].y + 
                        diffusionAmount / 4 *
                        (field[i][j + 1].y + field[i][j - 1].y + field[i + 1][j].y + field[i - 1][j].y)
                    )
                    / (1 + diffusionAmount)
                );
            }
        }

        boundVelocity(field);
    }
}

function advectDensity(densityField: number[][], velocityField: Vector2[][], deltaTime: number) {
    const prevDensityField = initializeGrid(SIZE, (i, j) => densityField[i][j])
    
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            const velocity = velocityField[i][j];
            const origin = new Vector2(velocity.x, velocity.y).multiplyScalar(-deltaTime).add(new Vector2(i, j));
            origin.x = clamp(origin.x, .5, N + .5);
            origin.y = clamp(origin.y, .5, N + .5);

            const left = Math.floor(origin.x);
            const right = left + 1;
            const xt = origin.x - left;
            const bottom = Math.floor(origin.y);
            const top = bottom + 1;
            const yt = origin.y - bottom;

            const topLerp = lerp(prevDensityField[left][top], prevDensityField[right][top], xt);
            const bottomLerp = lerp(prevDensityField[left][bottom], prevDensityField[right][bottom], xt);
            
            densityField[i][j] = lerp(bottomLerp, topLerp, yt);
        }
    }
}

function advectVelocity(velocityField: Vector2[][], deltaTime: number) {
    const prevVelocityField = initializeGrid(SIZE, (i, j) => velocityField[i][j])
    
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            const velocity = velocityField[i][j];
            const origin = new Vector2(velocity.x, velocity.y).multiplyScalar(-deltaTime).add(new Vector2(i, j));
            origin.x = clamp(origin.x, .5, N + .5);
            origin.y = clamp(origin.y, .5, N + .5);

            const left = Math.floor(origin.x);
            const right = left + 1;
            const xt = origin.x - left;
            const bottom = Math.floor(origin.y);
            const top = bottom + 1;
            const yt = origin.y - bottom;

            const topLerp = new Vector2(
                lerp(prevVelocityField[left][top].x, prevVelocityField[right][top].x, xt),
                lerp(prevVelocityField[left][top].y, prevVelocityField[right][top].y, xt),
            );
            const bottomLerp = new Vector2(
                lerp(prevVelocityField[left][bottom].x, prevVelocityField[right][bottom].x, xt),
                lerp(prevVelocityField[left][bottom].y, prevVelocityField[right][bottom].y, xt)
            );

            velocityField[i][j] = new Vector2(
                lerp(bottomLerp.x, topLerp.x, yt),
                lerp(bottomLerp.y, topLerp.y, yt)
            );
        }
    }

    boundVelocity(velocityField);
}

function decayDensity(densityField: number[][], deltaTime: number) {
    for (let i = 0; i < densityField.length; i++) {
        for (let j = 0; j < densityField.length; j++) {
            densityField[i][j] *= 1 - DENSITY_DECAY_RATE * deltaTime;
        }
    }
}

function projectVelocity(velocityField: Vector2[][]) {
    const divergence = initializeGrid<number>(SIZE, () => 0);
    const p = initializeGrid<number>(SIZE, () => 0);
    const h = 1 / N;

    // Calculate divergence
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            divergence[i][j] = (
                velocityField[i + 1][j].x - velocityField[i - 1][j].x +
                velocityField[i][j + 1].y - velocityField[i][j - 1].y
            ) / 2;
        }
    }

    for (let gs = 0; gs < 16; gs++) {
        for (let i = 1; i <= N; i++) {
            for (let j = 1; j <= N; j++) {
                p[i][j] = (
                    -divergence[i][j] + 
                    p[i - 1][j] + p[i + 1][j] + 
                    p[i][j - 1] + p[i][j + 1]
                ) / 4;
            }
        }
    }
    
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            velocityField[i][j].x = (p[i + 1][j] - p[i - 1][j]) / 2 ;
            velocityField[i][j].y = (p[i][j + 1] - p[i][j - 1]) / 2 ;
        }
    }

    boundVelocity(velocityField);
}

function boundVelocity(velocityField: Vector2[][]) {
    for (let i = 1; i < SIZE - 1; i++) {
        velocityField[i][0] = new Vector2(velocityField[i][1].x, velocityField[i][1].y);
        velocityField[0][i] = new Vector2(velocityField[1][i].x, velocityField[1][i].y);
        velocityField[i][N + 1] = new Vector2(velocityField[i][N].x, velocityField[i][N].y);
        velocityField[N + 1][i] = new Vector2(velocityField[N][i].x, velocityField[N][i].y);
    }
    velocityField[0][0] = new Vector2(
        (velocityField[1][0].x + velocityField[0][1].x) / 2, 
        (velocityField[1][0].y + velocityField[0][1].y) / 2);
    velocityField[0][N + 1] = new Vector2(
        (velocityField[1][N + 1].x + velocityField[0][N].x) / 2, 
        (velocityField[1][N + 1].y + velocityField[0][N].y) / 2);
    velocityField[N + 1][0] = new Vector2(
        (velocityField[N][0].x + velocityField[N + 1][1].x) / 2, 
        (velocityField[N][0].y + velocityField[N + 1][1].y) / 2);
    velocityField[N + 1][N + 1] = new Vector2(
        (velocityField[N][N + 1].x + velocityField[N + 1][N].x) / 2, 
        (velocityField[N][N + 1].y + velocityField[N + 1][N].y) / 2);
}

type hoverFunc = (event: ThreeEvent<PointerEvent>, row: number, column: number) => void;

interface CellProps extends MeshProps {
    color: Color,
    cellScale: Vector3,
    pos: Vector2,
    cOnHover: hoverFunc,
    cOnHoverStop: hoverFunc,
    row: number,
    column: number,
    velocity: Vector2
}

function Cell(props: CellProps) {
    const linePoints: Vector2[] = [];
    linePoints.push(props.pos);
    linePoints.push(new Vector2(props.velocity.x, props.velocity.y).normalize().multiplyScalar(5).add(new Vector2(props.pos.x, props.pos.y)));

    const magnitue = props.velocity.manhattanLength();

    return (
        <>
            <mesh
                {...props}
                scale={props.cellScale}
                position={new Vector3(props.pos.x, props.pos.y, 0)}
                onPointerOver={(event) => props.cOnHover(event, props.row, props.column)}
                onPointerOut={(event) => props.cOnHoverStop(event, props.row, props.column)}>
                <planeGeometry />
                <meshStandardMaterial color={props.color} />
            </mesh>
            {
                DISPLAY_VELOCITY &&
                <>
                    <Line points={linePoints} color={0xFF0000} />
                    <Circle material={new MeshBasicMaterial({color: new Color(magnitue, 0, 0)})} position={new Vector3(linePoints[1].x, linePoints[1].y, 0)} args={[2]}/>
                </>
            }
        </>
    )
}