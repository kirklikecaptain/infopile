<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<main>
  <form method="post" use:enhance>
    <h1>Create an account</h1>
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
    <div class="button-row">
      <a class="button secondary" href="/login">Log In</a>
      <button data-scheme="primary">Sign Up</button>
    </div>
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
    max-width: 500px;
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

  .button-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
