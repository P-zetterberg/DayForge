<script>
  import { getCountryDataList } from "countries-list";
  import { generatedText, isLoading } from "$lib/stores/generateStore.js";
  import { times24Hour, times12Hour } from "$lib/clockFormats.js";
  import { SSE } from "sse.js";
  import { DateInput } from "date-picker-svelte";
  import { tooltip } from "$lib/useTooltip.js";

  const formData = {
    groupSize: 1,
    includeFood: "yes",
    dayStart: timeFormat === "24" ? "08:00" : "08:00 AM",
    dayEnd: timeFormat === "24" ? "20:00" : "08:00 PM",
    budget: 0,
    date: new Date(),
  };
  const timeFormat = "24";
  const selectedTime = timeFormat === "24" ? times24Hour : times12Hour;

  const handleSubmit = async () => {
    $isLoading = true;
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "user",
          content: "Hello, what is 1+1",
        }),
      });
      let parsed = await res.json();
      $generatedText = parsed.message.content;
      $isLoading = false;
    } catch (error) {}
  };
</script>

<div class="left-side">
  <h2>Settings</h2>
  <form
    class="form-container"
    method="POST"
    on:submit|preventDefault={() => handleSubmit()}
  >
    <div class="input-container">
      <label
        for="date"
        id="date"
        use:tooltip
        title="The date you want the day to be generated for.">Date</label
      >
      <DateInput
        format="yyyy-MM-dd"
        class="input"
        min={new Date()}
        required
        bind:value={formData.date}
      />
    </div>
    <div class="input-container">
      <label
        for="country"
        id="country"
        use:tooltip
        title="The country you are visiting.">Country</label
      >
      <select
        bind:value={formData.country}
        required
        name="country"
        id=""
        class="input"
      >
        {#each getCountryDataList() as country, i}
          {#if i === 0}
            <option selected value={country}>{country.name}</option>
          {/if}
          <option value={country}>{country.name}</option>
        {/each}
      </select>
    </div>

    <div class="input-container left">
      <label
        for="city"
        use:tooltip
        title="The city you want the generated day to take place in"
        >City*</label
      >
      <input
        required
        type="text"
        name="city"
        class="input"
        bind:value={formData.city}
      />
    </div>
    <div class="input-container right">
      <label
        for="area"
        use:tooltip
        title="The area you want the generated day to roughly be based around."
        >Area*</label
      >
      <input
        required
        type="text"
        name="area"
        class="input"
        bind:value={formData.area}
      />
    </div>
    <div class="input-container left">
      <label
        for="start"
        use:tooltip
        title="The time you want the generated day to roughly start."
        >Day start</label
      >
      <select
        name="start"
        class="input"
        on:change={(e) => (formData.dayStart = e.target.value)}
      >
        {#each selectedTime as time}
          <option selected={time === formData?.dayStart} value={time}
            >{time}</option
          >
        {/each}
      </select>
    </div>
    <div class="input-container right">
      <label
        for="end"
        use:tooltip
        title="The time you want the generated day to roughly end."
        >Day end</label
      >
      <select
        name="end"
        class="input"
        on:change={(e) => (formData.dayEnd = e.target.value)}
      >
        {#each selectedTime as time}
          <option selected={time === formData?.dayEnd} value={time}
            >{time}</option
          >
        {/each}
      </select>
    </div>
    <div class="input-container left">
      <label
        for="budget"
        use:tooltip
        title="The estimated amount each person in the party can spend for the day."
        >Budget ({formData?.country?.currency})</label
      >
      <input
        min="0"
        type="number"
        name="budget"
        class="input"
        bind:value={formData.budget}
      />
    </div>
    <div class="input-container right">
      <label
        for="group"
        title="Amount of people to try and generate activities for."
        use:tooltip>Group size</label
      >
      <input
        bind:value={formData.groupSize}
        min="1"
        max="5"
        type="number"
        name="group"
        class="input"
      />
    </div>
    <div class="input-container">
      <label
        for="dayType"
        title="The AI will recommend place to eat or just plan breaks and you can decide where for yourselves."
        use:tooltip
        >Include places to eat?
      </label>
      <div>
        <div>
          <label for="yes">Yes</label>
          <input
            type="radio"
            checked={formData.includeFood === "yes"}
            id="yes"
            name="dayType"
            class="input"
            on:change={(e) => (formData.includeFood = e.target.value)}
          />

          <label for="no">No</label>
          <input
            type="radio"
            checked={formData.includeFood === "no"}
            id="no"
            name="dayType"
            class="input"
            on:change={(e) => (formData.includeFood = e.target.value)}
          />
        </div>
      </div>
    </div>
    <div class="input-container">
      <label
        for="include"
        use:tooltip
        title="Add places, restaurants etc that you want the AI to try and include. Seperate with a comma for best effect."
        >Include</label
      >
      <textarea
        spellcheck="false"
        name="include"
        id=""
        class="input"
        maxlength="300"
        bind:value={formData.includes}
      ></textarea>
    </div>
    <div class="input-container">
      <label
        for="exclude"
        use:tooltip
        title="Add places, restaurants etc that you want the AI to try and exclude. Seperate with a comma for best effect."
        >Exclude</label
      >
      <textarea
        spellcheck="false"
        name="exclude"
        id=""
        class="input"
        maxlength="300"
        bind:value={formData.excludes}
      ></textarea>
    </div>
    <input type="submit" value="Generate" class="submit-btn" />
  </form>
</div>

<style lang="scss">
  :root {
    --date-input-width: 100%;
  }
  .left-side {
    border-right: 1px solid lightgrey;
    padding-inline: 1em;
    overflow-x: auto;
    border-right: 2px solid black;
    border-radius: 10px;
  }
  label {
    width: fit-content;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    grid-column: 1/3;

    .input {
      border-radius: calc(var(--border-radius) / 2);
      border: 2px solid #000;
      background-color: #ffffff;
      padding-left: 0.3em;
      transition: border 200ms ease-in-out;

      &[type="number"] {
        padding-right: 0.2em;
      }
      &:focus {
        outline: none;
        box-shadow: 0 0 0 0.125em rgba(72, 95, 199, 0.466);
      }
    }
    &.right {
      grid-column: 2/3;
    }
    &.left {
      grid-column: 1/2;
    }
  }
  .input:not([type="textarea"]) {
    padding-top: 0.25em;
    padding-bottom: 0.25em;
  }
  .form-container {
    display: grid;
    gap: 0.75em;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    padding-bottom: 0.5em;
  }
  textarea {
    resize: vertical;
    min-height: 73px;
  }
  input[type="radio"] {
    accent-color: #232323;
  }
  .submit-btn {
    background-color: var(--primary-color);
    grid-column: 1/3;
    border-radius: calc(var(--border-radius) / 2);
    padding: 0.5em 1em;
    color: black;
    font-weight: 600;
    box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    -webkit-box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    border: 2px solid black;
    text-align: center;
    font-size: 1rem;
    cursor: pointer;
    transition-property: box-shadow, top, left;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
    position: relative;
    top: 0;
    left: 0;
    &:hover {
      top: 4px;
      left: 4px;
      box-shadow: 1px 1px 0 #000;
      transition-property: box-shadow, top, left;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
    }
  }
  h2 {
    margin-top: 0;
  }
</style>
