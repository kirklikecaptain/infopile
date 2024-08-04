<script lang="ts">
  import { getPostPath } from "$lib/utils/url";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main>
  <h1>Home Page</h1>
  <div>
    {#each data.recentPosts as post}
      <article>
        <a href={getPostPath(post.community.name, post.id)}><h2>{post.title}</h2></a>
        <p>by {post.author.username} in {post.community.name}</p>
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
