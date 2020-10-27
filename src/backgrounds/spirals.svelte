<script lang="ts">
    import { getPath, randomBetween } from "./helpers";
    import { onMount } from "svelte";

    interface Point {
        x: number;
        y: number;
    }

    interface Spiral {
        path: string;
        isOdd: boolean;
        dash: number;
        center: Point;
    }

    const getSpiralPath = (center: Point, distance: number) => getPath(
        center,
        0,
        distance,
        0,
        60 * 360,
        30
    );
    const count = 3;

    let container: HTMLDivElement;

    let spirals: Spiral[] = [];

    const render = () => {
        spirals = [];
        const height = container.offsetHeight;
        const width = container.offsetWidth;
        const d = height / 10;
        const dash = Math.log10(width * 300) * (Math.log10(width) * 50);

        const ax = width * -0.15;
        const ay = height * 0.5;
        const centerA = { x: ax, y: ay };

        const spiralA = {
            center: centerA,
            isOdd: false,
            dash,
            path: getSpiralPath(centerA, d),
        };
        spirals.push(spiralA);

        const bx =  width * 1.15;
        const by = height * 0.5;
        const centerB = { x: bx, y: by };

        const spiralB = {
            center: centerB,
            isOdd: true,
            dash,
            path: getSpiralPath(centerB, d),
        };
        spirals.push(spiralB);
    };

    onMount(render);
</script>

<svelte:window on:resize={render}/>
<div bind:this={container} >
    <svg>
        {#each spirals as spiral}
            <path
                class="{spiral.isOdd ? 'odd' : ''}"
                d="{spiral.path}"
                style="
                    --x: {spiral.center.x}px;
                    --y: {spiral.center.y}px;
                    --dash: {spiral.dash};
                "
            />
            <path
                class="mirror {spiral.isOdd ? 'odd' : ''}"
                d="{spiral.path}"
                style="
                    --x: {spiral.center.x}px;
                    --y: {spiral.center.y}px;
                    --dash: {spiral.dash};
                "
            />
        {/each}
    </svg>
</div>

<style>
    @keyframes spiralRotate {
        to {
            transform: translateZ(0) rotateZ(-360deg);
        }
    }

    @keyframes spiralRotateMirror {
        to {
            transform: scale(-1, -1) translateZ(0) rotateZ(-360deg);
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
        --dash: 200;
        fill: none;
        stroke-width: 1px;
        stroke: var(--fg-color);
        transform: translateZ(0) rotateZ(0);
        transform-origin: var(--x) var(--y);
        animation-name: spiralRotate;
        animation-duration: 30000ms;
        animation-delay: 0;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        stroke-dasharray: var(--dash);
    }

    svg path.odd {
        /*animation-duration: 3000ms;*/
        animation-delay: -1000ms;
    }

    svg path.mirror {
        --x: 0px;
        --y: 0px;
        transform: scale(-1, -1) translateZ(0) rotateZ(0);
        transform-origin: var(--x) var(--y);
        animation-name: spiralRotateMirror;
    }
</style>
