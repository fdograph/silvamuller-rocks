<script lang="ts">
  import { onMount } from 'svelte';
  import { createLine, randomBetween, randomPoint } from '../helpers';
  import type { Point, LineCoords } from '../helpers';

  let container: HTMLDivElement;

  interface TargetProps {
    target: Point;
    speed: number;
    delay: number;
    rays: LineCoords[];
  }
  let targets: TargetProps[] = [];

  const sunRays = (
    center: Point,
    length: number,
    count: number,
    angleStart: number = 0,
    angleEnd: number = 360
  ) => {
    const angleLength = angleEnd - angleStart;
    const angleStep = Math.ceil(angleLength / count);
    return [...new Array(count)].map((v, i) =>
      createLine(center, length, angleStep * i)
    );
  };

  const render = () => {
    const height = container.offsetHeight;
    const width = container.offsetWidth;
    const base = width > height ? width : height;
    const rayLength = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    const count = Math.round(base * 0.007);

    targets = [...new Array(count)].map((v, i) => {
      const target = randomPoint(width, height);
      const speed = randomBetween(5000, 15000);
      const delay = randomBetween(0, 1000);

      return {
        target,
        speed,
        delay,
        rays: sunRays(target, rayLength, 50),
      };
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
  @keyframes spin {
    to {
      transform: translateZ(0) rotateZ(-360deg);
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

  svg .sun {
    --cx: 0;
    --cy: 0;
    --speed: 0;
    --delay: 0;
    transform: translateZ(0) rotateZ(0);
    transform-origin: var(--cx) var(--cy);
    animation-name: spin;
    animation-duration: 70000ms;
    animation-delay: var(--delay);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  svg line {
    stroke-width: 1px;
    stroke: var(--fg-color);
  }
</style>

<svelte:window on:resize={render} />
<div bind:this={container}>
  <svg>
    {#each targets as target}
      <g
        class="sun"
        style="
                    --cx: {target.target.x}px;
                    --cy: {target.target.y}px;
                    --speed: {target.speed}ms;
                    --delay: {target.delay}ms;
                ">
        {#each target.rays as ray, index}
          <line
            x1={target.target.x}
            y1={target.target.y}
            x2={target.target.x}
            y2={target.target.y}>
            <animate
              repeatCount="indefinite"
              attributeName="x1"
              from={target.target.x}
              to={ray.b.x}
              begin="{target.delay}ms"
              dur="{target.speed}ms"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="1 0 1 1" />
            <animate
              repeatCount="indefinite"
              attributeName="y1"
              from={target.target.y}
              to={ray.b.y}
              begin="{target.delay}ms"
              dur="{target.speed}ms"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="1 0 1 1" />
            <animate
              repeatCount="indefinite"
              attributeName="x2"
              from={target.target.x}
              to={ray.b.x}
              begin="{target.delay}ms"
              dur="{target.speed}ms" />
            <animate
              repeatCount="indefinite"
              attributeName="y2"
              from={target.target.y}
              to={ray.b.y}
              begin="{target.delay}ms"
              dur="{target.speed}ms" />
          </line>
        {/each}
      </g>
    {/each}
  </svg>
</div>
