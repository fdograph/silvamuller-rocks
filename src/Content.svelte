<script lang="ts">
    import IconLink from "./IconLink.svelte";
</script>

<div class="container">
    <div class="title">
        <h1>Fernando<br/>Silva<br/>Müller</h1>
        <h2>Fullstack developer</h2>
    </div>
    <div class="socials">
        <IconLink type="github" title="Check out my Github!" url="https://github.com/fdograph" />
        <IconLink type="linkedin" title="LinkedIn Profile" url="https://www.linkedin.com/in/fernando-silva-muller" />
        <IconLink type="npm" title="Npm profile" url="https://www.npmjs.com/~fdograph" />
    </div>
</div>

<style>
    .container {
        flex: 1;
        padding: 4vw 6vw;
    }

    h1 {
        font-size: 54px;
        font-weight: 800;
        line-height: 1.2em;
    }

    h2 {
        font-size: 28px;
        font-weight: 400;
    }

    .socials {
        margin-top: 18px;
        background: #ededed;
        padding: .5em 0.75em;
        border-radius: 1em;
        display: inline-flex;
    }

    .socials > :global(a):not(:first-child) {
        margin-left: 1.5em;
    }
</style>
