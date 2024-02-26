<script>
  import { supabaseClient } from "$lib/supabase";
  import { onMount } from "svelte";
  import { enhance } from "$app/forms";

  let password = "";
  let repeatPassword = "";
  $: istheSame = (pw) => {
    if (pw.length === 0 && repeatPassword.length === 0) return false;

    return pw === repeatPassword;
  };

  onMount(() => {
    const { data } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          console.log(session, event, data);
        }

        data.subscription.unsubscribe();
      }
    );
  });
</script>

<svelte:head>
  <title>Dayforge | Update password</title>
</svelte:head>

<main>
  <div class="form__container">
    <form class="form" action="?/update" method="POST" use:enhance>
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
      <button disabled={!istheSame(password)} class="submit" type="submit"
        >Update password</button
      >
    </form>
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
  }
  h1 {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  .form__item {
    display: flex;
    flex-direction: column;

    a {
      text-decoration: none;
      margin-top: 0.2em;
      color: rgba(22, 22, 22, 0.699);
    }
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
  .login__redirect {
    text-align: center;
    margin-top: 1em;
    a {
      opacity: 1;
      color: rgb(22, 22, 22);
      font-weight: 600;
    }
  }
  .forgot {
    font-size: 14px;
  }
  .provider-form {
    display: grid;
    gap: 0.5em;
    margin-top: 1em;
    margin-inline: auto;
  }
  .provider-btn {
    all: unset;
    cursor: pointer;
    &.apple {
      display: flex;
      border: 1px solid grey;
      border-radius: 4px;
      padding-right: 0.3em;

      span {
        align-self: center;
        font-size: 0.8rem;
        font-weight: 600;
        color: #1f1f1fe3;
      }
    }
  }
</style>
