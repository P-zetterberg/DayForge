<script>
  import LeftSide from "./_components/leftSide.svelte";
  import RightSide from "./_components/rightSide.svelte";
</script>

<svelte:head>
  <title>Dayforge | Generate</title>
</svelte:head>

<main>
  <LeftSide />
  <RightSide />
</main>

<style lang="scss">
  main {
    box-shadow:
      0 2px 10px 0 rgba(0, 0, 0, 0.1),
      0 2px 5px 0 rgba(0, 0, 0, 0.2);
    background-color: #fcfcfc;
    z-index: 900;
    border-radius: var(--border-radius);
    padding-block: 1em;
    display: grid;
    grid-template-columns: 400px 1fr;
    /* gap: 1em; */
    margin-top: 2.5em;
    margin-bottom: 2.5em;
    box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    -webkit-box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    border: 2px solid black;
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
  }
</style>
