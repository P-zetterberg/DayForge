<script>
  import { getCountryDataList } from "countries-list";
  import { generatedText, isLoading } from "$lib/stores/generateStore.js";
  import { times24Hour, times12Hour } from "$lib/clockFormats.js";
  import { SSE } from "sse.js";
  import { DateInput } from "date-picker-svelte";
  import { tooltip } from "$lib/useTooltip.js";

  let timeFormat = "24";
  const formData = {
    groupSize: 1,
    includeFood: "yes",
    dayStart: timeFormat === "24" ? "08:00" : "08:00 AM",
    dayEnd: timeFormat === "24" ? "20:00" : "08:00 PM",
    budget: 0,
    date: new Date(),
    terms: false,
  };
  $: selectedTime = timeFormat === "24" ? times24Hour : times12Hour;

  const handleSubmit = async () => {
    $isLoading = true;
    $generatedText = [];
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: formData,
        }),
      });
      let parsed = await res.json();
      $generatedText = parsed.message.content;
      $isLoading = false;
    } catch (error) {
      console.log(error); //TODO kolla vid throw & flytta detta till +page.server.js
      //TODO error alert toast
      console.log("Something went wrong! L-side");
    }
  };
  function handleTimeFormat(format) {
    timeFormat = format;
  }
</script>

<div class="left-side">
  <h2>Settings</h2>
  <label for="rad-container">Clock format</label>
  <div class="rad-container">
    <button
      disabled={$isLoading}
      class="rad-button"
      class:active={timeFormat === "12"}
      on:click={() => handleTimeFormat("12")}
    >
      12H
    </button>
    <button
      disabled={$isLoading}
      class="rad-button"
      class:active={timeFormat === "24"}
      on:click={() => handleTimeFormat("24")}
    >
      24H
    </button>
  </div>
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
        disabled={$isLoading}
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
        disabled={$isLoading}
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
        disabled={$isLoading}
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
        disabled={$isLoading}
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
        disabled={$isLoading}
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
        disabled={$isLoading}
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
    <!-- <div class="input-container left">
      <label
        for="budget"
        use:tooltip
        title="The estimated amount each person in the group can spend for the day."
        >Budget ({formData?.country?.currency})</label
      >
      <input
        min="0"
        type="number"
        name="budget"
        class="input"
        bind:value={formData.budget}
      />
    </div> -->
    <div class="input-container">
      <label
        for="group"
        title="Amount of people to try and generate activities for."
        use:tooltip>Group size</label
      >
      <input
        disabled={$isLoading}
        bind:value={formData.groupSize}
        min="1"
        max="5"
        type="number"
        name="group"
        class="input"
      />
    </div>
    <!-- <div class="input-container">
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
    </div> -->
    <div class="input-container">
      <label
        for="include"
        use:tooltip
        title="Add places etc that you want the AI to try and include. Seperate with a comma for best effect."
        >Include</label
      >
      <textarea
        disabled={$isLoading}
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
        title="Add places etc that you want the AI to try and exclude. Seperate with a comma for best effect."
        >Exclude</label
      >
      <textarea
        disabled={$isLoading}
        spellcheck="false"
        name="exclude"
        id=""
        class="input"
        maxlength="300"
        bind:value={formData.excludes}
      ></textarea>
    </div>
    <div style="grid-column: 1/3">
      <input
        disabled={$isLoading}
        required
        class="checkbox"
        type="checkbox"
        bind:checked={formData.terms}
        id="terms"
      />
      <label for="terms">I agree to the terms of service.</label>
    </div>
    <input
      type="submit"
      value="Generate"
      class="submit-btn"
      disabled={$isLoading}
    />
  </form>
</div>

<style lang="scss">
  :root {
    --date-input-width: 100%;
  }
  h2 {
    margin-bottom: 0.5em;
  }
  .rad-container {
    display: flex;
    gap: 0.25em;
    margin-bottom: 0.5em;
    .rad-button {
      padding: 0.25em 0.5em;
      border: 2px solid lightgrey;
      border-radius: calc(var(--border-radius) / 2);
      background-color: #ffffff;
      cursor: pointer;
      &.active {
        border: 2px solid black;
      }
      &[disabled] {
        opacity: 0.5;
      }
    }
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
      &[disabled] {
        opacity: 0.5;
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
    gap: 0.45em;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    padding-bottom: 0.5em;
  }
  textarea {
    resize: vertical;
    min-height: 73px;
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
    &:hover:enabled {
      top: 4px;
      left: 4px;
      box-shadow: 1px 1px 0 #000;
      transition-property: box-shadow, top, left;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
    }
    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  h2 {
    margin-top: 0;
  }
  input[type="checkbox"] {
    accent-color: var(--primary-color);
  }
  @media print {
    .left-side {
      display: none;
    }
  }
</style>
