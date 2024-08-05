<script lang="ts">
  import "$lib/styles/_index.css";
  import { enhance } from "$app/forms";
  import InfoPile from "$lib/components/InfoPile.svelte";
  import type { LayoutData } from "./$types";
  import { page } from "$app/stores";

  export let data: LayoutData;

  $: showHomeLink = $page.url.pathname !== "/";
  $: showLoginLink = $page.url.pathname !== "/user/login";
  $: showSignupLink = $page.url.pathname !== "/user/signup";
</script>

<div class="layout">
  <header>
    {#if showHomeLink}
      <a class="home" href="/">
        <InfoPile variant="icon" />
      </a>
    {:else}
      <InfoPile />
    {/if}
    <nav>
      {#if data.user}
        <div class="user-menu">
          <button class="outline">
            {data.user.username}
          </button>
          <div class="user-dropdown">
            <form use:enhance action="/?/logout" method="POST">
              <button class="secondary" data-scheme="accent">Log Out</button>
            </form>
          </div>
        </div>
        <a href="/new/post" class="button secondary" data-scheme="primary">New Post</a>
      {:else}
        {#if showLoginLink}
          <a href="/user/login" class="button secondary">Log In</a>
        {/if}
        {#if showSignupLink}
          <a href="/user/signup" class="button" data-scheme="accent">Sign Up</a>
        {/if}
      {/if}
    </nav>
  </header>
  <slot />
  <footer>Footer</footer>
</div>

<style lang="postcss">
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: var(--border);

    .home {
      display: block;
    }

    nav {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-menu {
      position: relative;

      &:hover .user-dropdown {
        display: block;
      }

      .user-dropdown {
        display: none;
        position: absolute;
        top: 100%;
        right: 50%;
        padding-top: var(--space-sm);
        z-index: 1;
        transform: translateX(50%);

        form {
          background: var(--color-00);
          border: var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-md);
        }

        button {
          white-space: nowrap;
        }
      }
    }
  }

  footer {
    margin-top: auto;
    padding: 1rem;
    background: var(--color-10);
  }
</style>
