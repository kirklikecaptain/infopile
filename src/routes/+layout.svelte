<script lang="ts">
  import "$lib/styles/global.css";
  import Footer from "$lib/components/navigation/Footer.svelte";
  import Header from "$lib/components/navigation/Header.svelte";
</script>

<Header />
<slot />
<Footer />
