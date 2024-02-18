<script>
  export let data;
  let days = data.generations.map((day) => ({
    ...day,
    searchTerms: `${day.metadata.country.name} ${day.metadata.city} ${
      day.metadata.area
    } ${day.metadata.date} ${day.created_at} ${dateFormatter(
      day.metadata.date,
      false
    )}`,
  }));
  let searchValue = "";
  $: filteredDays = days.filter((day) =>
    day.searchTerms.toLowerCase().includes(searchValue.toLowerCase())
  );
  function dateFormatter(dateString, includeTime = true) {
    let date;
    switch (includeTime) {
      case true:
        date = new Date(dateString);
        break;
      case false:
        date = new Date(dateString).toDateString();
        break;
    }
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
      <span class="grid-title">Country</span>
      <span class="grid-title">City</span>
      <span class="grid-title">Area</span>
      <span class="grid-title visit-date">Planned for</span>
      <span class="grid-title">Created</span>
      {#each filteredDays as day}
        <a href={`/history/${day.id}`} class="day">
          <h3 class="title">{day.metadata.country.name}</h3>
          <p class="city">{day.metadata.city}</p>
          <p class="area">{day.metadata.area}</p>
          <p class="visit">
            {dateFormatter(day.metadata.date, false)}
          </p>
          <p class="date">
            {dateFormatter(day.created_at)}
          </p>
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
    padding-inline: 5em;
    z-index: 999;
    overflow: auto;
  }
  .days-grid {
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  .grid-title {
    font-weight: 600;
    font-size: 1.2rem;
    &:nth-child(5) {
      justify-self: end;
    }
    &.visit-date {
      justify-self: start;
    }
  }
  .day {
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
    p {
      font-weight: 600;
      align-self: center;
    }
  }
  .date {
    justify-self: end;
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
