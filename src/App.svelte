<script lang="ts">
  import DarkLines from './backgrounds/dark-lines.svelte';
  import Yellow from './backgrounds/yellow.svelte';
  import Circles from './backgrounds/circles.svelte';
  import Waves from './backgrounds/waves.svelte';
  import Spirals from './backgrounds/spirals.svelte';
  import Bullets from './backgrounds/bullets.svelte';
  import Solar from './backgrounds/solar.svelte';
  import Cubes from './backgrounds/cubes.svelte';
  import Content from './content.svelte';
  import { getParams, themes } from './helpers';
  import type { ThemeName } from './helpers';

  const params = getParams<{ theme: ThemeName }>(window.location);
  const urlTheme =
    params.theme && themes.indexOf(params.theme) !== -1
      ? themes.indexOf(params.theme)
      : null;
  const defaultIndex =
    urlTheme !== null
      ? urlTheme
      : Math.floor(Math.random() * (themes.length - 1));
  let currentTheme: ThemeName = themes[defaultIndex];

  const flipTheme = () => {
    const currIndex = themes.indexOf(currentTheme);
    const nextIndex = currIndex === themes.length - 1 ? 0 : currIndex + 1;
    currentTheme = themes[nextIndex];
  };
</script>

<style>
  :root {
    --bg-color: hsl(0deg, 0%, 5%);
    --bg-color-transparent: hsl(0deg, 0%, 5%, 0);
    --fg-color: #ededed;
  }

  main.dark-lines {
    --bg-color: hsl(0deg, 0%, 5%);
    --fg-color: #ededed;
  }

  main.yellow {
    --bg-color: hsl(45 100% 50%);
    --fg-color: hsl(0, 0%, 15%);
  }

  main.circles {
    --bg-color: hsl(330 100% 45%);
    --fg-color: hsl(0, 0%, 15%);
  }

  main.waves {
    --bg-color: hsl(65 100% 55% / 1);
    --fg-color: hsl(220deg 100% 55%);
  }

  main.spirals {
    --bg-color: hsl(0deg 0% 10%);
    --fg-color: hsl(100 100% 55% / 1);
  }

  main.bullets {
    --bg-color: hsl(240 100% 30% / 1);
    --fg-color: hsl(0deg 0% 100%);
  }

  main.solar {
    --bg-color: hsl(0deg 100% 60%);
    --fg-color: hsl(200 50% 30% / 1);
  }

  main.cubes {
    --bg-color: hsl(141deg 100% 17%);
    --fg-color: hsl(0deg 0% 10%);
  }

  main {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--bg-color);
    color: var(--fg-color);
    padding: 4vw 6vw;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .btn-holder {
    display: flex;
    flex: 0;
  }

  button {
    display: block;
    position: relative;
    z-index: 10;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--fg-color);
    color: var(--bg-color);
    border: none;
    padding: 0.5em 0.75em;
    margin: 0;
    border-radius: 1em;
    line-height: 1;
    font-weight: 600;
    box-shadow: none;
    transform: scale(1);
    transition: all 150ms ease;
  }

  button:hover,
  button:active {
    transform: scale(1.2);
    background-color: var(--bg-color);
    color: var(--fg-color);
    box-shadow: 0 0 1em rgba(0, 0, 0, 0.3);
  }
</style>

<main class={currentTheme}>
  <div class="background">
    {#if currentTheme === 'dark-lines'}
      <DarkLines />
    {:else if currentTheme === 'yellow'}
      <Yellow />
    {:else if currentTheme === 'circles'}
      <Circles />
    {:else if currentTheme === 'waves'}
      <Waves />
    {:else if currentTheme === 'spirals'}
      <Spirals />
    {:else if currentTheme === 'bullets'}
      <Bullets />
    {:else if currentTheme === 'solar'}
      <Solar />
    {:else if currentTheme === 'cubes'}
      <Cubes />
    {/if}
  </div>
  <Content />

  <div class="btn-holder">
    <button on:click={flipTheme} title="Click me to change the theme">Click me
      :)</button>
  </div>
</main>
