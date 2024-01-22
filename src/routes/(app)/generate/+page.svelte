<script>
  import { getCountryCode, getCountryDataList } from "countries-list";
  import { dayString } from "./teststring";
  import { clickToCopy } from "$lib/clickToCopy.js";

  let selectedCountry;
  //console.log(countries[getCountryCode("Sweden")]);
</script>

<main>
  <div class="left-side">
    <h2>Settings</h2>

    <form class="form-container" action="">
      <div class="input-container">
        <label for="date">Date</label>
        <input required type="date" name="date" class="input" />
      </div>
      <div class="input-container left">
        <label for="country">Country</label>
        <select
          required
          bind:value={selectedCountry}
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
      <div class="input-container right">
        <label for="city">City</label>
        <input required type="text" name="city" class="input" />
      </div>
      <div class="input-container left">
        <label for="start">Day start</label>
        <select required name="start" id="" class="input"></select>
      </div>
      <div class="input-container right">
        <label for="end">Day end</label>
        <select required name="end" id="" class="input"></select>
      </div>
      <div class="input-container left">
        <label for="budget">Budget ({selectedCountry?.currency})</label>
        <input value="0" min="0" type="number" name="budget" class="input" />
      </div>
      <div class="input-container right">
        <label for="group">Group size</label>
        <input
          value="1"
          min="1"
          max="5"
          type="number"
          name="group"
          class="input"
        />
      </div>
      <div class="input-container">
        <label for="dayType">Include places to eat?</label>
        <div>
          <div>
            <label for="yes">Yes</label>
            <input type="radio" checked id="yes" name="dayType" class="input" />

            <label for="no">No</label>
            <input type="radio" id="no" name="dayType" class="input" />
          </div>
        </div>
      </div>
      <div class="input-container">
        <label for="include">Include</label>
        <textarea name="include" id="" class="input"></textarea>
      </div>
      <div class="input-container">
        <label for="exclude">Exclude</label>
        <textarea name="exclude" id="" class="input"></textarea>
      </div>
      <input type="submit" value="Generate" class="submit-btn" />
    </form>
  </div>
  <div class="right-side">
    <button use:clickToCopy={".generated__text"}>Copy</button>
    <div class="generated__text" id="certificate">
      {@html dayString}
    </div>
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
    grid-template-columns: 400px 1fr;
    gap: 1em;
    margin-top: 2.5em;
    margin-bottom: 2.5em;
    box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    -webkit-box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    border: 2px solid black;
    max-height: 750px;
  }
  h2 {
    margin-top: 0;
  }
  .left-side {
    border-right: 1px solid lightgrey;
    padding-right: 1em;
    overflow-x: auto;
  }
  .right-side {
    overflow-x: auto;
    scroll-behavior: smooth;
  }
  .generated__text {
    margin-top: 2em;
    text-wrap: pretty;
    max-width: 50ch;
    margin-inline: auto;
    padding-right: 1em;
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
    gap: 1em;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
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
  /* .generated__text :global(h2) {
   
  } */
</style>
