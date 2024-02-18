<script>
  import { json } from "@sveltejs/kit";
  import { dayString, safeStringGenerator } from "../../generate/teststring";
  export let data;
</script>

<main>
  <div class="content">
    <!-- {data.day.id} -->
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
    padding: 1em;
    padding-right: 0em;
    display: grid;
    grid-template-columns: 1fr;
    /* gap: 1em; */
    margin-top: 2.5em;
    margin-bottom: 2.5em;
    box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    -webkit-box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    border: 2px solid black;
    max-height: 800px;
    overflow: auto;
  }
  .content {
    padding-inline: 7em;
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
  /* h2 {
      break-inside: always;
    } */
</style>
