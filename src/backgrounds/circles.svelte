<script lang="ts">
  import { onMount } from 'svelte';
  import { randomBetween, describeArc } from '../helpers';

  let container: HTMLDivElement;
  let arcs = [];

  const lowerBounds = (d: number) => d * 0.25 * -1;
  const upperBounds = (d: number) => d * 1.25;

  const render = () => {
    const height = container.offsetHeight;
    const width = container.offsetWidth;
    const base = width > height ? width : height;
    const count = Math.round(base * 0.03);

    arcs = [...new Array(count)].map((n, i) => {
      const x = randomBetween(lowerBounds(width), upperBounds(width));
      const y = randomBetween(lowerBounds(height), upperBounds(height));
      const radius = randomBetween(base / 3, base * 1.5);
      const angleLength = randomBetween(45, 100);

      const speed = randomBetween(4000, 20000);
      const delay = randomBetween(0, 500);
      const path = describeArc(x, y, radius, angleLength * -1, angleLength);

      return { x, y, radius, speed, delay, path };
    });
  };

  const deferRender = () => {
    setTimeout(() => {
      requestAnimationFrame(render);
    }, 1);
  };

  onMount(deferRender);
</script>

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

  svg .arc {
    --cx: 0;
    --cy: 0;
    --speed: 5000ms;
    --delay: 0ms;
    fill: none;
    stroke-width: 1px;
    stroke: var(--fg-color);
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

<svelte:window on:resize={render} />
<div bind:this={container}>
  <svg>
    {#each arcs as arc}
      <path
        class="arc"
        d={arc.path}
        style="
            --cx: {arc.x}px;
            --cy: {arc.y}px;
            --speed: {arc.speed}ms;
            --delay: {arc.delay}ms;
        " />
    {/each}
  </svg>
</div>
