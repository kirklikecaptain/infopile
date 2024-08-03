<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<main>
  <form method="post" use:enhance>
    <h1>Create a new post</h1>
    <div>
      <label for="title">Title</label>
      <input name="title" id="title" />
    </div>
    <div>
      <label for="url">URL</label>
      <input type="url" name="url" id="url" />
    </div>
    <div>
      <label for="description">Description</label>
      <textarea name="description" id="description" rows="4" />
    </div>
    <button data-scheme="primary">Submit</button>
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
</style>
