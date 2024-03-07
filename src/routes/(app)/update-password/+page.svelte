<script>
  import { goto } from "$app/navigation";
  import { supabaseClient } from "$lib/supabase";
  import { enhance } from "$app/forms";

  let password = "";
  let repeatPassword = "";
  let updateSuccess = false;
  let loading = false;

  $: istheSame = (pw) => {
    if (pw.length === 0 && repeatPassword.length === 0) return false;

    return pw === repeatPassword;
  };
</script>

<svelte:head>
  <title>Dayforge | Update password</title>
</svelte:head>

<main>
  <div class="form__container">
    {#if loading}
      <span class="loader"></span>
    {/if}
    {#if !updateSuccess}
      <form
        class="form"
        action="?/update"
        method="POST"
        use:enhance={() => {
          loading = true;
          return async ({ update, result }) => {
            if (result.type === "success") {
              updateSuccess = true;
              loading = false;
            }
            update();
          };
        }}
      >
        <h1>Update password</h1>
        <div class="form__item">
          <label for="password">New password</label>
          <input
            class="form__input"
            required
            minlength="6"
            type="password"
            id="password"
            name="password"
            bind:value={password}
          />
        </div>
        <div class="form__item">
          <label for="password_repeat">Repeat password</label>
          <input
            class="form__input"
            required
            minlength="6"
            type="password"
            id="password_repeat"
            name="password_repeat"
            bind:value={repeatPassword}
          />
        </div>
        <button
          disabled={!istheSame(password) || loading}
          class="submit"
          type="submit">Update password</button
        >
      </form>
    {:else}
      <h1>Success</h1>
      <p>Password have been changed.</p>
      <button class="submit" on:click={() => goto("/generate")}>
        Return to website</button
      >
    {/if}
  </div>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 500;
    position: relative;
    .form {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 400px;
      gap: 1em;
    }
  }
  .form__container {
    width: 400px;
    height: auto;
    background-color: #fcfcfc;
    padding: 1em;
    padding-bottom: 1.4em;
    display: flex;
    flex-direction: column;
    border-radius: var(--border-radius);
    box-shadow: var(--primary-shadow);
    border: var(--primary-border);
    position: relative;
    overflow: hidden;
  }
  .loader {
    height: 5px;
    width: 50%;
    top: 0;
    left: -40%;
    border-radius: 3px;
    position: absolute;
    background-color: var(--primary-color);
    animation: lineAnim 2s linear infinite;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  .form__item {
    display: flex;
    flex-direction: column;
  }
  .form__input {
    box-sizing: border-box;
    border: 1px solid;
    border-radius: 0px;
    border-color: lightgrey;
    background: #ffffff;
    height: 45px;
    padding: 5px;
    transition: border-color ease-in 150ms;
    border-radius: var(--border-radius);
    border: var(--primary-border);
    font-size: 14px;
  }
  label {
    font-weight: 600;
    align-self: start;
    margin-bottom: 0.2em;
  }
  input:focus {
    border: 1px solid rgba(0, 0, 0, 0.5);
    outline: transparent;
  }
  .submit {
    all: unset;
    width: 100%;
    color: var(--primary-button-text, black);
    background-color: var(--primary-button, #f7ca50);
    height: 45px;
    border-radius: var(--border-radius);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    min-height: 45px;
    border: var(--primary-border);
    box-shadow: var(--primary-shadow);
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
    &:disabled {
      background-color: var(--primary-button, #f7ca50);
      opacity: 0.3;
      cursor: not-allowed;
    }
    &:active:not(:disabled) {
      scale: 1.02;
    }
  }

  @keyframes lineAnim {
    0% {
      left: -20%;
    }
    50% {
      left: 20%;
      width: 80%;
    }
    100% {
      left: 100%;
      width: 100%;
    }
  }
</style>
