<script>
  import { supabaseClient } from "$lib/supabase";
  import img from "../../assets/google2.png";
  import imgApple from "../../assets/apple.png";
  import { onMount } from "svelte";
  import { enhance } from "$app/forms";

  let email = "";
  let password = "";
</script>

<main>
  <div class="form__container">
    <form class="login-form" action="?/login" method="POST">
      <h1>Sign in</h1>
      <div class="form__item">
        <label for="email">Email</label>
        <input
          class="form__input"
          required
          type="email"
          id="email"
          name="email"
          bind:value={email}
        />
      </div>
      <div class="form__item">
        <label for="password">Password</label>
        <input
          class="form__input"
          required
          type="password"
          id="password"
          name="password"
          bind:value={password}
        />
        <a href="/reset-password" class="forgot">Forgot password?</a>
      </div>
      <button class="submit" type="submit">Sign in</button>
    </form>

    <form class="provider-form" method="POST">
      <button class="provider-btn apple" formaction="?/login&provider=apple"
        ><img src={imgApple} height="40" alt="apple icon" /><span
          >Continue with Apple</span
        ></button
      >
      <button class="provider-btn google" formaction="?/login&provider=google"
        ><img src={img} alt="google icon" /></button
      >
    </form>

    <span class="login__redirect"
      >Don't have an account? <a href="/register">Sign up here</a></span
    >
  </div>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999;
    position: relative;
    .login-form {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 400px;
      gap: 1em;
    }
  }
  .form__container {
    width: 400px;
    height: 500px;
    background-color: #fcfcfc;
    padding: 1em;
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
    letter-spacing: 0.2em;
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
    all: unset;
    cursor: pointer;
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
