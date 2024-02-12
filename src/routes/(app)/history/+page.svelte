<script>
  import { goto } from "$app/navigation";

  export let data;
  let days = data.generations;
  let searchValue = "";
  $: filteredList = days.filter(
    (day) => day.id.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
  );
  function dateFormatter(dateString) {
    const date = new Date(dateString);

    return date.toLocaleString();
  }
</script>

<main>
  <div class="days-container">
    <input
      class="search"
      placeholder="Search"
      type="text"
      on:input={(e) => (searchValue = e.target.value)}
    />
    <div class="days-grid">
      <span class="grid-title">Title</span>
      <span class="grid-title">Created</span>
      {#each filteredList as day}
        <a href={`/history/${day.id}`} class="day">
          <h3 class="title">{day.id}</h3>
          <p class="date">{dateFormatter(day.created_at)}</p>
        </a>
      {/each}
    </div>
  </div>
</main>

<style lang="scss">
  main {
    min-width: 300px;
    height: 50px;
    background: #fcfcfc;
    box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    -webkit-box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    border: 2px solid black;
    border-radius: var(--border-radius);
    max-height: 800px;
    margin-top: 2.5em;
    margin-bottom: 2.5em;
    padding: 1em;
    z-index: 999;
    overflow: auto;
  }
  .days-grid {
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr 1fr;
  }
  .grid-title {
    font-weight: 600;
    font-size: 1.2rem;
    &:nth-child(2) {
      justify-self: end;
    }
  }
  .day {
    grid-column: 1/3;
    display: grid;
    grid-template-columns: 1fr auto;
    background: #d7d7d7;
    border: 2px solid black;
    color: black;
    text-decoration: none;
    border-radius: var(--border-radius);
    text-wrap: balance;
    padding: 0.5em;
    gap: 1em;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 1);
    -webkit-box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 1);
  }
  .date {
    font-weight: 600;
    align-self: center;
  }
  h3,
  p {
    margin: 0;
  }
  .search {
    border: 2px solid black;
    height: 3em;
    width: 100%;
    border-radius: calc(var(--border-radius) / 2);
    margin-bottom: 1em;
    font-weight: 600;
    padding-left: 0.5em;
    &::placeholder {
      font-weight: 600;
    }
    &:focus {
      outline: none;
    }
  }
</style>
