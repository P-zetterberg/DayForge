<script>
  import { enhance } from "$app/forms";
  import { supabaseClient } from "$lib/supabase";

  let email = "pontus@zetterberg.io";
  let password = "qew123w2";

  const signInWithProvider = async (provider) => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: provider,
    });
  };

  const submitSocialLogin = async ({ action, cancel }) => {
    switch (action.searchParams.get("provider")) {
      case "google":
        await signInWithProvider("google");
        break;
      default:
        break;
    }
    cancel();
  };
</script>

<main>
  <div class="form__container">
    <form action="?/login" method="POST">
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
    <!-- use:enhance={submitSocialLogin} -->
    <form method="POST">
      <button formaction="?/login&provider=apple">Apple</button>
      <button formaction="?/login&provider=google">Google</button>
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
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 400px;
      gap: 1em;
    }
  }
  .form__container {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 10px;
    width: 400px;
    height: 500px;
    background-color: #fcfcfc;
    padding: 1em;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-radius: var(--border-radius);
  }
  h1 {
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
    transition:
      background-color ease-in 150ms,
      opacity ease-in 150ms;
    text-align: center;
    min-height: 45px;
    transition: scale ease-in 150ms;
    &:hover {
      background-color: var(--primary-button, #f7ca50);
      opacity: 0.85;
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

    a {
      opacity: 1;
      color: rgb(22, 22, 22);
      font-weight: 600;
    }
  }
  .forgot {
    font-size: 14px;
  }
</style>
