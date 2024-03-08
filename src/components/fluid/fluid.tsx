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

const SOURCE_ADD_FACTOR = 1;
const DENSITY_DIFFUSION_RATE = .0005;

const FORCE_ADD_FACTOR = 10000;
const VELOCITY_DIFFUSION_RATE = .005;

/** 
 * Grid spacing is 1/N
 * ∂ϱ/∂t = -(u*∇)ϱ + (κ∇^2)ϱ + S
 * ϱ is density, first term: density should follow velocity field, 
 * second term is diffusion, third term is increase in density due to sources
 */
function Fluid(props: {simScale: number}) {
    const [rerender, setRerender] = useState(false);
    const [hoveredCells, setHoveredCells] = useState<boolean[][]>(initializeGrid<boolean>(SIZE, () => false));

    useFrame((state, dt) => {
        setRerender(!rerender);
        if (hoveredCells.length == 0) return;
        
        const sources = initializeGrid<number>(SIZE, (i, j) => (hoveredCells[i][j]) && j <= N && j > 0 && i > 0 && i <= N ? SOURCE_ADD_FACTOR : 0);
        applySources(densityField, sources, dt);
        diffuseDensity(densityField, DENSITY_DIFFUSION_RATE, dt);
        advectDensity(densityField, velocityField, dt);

        const forces = initializeGrid<Vector2>(SIZE, () => new Vector2(0, 0));
        for (let i = 1; i <= N; i++) {
            for (let j = 1; j <= N; j++) {
                if (!hoveredCells[i][j]) continue;

                forces[i][j] = new Vector2(FORCE_ADD_FACTOR, 0);
            }
        }

        applyForces(velocityField, forces, dt);
        diffuseVelocity(velocityField, VELOCITY_DIFFUSION_RATE, dt);
        projectVelocity(velocityField);
        advectVelocity(velocityField, dt);
        projectVelocity(velocityField);

        setDensityField(densityField);
        setVelocityField(velocityField);
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

function projectVelocity(velocityField: Vector2[][]) {
    const divergence = initializeGrid<number>(SIZE, () => 0);
    const p = initializeGrid<number>(SIZE, () => 0);
    const h = 1 / N;

    // Calculate divergence
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            divergence[i][j] = (
                velocityField[i][j + 1].x - velocityField[i][j - 1].x +
                velocityField[i][j + 1].y - velocityField[i][j - 1].y
            ) * h / 2;
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
            velocityField[i][j].x = (p[i + 1][j] - p[i - 1][j]) / 2 / h;
            velocityField[i][j].y = (p[i][j + 1] - p[i][j - 1]) / 2 / h;
        }
    }

    boundVelocity(velocityField);
}

function boundVelocity(velocityField: Vector2[][]) {
    for (let i = 0; i < SIZE; i++) {
        velocityField[i][0] = new Vector2(0);
        velocityField[0][i] = new Vector2(0);
        velocityField[i][N + 1] = new Vector2(0);
        velocityField[N + 1][i] = new Vector2(0);
    }
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