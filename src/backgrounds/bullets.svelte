<script lang="ts">
    import { onMount } from 'svelte';
    import { randomBetween } from "./helpers";
    import type { Point } from "./helpers.ts";

    interface LineCoords {
        a: Point,
        b: Point,
    }

    let container: HTMLDivElement;

    interface TargetProps {
        target: Point;
        speed: number;
        delay: number;
        rays: LineCoords[];
    }
    let targets: TargetProps[] = [];

    const degree2radian = (a: number) => a * 0.017453292519;
    const calculateX = (x: number, l: number, a: number) => x + l * Math.cos(a);
    const calculateY = (y: number, l: number, a: number) => y + l * Math.sin(a);
    const createPoint = (x: number, y: number): Point => ({ x, y });
    const randomPoint = (w: number, h: number): Point => createPoint(
        randomBetween(0, w),
        randomBetween(0, h)
    );
    const projectPoint = (point: Point, l: number, a: number): Point => createPoint(
        calculateX(point.x, l, degree2radian(a)),
        calculateY(point.y, l, degree2radian(a))
    );
    const createLine = (origin: Point, length: number, angle: number = 0): LineCoords => ({
        a: origin,
        b: projectPoint(origin, length, angle),
    });

    const buildRays = (target: Point, distance: number , length: number, angle: number) => {
        const mirrorAngle = 180 - angle;

        const topLeftPointAngle = mirrorAngle * -1;
        const topLeftPoint = projectPoint(target, distance, topLeftPointAngle);
        const topLeftRay = createLine(topLeftPoint, length, topLeftPointAngle);

        const topRightPointAngle = angle * -1;
        const topRightPoint = projectPoint(target, distance, topRightPointAngle);
        const topRightRay = createLine(topRightPoint, length, topRightPointAngle);

        const bottomLeftPointAngle = mirrorAngle;
        const bottomLeftPoint = projectPoint(target, distance, bottomLeftPointAngle);
        const bottomLeftRay = createLine(bottomLeftPoint, length, bottomLeftPointAngle);

        const bottomRightPointAngle = angle;
        const bottomRightPoint = projectPoint(target, distance, bottomRightPointAngle);
        const bottomRightRay = createLine(bottomRightPoint, length, bottomRightPointAngle);

        return [
            topLeftRay,
            topRightRay,
            bottomLeftRay,
            bottomRightRay
        ];
    };

    const render = () => {
        const height = container.offsetHeight;
        const width = container.offsetWidth;
        const base = width > height ? width : height;
        const count = 20;

        targets = [...new Array(count)].map((v, i) => {
            const target = randomPoint(width, height);
            const distance = base;
            const length = 400;
            const speed = randomBetween(1500, 4500);
            const delay = randomBetween(-10000, 10000);
            const angle = 45;

            return {
                target,
                speed,
                delay,
                rays: buildRays(target, distance, length, angle),
            }
        });
    };

    onMount(render);
</script>

<svelte:window on:resize={render}/>
<div bind:this={container} >
    <svg>
        {#each targets as target}
            {#each target.rays as ray}
                <line
                        x1="{target.target.x}"
                        y1="{target.target.y}"
                        x2="{target.target.x}"
                        y2="{target.target.y}"
                >
                    <animate
                            repeatCount="indefinite"
                            attributeName="x1"
                            from="{target.target.x}"
                            to="{ray.a.x}"
                            begin="{target.delay}ms"
                            dur="{target.speed}ms"
                    />
                    <animate
                            repeatCount="indefinite"
                            attributeName="y1"
                            from="{target.target.y}"
                            to="{ray.a.y}"
                            begin="{target.delay}ms"
                            dur="{target.speed}ms"
                    />

                    <animate
                            repeatCount="indefinite"
                            attributeName="x2"
                            from="{target.target.x}"
                            to="{ray.b.x}"
                            begin="{target.delay}ms"
                            dur="{target.speed}ms"
                    />
                    <animate
                            repeatCount="indefinite"
                            attributeName="y2"
                            from="{target.target.y}"
                            to="{ray.b.y}"
                            begin="{target.delay}ms"
                            dur="{target.speed}ms"
                    />
                </line>
            {/each}
        {/each}
    </svg>
</div>

<style>
    div {
        display: flex;
        flex: 1;
        width: 100%;
        height: 100%;
    }

    svg {
        display: block;
        flex: 1;
    }

    svg line {
        stroke-width: 1px;
        stroke: var(--fg-color);
    }
</style>
