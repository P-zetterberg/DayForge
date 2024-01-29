<script>
  let days = [
    { title: "Japan, Tokyo - Akihabara", created: "2024-02-12" },
    { title: "Sweden, Västerås - Bäckby", created: "2024-02-12" },
    { title: "Japan, Tokyo - Akihabara", created: "2024-02-12" },
    { title: "Japan, Tokyo - Akihabara", created: "2024-02-12" },
    { title: "Japan, Tokyo - Akihabara", created: "2024-02-12" },
    { title: "Japan, Tokyo - Akihabara", created: "2024-02-12" },
    { title: "Japan, Tokyo - Akihabara", created: "2024-02-12" },
    { title: "Japan, Tokyo - Akihabara", created: "2024-02-12" },
    { title: "Japan, Tokyo - Akihabara", created: "2024-02-12" },
  ];

  //   function randomShadowColor(index) {
  //     let number = index % 3;
  //     let color = "";
  //     switch (number) {
  //       case 0:
  //         color = "green";
  //         break;
  //       case 1:
  //         color = "purple";
  //         break;
  //       case 2:
  //         color = "yellow";
  //         break;
  //       default:
  //         break;
  //     }
  //     return color;
  //   }
</script>

<main>
  <div class="days-container">
    {#each days as day}
      <div class="day">
        <h3 class="title">{day.title}</h3>
        <p class="date">created: {day.created}</p>
      </div>
    {/each}
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
  .days-container {
    display: grid;
    gap: 1em;
  }
  .day {
    display: grid;
    grid-template-columns: 1fr auto;
    background: #f2f2f2;
    border: 2px solid black;
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
</style>
