<script>
  import { clickToCopy } from "$lib/clickToCopy.js";
  import { onMount } from "svelte";
  import { dayString, safeStringGenerator } from "./../teststring.js";
  import { generatedText, isLoading } from "$lib/stores/generateStore.js";
  import Loading from "$lib/loading.svelte";

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
  <div bind:this={watcher} data-scroll-watcher />
  {#if $generatedText.length && !$isLoading}
    <div bind:this={topMenu} class="top-menu" class:sticking>
      <button class="copy" use:clickToCopy={".generated__text"}>Copy</button>
    </div>
  {/if}
  <div class="generated__text" id="certificate">
    <!-- {@html safeStringGenerator(dayString)} -->
    {#each $generatedText as text}
      {text}
    {/each}

    {#if $isLoading}
      <div class="loader-wrapper">
        <Loading />
        <h4>Generating, please wait</h4>
      </div>
    {:else}
      <div class="help-text-container">
        <div class="disclaimer">
          The generated day should be used as a baseline and the information
          should always be double checked!
        </div>
        <h3 class="">How to use</h3>
        <ol>
          <li>
            Fill out the form to the left. The more information the better the
            results will be.
          </li>

          <li>
            Accept our terms and press generate. Wait for the generation to
            complete & enjoy your generated day!
          </li>
        </ol>
        <span><b>Tip: </b>Hover over any label to get a helpful tooltip.</span>
      </div>
    {/if}
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
    height: auto;
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
  .loader-wrapper {
    display: grid;
    justify-items: center;
  }
  .disclaimer {
    background-color: rgba(255, 152, 35, 0.301);
    border: 2px solid rgb(255, 172, 18);
    border-radius: calc(var(--border-radius) / 2);
    padding: 0.2em;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 3em;
  }
  .help-text-container {
    display: grid;
    justify-content: center;
    span {
      text-decoration: underline;
    }
  }
</style>
