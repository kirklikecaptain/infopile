<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main>
  <h1>Home Page</h1>
  <div>
    {#each data.posts as post}
      <article>
        <a href={`/p/${post.id}`}><h2>{post.title}</h2></a>
        <p>by {post.author.username}</p>
        <p>{post.description}</p>
      </article>
    {/each}
  </div>
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

  h2 {
    font-weight: bold;
  }
  article {
    padding: 0.25rem 0;
  }
</style>
