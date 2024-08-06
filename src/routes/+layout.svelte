<script lang="ts">
  import "$styles/_index.css";
  import { page } from "$app/stores";
  import InfoPile from "$components/InfoPile.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  $: showHomeLink = $page.url.pathname !== "/";
  $: showLoginLink = $page.url.pathname !== "/user/login";
  $: showSignupLink = $page.url.pathname !== "/user/signup";
</script>

<div class="layout">
  <header>
    <div class="left">
      {#if showHomeLink}
        <a class="home" href="/">
          <InfoPile />
        </a>
      {:else}
        <InfoPile />
      {/if}
    </div>
    <nav>
      {#if data.user}
        <div class="user-menu">
          <div>
            {data.user.username}
          </div>
          <div class="dropdown">
            <div class="content">
              <a href="/user/logout" class="button subtle" data-scheme="error">Log Out</a>
            </div>
          </div>
        </div>
        <a href="/new/post" class="button" data-scheme="primary">New Post</a>
        <a href="/new/community" class="button" data-scheme="primary">New Community</a>
      {:else}
        {#if showLoginLink}
          <a href="/user/login" class="button outline">Log In</a>
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

    .left {
      display: flex;
      align-items: center;
      gap: var(--space-md);
    }

    .home {
      display: block;
    }

    nav {
      display: flex;
      align-items: center;
      gap: var(--space-md);
    }

    .user-menu {
      position: relative;

      &:hover .dropdown {
        display: block;
      }

      .dropdown {
        display: none;
        position: absolute;
        top: 100%;
        right: 50%;
        padding-top: var(--space-md);
        z-index: 1;
        transform: translateX(50%);

        .content {
          border: var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          background: var(--color-00);

          a {
            display: block;
            white-space: nowrap;
          }
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
