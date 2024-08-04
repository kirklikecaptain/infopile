<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<main>
  <form use:enhance method="POST">
    <h1>Create a new Community</h1>
    <div>
      <label for="name">Name</label>
      <input type="text" name="name" id="name" />
    </div>
    <div>
      <label for="description">Description</label>
      <textarea name="description" id="description" rows="4" />
    </div>
    {#if form?.message}
      <p class="error">{form.message}</p>
    {/if}
    <button data-scheme="primary">Create</button>
  </form>
</main>

<style lang="postcss">
  main {
    flex-grow: 1;
    padding: 4rem;
    background: var(--neutral-05);
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
    background: #fff;
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
