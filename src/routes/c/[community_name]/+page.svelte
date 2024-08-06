<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main>
  <h1>{data.community.name}</h1>
  <p>Created by {data.community.creator.username}</p>
  <p>{data.community.description}</p>
  <form use:enhance method="POST">
    <button data-scheme="primary">Join Community</button>
  </form>
</main>

<style lang="postcss">
  main {
    padding: 1rem;
  }
  h1 {
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
</style>
