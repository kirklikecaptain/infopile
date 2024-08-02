import adapter from "@sveltejs/adapter-auto";
import { sveltePreprocess } from "svelte-preprocess";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess({
    postcss: {
      prependData: `@import "${projectDir}/src/lib/styles/config/breakpoints.css";`
    }
  }),
  kit: {
    adapter: adapter()
  }
};

export default config;
