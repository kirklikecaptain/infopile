<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<main>
  <form method="post" use:enhance>
    <h1>Welcome back</h1>
    <div>
      <label for="username">Username</label>
      <input name="username" id="username" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" name="password" id="password" />
    </div>
    {#if form?.message}
      <p class="error">{form.message}</p>
    {/if}
    <button data-scheme="primary">Log In</button>
  </form>
</main>

<style lang="postcss">
  main {
    padding: 4rem;
  }

  h1 {
    font-weight: bold;
    font-size: var(--text-lg);
  }

  form {
    margin: auto;
    max-width: 400px;
    display: grid;
    gap: 1.5rem;
    padding: 1.5rem;
    border: var(--border);
    border-radius: var(--radius-md);
  }

  label {
    display: block;
    margin-bottom: 4px;
  }

  .error {
    color: var(--red-60);
    text-align: center;
    padding: 4px;
    border: solid 1px var(--red-20);
    border-radius: var(--radius-sm);
  }
</style>
