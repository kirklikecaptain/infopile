<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";

  let md = "# Hello world!";
  const plugins = [gfmPlugin()];
</script>

<textarea bind:value={md} />
<Markdown {md} {plugins} />
