<script lang="ts">
  import "$lib/styles/_index.css";
  import Footer from "$lib/components/navigation/Footer.svelte";
  import Header from "$lib/components/navigation/Header.svelte";
</script>

<div>
  <Header />
  <slot />
  <Footer />
</div>

<style lang="postcss">
  div {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
