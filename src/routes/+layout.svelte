<script>
  import "../global.scss";
  import brandLogo from "../assets/dayforge.svg";
  import Waves from "../assets/waves2.svelte";
  import { page } from "$app/stores";

  export let data;
  data.session = true;

  let userCredits = 0;
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,900&family=League+Gothic&family=Montserrat:wght@100;300&family=Poppins:wght@100;200;300;400;500;600;700;900&family=Roboto:wght@300;400;500;700;900&display=swap"
    rel="stylesheet"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
  />
</svelte:head>
<nav>
  <a href={!data?.session ? "/" : "/"}>
    <img src={brandLogo} width="150" alt="brand logo" class="logo" />
  </a>
  <div class="nav__items">
    {#if data?.session}
      <a
        href="/generate"
        class:active={$page.url.pathname.includes("/generate")}>Generate</a
      >

      <a
        href="/how-to-use"
        class:active={$page.url.pathname.includes("/how-to-use")}>My days</a
      >
      <a
        href="/examples"
        class:active={$page.url.pathname.includes("/examples")}>Examples</a
      >
      <a href="/profile" class:active={$page.url.pathname.includes("/profile")}
        >Profile</a
      >
    {/if}
  </div>
  {#if data?.session}
    <!-- <form action="/logout" method="POST">
      <button style="height:25px ;" type="submit">Logout</button>
    </form> -->

    <span>{userCredits} {userCredits === 1 ? "credit" : "credits"} left</span>
    <a class="signup buy__credits" href="/buy">Buy credits</a>
    <!-- <div class="profile">
      Profile
      <span class="material-symbols-outlined icon"> expand_more </span>
    </div> -->
  {:else}
    <div class="nav__ctas">
      <a href="/login">Sign in</a>
      <a class="signup" href="/register">Sign up</a>
    </div>
  {/if}
</nav>

<slot />

<Waves />

<style lang="scss">
  div.profile {
    transition: color 0.2s ease-in-out;
    margin: 0;
    margin-left: 1em;
    color: rgba(22, 22, 22, 0.699);
    &:hover {
      color: black;
    }
  }
  nav {
    display: flex;
    align-items: center;
    padding: 1rem 0rem;
    background-color: var(--color-primary);
    color: var(--color-white);
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 1rem;
    z-index: 999;

    a {
      transition: color 0.2s ease-in-out;
      text-decoration: none;
      color: rgba(22, 22, 22, 0.699);
      &:hover {
        color: black;
      }
      &.active {
        border-bottom: solid 5px var(--primary-color);
        color: black;
      }
    }
  }
  .logo {
    cursor: pointer;
  }
  .nav__items {
    border-radius: var(--border-radius);
    padding: 0.5em 2em;
    display: flex;
    gap: 2em;
    margin: 0 auto;
    box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    -webkit-box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    border: 2px solid black;
    background-color: #fcfcfc;
  }

  .nav__ctas {
    display: flex;
    gap: 2em;

    a:first-child {
      align-self: center;
    }
  }
  .signup {
    background-color: #f7ca50;
    border-radius: var(--border-radius);
    padding: 0.5em 1em;
    color: black;
    font-weight: 600;
    box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    -webkit-box-shadow: 4px 5px 0px 0px rgba(0, 0, 0, 1);
    border: 2px solid black;
    position: relative;
    transition-property: box-shadow, top, left;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
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
    &.buy__credits {
      margin-left: 1em;
    }
  }
  .profile {
    display: flex;
    cursor: pointer;
  }
</style>
