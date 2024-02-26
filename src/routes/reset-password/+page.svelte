<script>
  import { enhance } from "$app/forms";

  let email = "";
</script>

<main>
  <div class="form__container">
    <form class="form" action="?/reset_password" method="POST" use:enhance>
      <h1>Reset password</h1>
      <div class="form__item">
        <label for="password">Email</label>
        <input
          class="form__input"
          required
          type="Email"
          id="Email"
          name="Email"
          bind:value={email}
        />
      </div>
      <button disabled={email.length === 0} class="submit" type="submit"
        >Reset password</button
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
</style>
