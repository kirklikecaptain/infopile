<script lang="ts">
  import { enhance } from "$app/forms";
  import "$lib/styles/_index.css";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<div class="app">
  <header>
    <div>
      <a class="brand" href="/">Info<span>Pile</span></a>
    </div>
    <nav>
      {#if data.user}
        <span>{data.user.username}</span>
        <form use:enhance action="/?/logout" method="post">
          <button>Log Out</button>
        </form>
        <a href="/submit" class="button" data-scheme="accent">New Post</a>
      {:else}
        <a href="/login" class="button secondary">Log In</a>
        <a href="/signup" class="button" data-scheme="accent">Sign Up</a>
      {/if}
    </nav>
  </header>
  <slot />
  <footer>Footer</footer>
</div>

<style lang="postcss">
  .app {
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
  }

  nav {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .brand {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;

    & span {
      color: var(--brand-60);
    }
  }

  footer {
    margin-top: auto;
    padding: 1rem;
    background: var(--neutral-05);
  }
</style>
