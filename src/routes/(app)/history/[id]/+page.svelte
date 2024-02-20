<script>
  import Clipboard from "clipboard";
  import { safeStringGenerator } from "../../generate/teststring";
  import { onMount } from "svelte";
  import Arrow from "../../../../assets/back_arrow.svg?raw";
  import { goto } from "$app/navigation";

  export let data;
  let topMenu;
  let sticking;
  let watcher;

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      sticking = !entries[0].isIntersecting;
    });
    observer.observe(watcher);
    let clipboard = new Clipboard(".copy");
    clipboard.on("success", function (e) {
      e.clearSelection();
    });
    console.log(data);
  });
</script>

<main>
  <div bind:this={watcher} data-scroll-watcher />
  <div bind:this={topMenu} class="top-menu" class:sticking>
    <button class="back" on:click={() => goto("/history")}
      >{@html Arrow} Back</button
    >
    <button class="copy" data-clipboard-target=".content">Copy</button>
    <button class="save" on:click={() => window.print()}>Save</button>
  </div>
  <div class="content">
    <span class="date">{new Date(data.day.metadata.date).toDateString()}</span>
    <h2>
      {data.day.metadata.country.name} - {data.day.metadata.city} - {data.day
        .metadata.area}
    </h2>
    {@html safeStringGenerator(data.day.generated_text.message.content)}
  </div>
</main>

<style lang="scss">
  main {
    box-shadow:
      0 2px 10px 0 rgba(0, 0, 0, 0.1),
      0 2px 5px 0 rgba(0, 0, 0, 0.2);
    background-color: #fcfcfc;
    z-index: 900;
    border-radius: var(--border-radius);
    display: grid;
    grid-template-columns: 1fr;
    /* gap: 1em; */
    margin-top: 2.5em;
    margin-bottom: 2.5em;
    box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    -webkit-box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    border: 2px solid black;
    overflow: auto;
  }
  h2 {
    margin-top: 0;
    margin-bottom: 3em;
  }
  .content {
    margin-top: 3em;
    padding-inline: 12em;
  }
  .top-menu {
    padding: 1em;
    height: 75px;
    background-color: #fcfcfc;
    position: sticky;
    display: flex;
    gap: 0.5em;
    padding-inline: 12em;
    justify-content: flex-start;
    align-items: center;
    top: 0;
    transition: box-shadow 150ms ease-in;
    &.sticking {
      box-shadow: -1px 7px 5px -6px rgba(0, 0, 0, 0.24);
      -webkit-box-shadow: -1px 7px 5px -6px rgba(0, 0, 0, 0.24);
    }
    .copy,
    .save {
      all: unset;
      padding-inline: 0.5em;
      padding-block: 0.25em;
      border: 2px solid lightgrey;
      border-radius: calc(var(--border-radius) / 2);
      height: 25px;
      cursor: pointer;
      transition: border-color 150ms ease-in;
      &:hover {
        border-color: black;
      }
    }
  }
  .back {
    all: unset;
    cursor: pointer;
    display: flex;
    height: min-content;
    position: absolute;
    left: 1em;
    top: 1em;
  }
  @media print {
    main {
      box-shadow: none;
      border: none;
      overflow: visible;
      margin: 0;
      padding: 0;
      display: block;
    }
    .top-menu {
      display: none;
    }
    .content {
      padding: 0;
      margin: 0;
      margin-top: 1em;
    }
  }
  /* h2 {
      break-inside: always;
    } */
</style>
