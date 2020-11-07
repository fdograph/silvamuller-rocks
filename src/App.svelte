<script lang="ts">
    import DarkLines from './backgrounds/dark-lines.svelte';
    import Yellow from './backgrounds/yellow.svelte';
    import Circles from './backgrounds/circles.svelte';
    import Waves from './backgrounds/waves.svelte';
    import Spirals from './backgrounds/spirals.svelte';
    import Bullets from './backgrounds/bullets.svelte';
    import Solar from './backgrounds/solar.svelte';
    import Content from "./content.svelte";

    const themes = [
        'spirals',
        'dark-lines',
        'yellow',
        'circles',
        'waves',
        'bullets',
        'solar',
    ];
    type ThemeName = typeof themes[number];

    const randomIndex = Math.floor(Math.random() * (themes.length - 1));
    let currentTheme: ThemeName = themes[randomIndex];

    const flipTheme = () => {
        const currIndex = themes.indexOf(currentTheme);
        const nextIndex = currIndex === themes.length - 1 ? 0 : currIndex + 1;
        currentTheme = themes[nextIndex];
    }
</script>

<main class="{currentTheme}">
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
        {/if}
    </div>

    <Content />

    <button on:click={flipTheme} title="Click me to change the theme">Click me :)</button>
</main>

<style>
    :root {
        --bg-color: hsl(0deg, 0%, 5%);
        --bg-color-transparent: hsl(0deg, 0%, 5%, 0);
        --fg-color: #ededed;
        --action-color: hsl(255deg, 100%, 50%);
    }

    main.dark-lines {
        --bg-color: hsl(0deg, 0%, 5%);
        --fg-color: #ededed;
        --action-color: hsl(255deg, 100%, 50%);
    }

    main.yellow {
        --bg-color: hsl(45 100% 50%);
        --fg-color: hsl(0, 0%, 15%);
        --action-color: hsl(255 100% 50%);
    }

    main.circles {
        --bg-color: hsl(330 100% 45%);
        --fg-color: hsl(0, 0%, 15%);
        --action-color: hsl(255 100% 50%);
    }

    main.waves {
        --bg-color: hsl(65 100% 55% / 1);
        --fg-color: hsl(220deg 100% 55%);
        --action-color: hsl(255 100% 50%);
    }

    main.spirals {
        --bg-color: hsl(0deg 0% 10%);
        --fg-color: hsl(100 100% 55% / 1);
        --action-color: hsl(255 100% 50%);
    }

    main.bullets {
        --bg-color: hsl(240 100% 30% / 1);
        --fg-color: hsl(0deg 0% 100%);
        --action-color: hsl(255 100% 50%);
    }

    main.solar {
        --bg-color: hsl(0deg 100% 60%);
        --fg-color: hsl(200 50% 30% / 1);
        --action-color: hsl(255 100% 50%);
    }

    main {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--bg-color);
        color: var(--fg-color);
    }

    .background {
        position: absolute;
        pointer-events: none;
        display: flex;
        width: 100%;
        height: 100%;
    }

    button {
        display: flex;
        align-self: flex-start;
        z-index: 10;
        margin: 0 0 4vw 6vw;
        -webkit-appearance: none;
        appearance: none;
        background-color: var(--fg-color);
        color: var(--bg-color);
        border: none;
        padding: .5em .75em;
        border-radius: 1em;
        line-height: 1;
        font-weight: 600;
    }
</style>
