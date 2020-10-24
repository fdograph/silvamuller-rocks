<script lang="ts">
    import { onMount } from 'svelte';

    let container: HTMLDivElement;
    let lines = [];

    const degree2radian = (a: number) => a * 0.017453292519;
    const calculateX = (x: number, l: number, a: number) => x + l * Math.cos(a);
    const calculateY = (y: number, l: number, a: number) => y + l * Math.sin(a);

    const angle = -30;
    const ra = degree2radian(angle);

    const render = () => {
        const height = container.offsetHeight;
        const width = container.offsetWidth;
        const count = Math.round(height * 0.3);
        const distance = width * 3;
        const x1 = width * -1;

        lines = [...new Array(count)].map((v, i) => {
            const l = Math.floor(Math.random() * 400) + 20;
            const y1 = Math.floor(Math.random() * height * 5);

            const x2 = calculateX(x1, l, ra);
            const y2 = calculateY(y1, l, ra);

            const x3 = calculateX(x2, distance, ra);
            const y3 = calculateY(y2, distance, ra);

            const x4 = calculateX(x3, l, ra);
            const y4 = calculateY(y3, l, ra);

            const speed = Math.floor(Math.random() * distance * 10) + distance;

            return {
                x1,
                y1,
                x2,
                y2,
                x3,
                y3,
                x4,
                y4,
                speed,
            };
        });
    };

    onMount(render);
</script>

<svelte:window on:resize={render}/>
<div bind:this={container} >
    <svg>
        {#each lines as line}
            <line
                    x1="{line.x1}"
                    y1="{line.y1}"
                    x2="{line.x2}"
                    y2="{line.y2}"
            >
                <animate repeatCount="indefinite" attributeName="x1" from="{line.x1}" to="{line.x3}" begin="0" dur="{line.speed}ms" />
                <animate repeatCount="indefinite" attributeName="y1" from="{line.y1}" to="{line.y3}" begin="0" dur="{line.speed}ms" />
                <animate repeatCount="indefinite" attributeName="x2" from="{line.x2}" to="{line.x4}" begin="0" dur="{line.speed}ms" />
                <animate repeatCount="indefinite" attributeName="y2" from="{line.y2}" to="{line.y4}" begin="0" dur="{line.speed}ms" />
            </line>
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
