<script lang="ts">
    import { onMount } from 'svelte';
    import { createPoint } from "../helpers";
    import type { Point } from "../helpers";

    let container: HTMLDivElement;
    let cubes = [];

    const concentricCubes = (center: Point, min: number, max: number, count: number) => {
        const diff = max - min;
        const step = Math.ceil(diff / count);
        return [...new Array(count)].map((v, i) => ({ center, size: min + (step * i) }));
    };

    const render = async () => {
        const height = container.offsetHeight;
        const width = container.offsetWidth;
        const center = createPoint(width/3 * 2, height/3 * 2);
        const minSize = width * 0.035;
        const maxSize = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        cubes = concentricCubes(center, minSize, maxSize, 8);
    };

    onMount(render);
</script>

<svelte:window on:resize={render}/>
<div bind:this={container} class="container" >
    {#each cubes as cube, index}
        <div
                class="cube"
                style="
                    --cube-size: {cube.size}px;
                    --cx: {cube.center.x}px;
                    --cy: {cube.center.y}px;
                    --delay: {(index + 1) * 500 - 500}ms;
                    --speed: {(index + 1) * 4000}ms;
                "
        >
            <div class="side front"></div>
            <div class="side back"></div>
            <div class="side left"></div>
            <div class="side right"></div>
            <div class="side top"></div>
            <div class="side bottom"></div>
        </div>
    {/each}
</div>

<style type="text/postcss">
    @keyframes cubeSpin {
        0% {
            transform: rotateX(0deg) rotateY(0) rotateZ(0) translateZ(0);
        }
        100% {
            transform: rotateX(360deg) rotateY(360deg) rotateZ(0) translateZ(0);
        }
    }

    .container {
        display: flex;
        flex: 1;
        width: 100%;
        height: 100%;
        position: relative;
        perspective: 800px;
        overflow: hidden;
    }

    .cube {
        --cx: 100px;
        --cy: 100px;
        --cube-size: 100px;
        --delay: 1ms;
        --speed: 30s;
        position: absolute;
        top: calc(var(--cy) - (var(--cube-size) / 2));
        left: calc(var(--cx) - (var(--cube-size) / 2));
        display: flex;
        width: var(--cube-size);
        height: var(--cube-size);
        transform-style: preserve-3d;
        backface-visibility: visible;
        transform: rotateX(0) rotateY(0) rotateZ(0) translateZ(0);
        animation-name: cubeSpin;
        animation-duration: var(--speed);
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-delay: var(--delay);
    }

    .cube .side {
        display: flex;
        align-content: stretch;
        justify-content: stretch;
        position: absolute;
        width: var(--cube-size);
        height: var(--cube-size);
        backface-visibility: visible;
        border: 1px solid var(--fg-color);
        /*background: var(--bg-color);*/
    }

    .cube .side.front {
         transform: rotateY(0deg) translateZ(calc(var(--cube-size) / 2));
    }
    .cube .side.back {
         transform: rotateY(180deg)
         translateZ(calc(var(--cube-size) / 2));
    }
    .cube .side.right {
         transform: rotateY(90deg)
         translateZ(calc(var(--cube-size) / 2));
    }
    .cube .side.left {
         transform: rotateY(-90deg)
         translateZ(calc(var(--cube-size) / 2));
    }
    .cube .side.top {
         transform: rotateX(90deg)
         translateZ(calc(var(--cube-size) / 2));
    }
    .cube .side.bottom {
         transform: rotateX(-90deg)
         translateZ(calc(var(--cube-size) / 2));
    }
</style>
