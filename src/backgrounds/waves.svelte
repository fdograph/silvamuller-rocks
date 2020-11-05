<script lang="ts">
    import { onMount } from 'svelte';

    const gridIteration = (rows: number, cols: number, block: (x: number, y: number) => void) => {
        for(let y = 0; y <= rows; y++) {
            for(let x = 0; x <= cols; x++) {
                block(x, y);
            }
        }
    };

    let container: HTMLDivElement;
    let circles = [];

    const render = () => {
        const height = container.offsetHeight;
        const width = container.offsetWidth;
        const base = width > height ? width : height;
        const outerRadius = 50 * (width / base);
        const gap = outerRadius / 3;
        const innerWidth = width - gap;
        const innerHeight = height - gap;
        const innerRadius = outerRadius + gap * 2;
        const blockWidth = (outerRadius * 2) - (gap / 2);
        const xCount = Math.floor(innerWidth / blockWidth);
        const yCount = Math.floor(innerHeight / blockWidth);

        const restX = innerWidth - (xCount * blockWidth) + gap;
        const restY = innerHeight - (yCount * blockWidth) + gap;

        const grid = [];
        gridIteration(yCount, xCount, (col, row) => {
            const cx = (blockWidth * col) + (restX / 2);
            const cy = (blockWidth * row) + (restY / 2);
            const radius = innerRadius;
            const delay = 60 * (grid.length / 2) * -1;
            const size = blockWidth;

            grid.push({
                cx, cy, radius, delay, size
            });
        });
        circles = grid;
    };

    onMount(render);
</script>

<svelte:window on:resize={render}/>
<div bind:this={container} >
    <svg>
        {#each circles as c, index}
            <circle
                cx="{c.cx}"
                cy="{c.cy}"
                r="{c.radius}"
                style="
                    --cx: {c.x1}px;
                    --cy: {c.y1}px;
                    --delay: {c.delay}ms;
                    --size: {c.size}px;
                    "
            />
        {/each}
    </svg>
</div>

<style>
    @keyframes shakeIt {
        to {
            transform: translateZ(0) translateY(-2%) translateX(2%);
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

    svg circle {
        --cx: 0px;
        --cy: 0px;
        --delay: 0;
        --size: 0px;
        fill: var(--bg-color);
        stroke-width: 1px;
        stroke: var(--fg-color);
        transform: translateZ(0) translateY(0) translateX(0);
        transform-origin: var(--cx) var(--cy);
        animation-name: shakeIt;
        animation-duration: 4000ms;
        animation-timing-function: cubic-bezier(0.74, -2.1, 0.12, 2.82);
        animation-direction: alternate;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
        animation-delay: var(--delay);
    }
</style>
