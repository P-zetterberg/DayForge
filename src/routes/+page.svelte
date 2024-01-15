<script>
  export let data;
</script>

<main>
  {#if data.session}
    <h1>Welcome logged in</h1>
  {:else}
    <h1>Welcome to DayForge AI</h1>
  {/if}
</main>

<style>
</style>
