<script lang="ts">
  export let variant: "full" | "icon" | "text" = "full";
  export let size: "sm" | "md" | "lg" | "xl" = "md";
  export let monochrome = false;

  $: showIcon = variant !== "text";
  $: showText = variant !== "icon";
</script>

<div class={`logo ${size}`} class:monochrome>
  {#if showIcon}
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24">
      <path class="flag" d="M18.79,1.19h-5.46v5.04h5.46l-1.81-2.52,1.81-2.52Z" />
      <path
        fill="currentColor"
        d="M22.13,16.39c-.72-.83-1.71-1.3-2.99-1.43,0-1.76-.68-3.27-2.05-4.53-1.25-1.16-2.77-1.79-4.57-1.88V1.19h-1.63v7.41c-1.19.16-2.27.59-3.23,1.26-1.26.89-2.1,2.03-2.52,3.4-1.24.26-2.28.85-3.1,1.76-.82.91-1.23,1.96-1.23,3.16,0,1.41.54,2.6,1.63,3.58,1.08.98,2.41,1.47,3.97,1.47h12.22c1.28,0,2.36-.41,3.25-1.22s1.34-1.79,1.34-2.94c0-.96-.36-1.86-1.09-2.68ZM20.44,20.73c-.49.44-1.09.66-1.81.66H6.41c-.99,0-1.83-.31-2.52-.94-.7-.63-1.05-1.38-1.05-2.27s.35-1.65,1.05-2.28c.69-.62,1.53-.94,2.52-.94s1.82.32,2.52.94c.7.63,1.04,1.39,1.04,2.28h2.04c0-1.27-.45-2.37-1.35-3.3-.9-.92-2.01-1.49-3.33-1.69.39-.82,1-1.5,1.83-2.03.83-.53,1.78-.79,2.85-.79,1.41,0,2.61.45,3.6,1.34,1,.9,1.49,1.98,1.49,3.25v1.84h1.53c.72,0,1.32.22,1.81.67.49.44.74.98.74,1.63s-.25,1.18-.74,1.63Z"
      />
    </svg>
  {/if}
  {#if showText}
    <span>Info<span>Pile</span></span>
  {/if}
</div>

<style lang="postcss">
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: bold;
    text-decoration: none;
    user-select: none;

    &.sm {
      font-size: 1em;
    }

    &.md {
      font-size: 1.5em;
    }

    &.lg {
      font-size: 2em;
    }

    &.xl {
      font-size: 3em;
    }
  }

  .monochrome {
    filter: grayscale(100%);
  }

  span {
    font-weight: bold;

    span {
      color: var(--fire-60);
    }
  }

  svg {
    width: 1.25em;
    height: 1.25em;

    .flag {
      fill: var(--fire-60);
    }
  }
</style>
