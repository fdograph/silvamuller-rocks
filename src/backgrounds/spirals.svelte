<script lang="ts">
  import type { Point } from '../helpers.ts';
  import { buildSpiral } from '../helpers.ts';
  import { onMount } from 'svelte';

  interface Spiral {
    path: string;
    isOdd: boolean;
    dash: number;
    center: Point;
  }

  const getSpiralPath = (center: Point, distance: number) =>
    buildSpiral(center, 0, distance, 0, 60 * 360, 30);
  const count = 3;

  let container: HTMLDivElement;
  let spirals: Spiral[] = [];

  const render = () => {
    spirals = [];
    const height = container.offsetHeight;
    const width = container.offsetWidth;
    const d = height / 8;
    // const dash = Math.log10(width * 300) * (Math.log10(width) * 50);
    const dash = 5000;

    const ax = 0;
    const ay = 0;
    const centerA = { x: ax, y: ay };

    const spiralA = {
      center: centerA,
      isOdd: false,
      dash,
      path: getSpiralPath(centerA, d),
    };
    spirals.push(spiralA);

    const centerB = { x: width, y: height };
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

<style>
  @keyframes spiralRotate {
    to {
      transform: scale(1, 0.4) translateZ(0) rotateZ(-900deg);
    }
  }

  @keyframes spiralRotateMirror {
    to {
      transform: scale(-1, 0.4) translateZ(0) rotateZ(360deg);
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
    transform: scale(1, 0.4) translateZ(0) rotateZ(0);
    transform-origin: var(--x) var(--y);
    animation-name: spiralRotate;
    animation-duration: 20000ms;
    animation-delay: 0;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    /*stroke-dasharray: var(--dash);*/
  }

  svg path.odd {
    /*animation-duration: 3000ms;*/
    /*animation-delay: -1000ms;*/
    animation-duration: 10000ms;
  }

  svg path.mirror {
    --x: 0px;
    --y: 0px;
    transform: scale(-1, 0.4) translateZ(0) rotateZ(0);
    transform-origin: var(--x) var(--y);
    animation-name: spiralRotateMirror;
  }
</style>

<svelte:window on:resize={render} />
<div bind:this={container}>
  <svg>
    {#each spirals as spiral}
      <path
        class={spiral.isOdd ? 'odd' : ''}
        d={spiral.path}
        style="
                    --x: {spiral.center.x}px;
                    --y: {spiral.center.y}px;
                " />
      <path
        class="mirror {spiral.isOdd ? 'odd' : ''}"
        d={spiral.path}
        style="
                    --x: {spiral.center.x}px;
                    --y: {spiral.center.y}px;
                " />
    {/each}
  </svg>
</div>
