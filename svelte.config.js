import adapter from "@sveltejs/adapter-auto";
import { sveltePreprocess } from "svelte-preprocess";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(fileURLToPath(import.meta.url));

const styleTagData = `
@import "${projectDir}/src/ui/styles/variables/breakpoints.css";
`;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess({
    postcss: {
      prependData: styleTagData
    }
  }),
  kit: {
    adapter: adapter(),
    alias: {
      $: "src",
      $components: "src/ui/components",
      $styles: "/src/ui/styles"
    }
  },
  compilerOptions: {
    enableSourcemap: true
  }
};

export default config;
