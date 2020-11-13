<script lang="ts">
    import { onMount, tick } from 'svelte';

    const hueRange = 70;

    let container: HTMLDivElement;
    let lines = [];
    let hue = 0;
    let frame;

    const nextHue = (currentHue: number) => {
        if(currentHue === 360) {
            return 0;
        }

        return currentHue + 1;
    };
    const buildLines = (height: number) => {
        const count = Math.round(height * 0.05);
        const hueStep = hueRange / count;

        hue = nextHue(hue);

        lines = [...new Array(count)].map((v, i) => ({
            index: i,
            y: (100 / count) * i,
            color: `hsl(${(hue + (hueStep * i))}deg, 100%, 50%)`,
            delay: (100 / count) * i * i,
        }));
    };

    const render = () => {
        const height = container.offsetHeight;

        clearInterval(frame);
        frame = setInterval(() => {
            buildLines(height);
        }, 1000 / 60);
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
