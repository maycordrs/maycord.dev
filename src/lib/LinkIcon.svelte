<script lang="ts">
  let { kind = 'external' }: { kind?: 'external' | 'right' | 'left' } = $props();
</script>

<svg
  class={['link-icon', kind === 'left' && 'leading']}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.75"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  {#if kind === 'external'}
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  {:else if kind === 'right'}
    <path d="M5 12h14M13 6l6 6-6 6" />
  {:else}
    <path d="M19 12H5M11 6l-6 6 6 6" />
  {/if}
</svg>
