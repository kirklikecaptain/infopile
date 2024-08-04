<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main>
  <h1><a href={data.post.url}>{data.post.title}</a></h1>
  <p>by {data.post.author.username} in {data.post.community.name}</p>
  <p>{data.post.description}</p>
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

  a {
    color: var(--primary-60);
  }
</style>
