<script lang="ts">
    import { onMount } from 'svelte';

    const hueStart = 250;
    const hueEnd = 180;

    let container: HTMLDivElement;
    let lines = [];

    const render = () => {
        const height = container.offsetHeight;
        const count = Math.round(height * 0.05);
        const hueStep = Math.abs(hueStart - hueEnd) / count;

        lines = [...new Array(count)].map((v, i) => ({
            index: i,
            y: (100 / count) * i,
            color: `hsl(${(hueStart + (hueStep * i))}deg, 100%, 50%)`,
            delay: (100 / count) * i * i,
        }));
    };

    onMount(render);
</script>

<svelte:window on:resize={render}/>

<div bind:this={container} >
    <svg>
        {#each lines as line}
            <line
                x1="0"
                y1="{line.y}%"
                x2="100%"
                y2="{line.y}%"
                stroke="{line.color}"
                style="animation-delay: {line.delay}ms;"
            />
        {/each}
    </svg>
</div>

<style>
    @keyframes appear {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    div {
        position: absolute;
        pointer-events: none;
        display: flex;
        width: 100%;
        height: 100%;
    }

    svg {
        display: block;
        flex: 1;
    }

    svg line {
        stroke-width: 1px;
        animation-name: appear;
        animation-duration: 500ms;
        animation-timing-function: ease;
        animation-direction: normal;
        animation-fill-mode: both;
        opacity: 0;
        transform: translateY(80px);
    }
</style>
