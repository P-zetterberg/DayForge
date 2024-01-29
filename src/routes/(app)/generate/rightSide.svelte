<script>
  import { clickToCopy } from "$lib/clickToCopy.js";
  import { onMount } from "svelte";
  import { dayString } from "./teststring";
  import { generatedText } from "$lib/stores/generateStore.js";

  let sticking;
  let watcher;
  let topMenu;

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      sticking = !entries[0].isIntersecting;
    });
    observer.observe(watcher);
  });
</script>

<div class="right-side">
  <div bind:this={topMenu} class="top-menu" class:sticking>
    <button class="copy" use:clickToCopy={".generated__text"}>Copy</button>
  </div>
  <div bind:this={watcher} data-scroll-watcher />
  <div class="generated__text" id="certificate">
    <!-- {@html dayString} -->
    {#each $generatedText as text}
      {text}
    {/each}
  </div>
</div>

<style lang="scss">
  .right-side {
    overflow-x: auto;
    scroll-behavior: smooth;
  }
  .generated__text {
    margin-top: 2em;
    text-wrap: pretty;
    max-width: 50ch;
    margin-inline: auto;
    padding-inline: 1em;
  }
  .top-menu {
    height: 50px;
    background-color: #fcfcfc;
    position: sticky;
    top: 0;
    transition: box-shadow 150ms ease-in;
    &.sticking {
      box-shadow: -1px 7px 5px -6px rgba(0, 0, 0, 0.24);
      -webkit-box-shadow: -1px 7px 5px -6px rgba(0, 0, 0, 0.24);
    }
    .copy {
      margin-left: 1em;
    }
  }
</style>
