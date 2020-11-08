<script lang="ts">
    import { onMount } from 'svelte';
    import { randomBetween } from "../helpers";

    let container: HTMLDivElement;
    let circles = [];

    const lowerBounds = (d: number) => d * 0.75 * -1;
    const upperBounds = (d: number) => d * 1.9;

    const render = async () => {
        const height = container.offsetHeight;
        const width = container.offsetWidth;
        const base = width > height ? width : height;
        const count = Math.round(base * 0.03);

        circles = [...new Array(count)].map((v, i) => {
            const x1 = randomBetween(lowerBounds(width), upperBounds(width));
            const y1 = randomBetween(lowerBounds(height), upperBounds(height));

            const radius = randomBetween(base / 3, base * 1.5);
            const circunf = Math.ceil((Math.PI * 2) * radius);
            const segment = circunf / 1.5;
            const speed = randomBetween(4000, 20000);
            const delay = randomBetween(0, 500);

            return {
                radius,
                circunf,
                segment,
                x1, y1,
                speed,
                delay,
            };
        });
    };

    onMount(render);
</script>

<svelte:window on:resize={render}/>
<div bind:this={container} >
    <svg>
        {#each circles as c}
            <circle
                cx="{c.x1}"
                cy="{c.y1}"
                r="{c.radius}"
                style="
                    --circunf: {c.circunf};
                    --cx: {c.x1}px;
                    --cy: {c.y1}px;
                    --speed: {c.speed}ms;
                    --delay: {c.delay}ms;
                    --segment: {c.segment};
                "
            />
        {/each}
    </svg>
</div>

<style>
    @keyframes rotateCircle {
        from {
            transform: translateZ(0) rotateZ(0deg);
        }
        to {
            transform: translateZ(0) rotateZ(360deg);
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
        backface-visibility: hidden;
    }

    svg circle {
        --circunf: 0;
        --segment: 0;
        --cx: 0;
        --cy: 0;
        --speed: 5000ms;
        --delay: 0ms;
        fill: none;
        stroke-width: 1px;
        stroke: var(--fg-color);
        stroke-dasharray: var(--segment), var(--circunf);
        backface-visibility: visible;
        transform: translateZ(0) rotateZ(0deg);
        transform-origin: var(--cx) var(--cy);
        animation-name: rotateCircle;
        animation-duration: var(--speed);
        animation-delay: var(--delay);
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }
</style>
