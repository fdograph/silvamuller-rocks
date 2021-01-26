<script lang="ts">
  import IconLink from './iconLink.svelte';
</script>

<style>
  @keyframes appear {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .container {
    flex: 1;
    z-index: 10;
    transform: translateZ(0);
  }

  h1,
  h2,
  .socials {
    animation-name: appear;
    animation-duration: 500ms;
    animation-timing-function: ease;
    animation-direction: normal;
    animation-fill-mode: both;
    opacity: 0;
    transform: translateY(80px);
  }

  h1 {
    font-size: 54px;
    font-weight: 800;
    line-height: 1.2em;
    animation-delay: 300ms;
  }

  h2 {
    font-size: 28px;
    font-weight: 400;
    animation-delay: 500ms;
  }

  .socials {
    margin-top: 18px;
    background: var(--fg-color);
    padding: 0.5em 0.75em;
    border-radius: 1em;
    display: inline-flex;
    animation-delay: 700ms;
  }
</style>

<div class="container">
  <div class="title">
    <h1>Fernando<br />Silva<br />Müller</h1>
    <h2>Fullstack developer</h2>
  </div>
  <div class="socials">
    <IconLink
      type="github"
      title="Check out my Github!"
      linkUrl="https://github.com/fdograph" />
    <IconLink
      type="linkedin"
      title="LinkedIn Profile"
      linkUrl="https://www.linkedin.com/in/fernando-silva-muller" />
    <IconLink
      type="npm"
      title="Npm profile"
      linkUrl="https://www.npmjs.com/~fdograph" />
  </div>
</div>
