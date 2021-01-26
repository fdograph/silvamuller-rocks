<script lang="ts">
  import Github from './icons/github.svelte';
  import Linkedin from './icons/linkedIn.svelte';
  import Npm from './icons/npm.svelte';

  export let type: 'github' | 'linkedin' | 'npm';
  export let linkUrl: string;
  export let title: string;
</script>

<style>
  a {
    display: inline-flex;
    margin: 0 5px;
  }

  a:first-child {
    margin-left: 0;
  }

  a:last-child {
    margin-right: 0;
  }

  span {
    --icon-size: 40px;
    display: inline-flex;
    width: var(--icon-size);
    height: var(--icon-size);
    background: var(--fg-color);
    padding: 5px;
    border-radius: 100em;
    transition: all 250ms ease;
  }

  a:hover span {
    background: var(--bg-color);
  }

  span > :global(.icon) {
    display: inline-flex;
    flex: 1;
    width: 100%;
    height: 100%;
    fill: var(--bg-color);
    transform: scale(1);
    transition: all 250ms ease;
  }

  a:hover span > :global(.icon) {
    transform: scale(0.8);
    fill: var(--fg-color);
  }
</style>

<a href={linkUrl} {title} target="_blank">
  <span>
    {#if type === 'github'}
      <Github className="icon" />
    {:else if type === 'linkedin'}
      <Linkedin className="icon" />
    {:else if type === 'npm'}
      <Npm className="icon" />
    {/if}
  </span>
</a>
