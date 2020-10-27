<script lang="ts">
    import { getPath, randomBetween } from "./helpers";
    import { onMount } from "svelte";

    interface Point {
        x: number;
        y: number;
    }

    interface Spiral {
        path: string;
        center: Point;
    }

    const getSpiralPath = (center: Point, distance: number) => getPath(
        center,
        0,
        distance,
        0,
        30 * 360,
        30
    );
    const count = 3;

    let container: HTMLDivElement;

    let spirals: Spiral[] = [];

    const render = () => {
        const height = container.offsetHeight;
        const width = container.offsetWidth;

        spirals = [...new Array(count)].map(() => {
            const x = randomBetween(0, width);
            const y = randomBetween(0, height);
            const center = { x, y };

            return {
                center,
                path: getSpiralPath(center, 80),
            };
        });
    };

    onMount(render);
</script>

<svelte:window on:resize={render}/>
<div bind:this={container} >
    <svg>
        {#each spirals as spiral}
            <path
                d="{spiral.path}"
                style="
                    --x: {spiral.center.x}px;
                    --y: {spiral.center.y}px;
                "
            />
            <path
                class="mirror"
                d="{spiral.path}"
                style="
                    --x: {spiral.center.x}px;
                    --y: {spiral.center.y}px;
                "
            />
        {/each}

    </svg>
</div>

<style>
    @keyframes spiralRotate {
        to {
            transform: translateZ(0) rotateZ(360deg);
        }
    }

    @keyframes spiralRotateMirror {
        to {
            transform: scale(-1, -1) translateZ(0) rotateZ(360deg);
        }
    }

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

    svg path {
        --x: 0px;
        --y: 0px;
        fill: none;
        stroke-width: 1px;
        stroke: var(--fg-color);
        transform: translateZ(0) rotateZ(0);
        transform-origin: var(--x) var(--y);
        animation-name: spiralRotate;
        animation-duration: 2000ms;
        animation-delay: 0;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    svg path.mirror {
        --x: 0px;
        --y: 0px;
        transform: scale(-1, -1) translateZ(0) rotateZ(0);
        transform-origin: var(--x) var(--y);
        animation-name: spiralRotateMirror;
        animation-duration: 2000ms;
        animation-delay: 0;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }
</style>
