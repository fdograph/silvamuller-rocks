<script lang="ts">
    import DarkLines from './backgrounds/dark-lines.svelte';
    import Yellow from './backgrounds/yellow.svelte';
    import Content from "./content.svelte";

    type ThemeName = 'dark-lines' | 'yellow';
    const themes: ThemeName[] = ['dark-lines', 'yellow'];

    let currentTheme: ThemeName = 'dark-lines';

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
        {:else}
            <Yellow />
        {/if}
    </div>

    <Content />

    <button on:click={flipTheme} title="Click me to change the theme">Click me :)</button>
</main>

<style>
    :root {
        --bg-color: hsl(0deg, 0%, 5%);
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
