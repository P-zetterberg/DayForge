<script>
  import { supabaseClient } from "$lib/supabase.js";
  import { enhance } from "$app/forms";
  import "../global.scss";
  import brandLogo from "../assets/dayforgeai-thicc.svg";
  import Waves from "../assets/waves2.svelte";
  import { page } from "$app/stores";

  export let data;

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
<nav style={!data?.session ? "justify-content:space-between;" : ""}>
  <a style="line-height: 0;" href={!data?.session ? "/" : "/"}>
    <img src={brandLogo} width="175" alt="brand logo" class="logo" />
  </a>
  {#if data?.session && !$page.url.pathname.includes("password")}
    <div class="nav__items">
      <a
        href="/generate"
        class:active={$page.url.pathname.includes("/generate")}>Generate</a
      >

      <a href="/history" class:active={$page.url.pathname.includes("/history")}
        >History</a
      >
      <a
        href="/examples"
        class:active={$page.url.pathname.includes("/examples")}>Examples</a
      >
      <div class="menu">
        <span class="level-1">Profile</span>
        <div class="sub-menu">
          <a href="/profile/billing" class="level-2">Billing</a>
          <form action="/api/signout" method="POST">
            <button class="level-2 btn" type="submit">Sign out</button>
          </form>
        </div>
      </div>
    </div>
  {/if}
  {#if data?.session && !$page.url.pathname.includes("password")}
    <span>{userCredits} {userCredits === 1 ? "credit" : "credits"} left</span>
    <a class="signup buy__credits" href="/buy">Buy credits</a>
  {:else if !$page.url.pathname.includes("password")}
    <div class="nav__ctas">
      <a class="signin" href="/login">Sign in</a>
      <a class="signup" href="/register">Sign up</a>
    </div>
  {/if}
</nav>

<slot />

<Waves />

<style lang="scss">
  /* div.profile {
    transition: color 0.2s ease-in-out;
    margin: 0;
    margin-left: 1em;
    color: rgba(22, 22, 22, 0.699);
    &:hover {
      color: black;
    }
  } */
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
  .menu {
    position: relative;
    cursor: pointer;
    &:hover .sub-menu {
      display: grid;
      opacity: 1;
    }
  }
  .level-1,
  .level-2:not(:last-child) {
    transition: color 0.2s ease-in-out;
    color: rgba(22, 22, 22, 0.699);
    font-size: 1em;
    &:hover {
      color: black;
    }
  }
  .sub-menu {
    display: grid;
    position: absolute;
    padding: 0.75em;
    width: max-content;
    border: 2px solid black;
    border-radius: calc(var(--border-radius) / 2);
    background-color: #fcfcfc;
    transition: opacity 150ms ease-in-out;
    opacity: 0;
    z-index: 2000;
  }
  .level-2 {
    font-size: 1em;
    &.btn {
      all: unset;
    }
  }
  .level-2:last-child {
    color: rgb(207, 50, 50);
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
  .signin {
    color: black;
  }
  /* .profile {
    display: flex;
    cursor: pointer;
  } */
</style>
