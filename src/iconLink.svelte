<script lang="ts">
    import Github from './icons/github.svelte';
    import Linkedin from './icons/linkedIn.svelte';
    import Npm from './icons/npm.svelte';

    export let type: 'github' | 'linkedin' | 'npm';
    export let linkUrl: string;
    export let title: string;
</script>

<a href="{linkUrl}" title="{title}" target="_blank">
    <span>
        {#if type === 'github'}
            <Github />
        {:else if type === 'linkedin'}
            <Linkedin />
        {:else if type === 'npm'}
            <Npm />
        {/if}
    </span>
</a>

<style>
    a {
        display: inline-flex;
    }

    a:hover span > :global(svg)  {
        fill: hsl(255deg, 100%, 50%);
        transform: scale(1.2);
    }

    span {
        --icon-size: 28px;
        display: inline-flex;
        width: var(--icon-size);
        height: var(--icon-size);
    }

    span > :global(svg) {
        display: inline-flex;
        flex: 1;
        width: 100%;
        height: 100%;
        fill: hsl(0deg, 0%, 5%);
        transform: scale(1);
        transition: all 200ms ease;
    }
</style>
