<script lang="ts">
  import { pages } from '../routes/docs/nav';

  const searchPages = JSON.stringify([
    { href: '/', title: 'home', lede: 'maycord, an upcoming client mod for discord’s native rust app.' },
    { href: '/warning', title: 'warning', lede: 'what to check before trusting a client mod or download.' },
    ...pages.map(({ href, title, lede }) => ({ href, title, lede }))
  ]);
</script>

<svelte:head>
  <script type="module" src="/docs-search.js"></script>
</svelte:head>

<button
  id="docs-search-trigger"
  class="trigger"
  type="button"
  aria-label="search"
  aria-controls="docs-search-dialog"
  aria-haspopup="dialog"
  hidden
  disabled
>
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </svg>
  <span class="trigger-label">search</span>
  <span class="shortcut" data-search-shortcut></span>
</button>

<dialog id="docs-search-dialog" class="palette" aria-labelledby="docs-search-title" data-search-pages={searchPages}>
  <h2 id="docs-search-title" class="sr-only">search</h2>

  <div class="field">
    <label class="sr-only" for="docs-search-input">search</label>
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </svg>
    <input
      id="docs-search-input"
      type="search"
      placeholder="search…"
      maxlength="160"
      autocomplete="off"
      spellcheck="false"
      role="combobox"
      aria-autocomplete="list"
      aria-controls="docs-search-results"
      aria-expanded="false"
      aria-describedby="docs-search-status"
    />
    <button id="docs-search-retry" class="retry" type="button" hidden>try again</button>
    <button id="docs-search-close" class="close" type="button" aria-label="close search">
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    </button>
  </div>

  <p id="docs-search-status" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></p>

  <div class="results-area">
    <div id="docs-search-results" class="results" role="listbox" aria-label="search results"></div>
    <p id="docs-search-empty" class="empty" hidden>no results found.</p>
  </div>
</dialog>

<template id="docs-search-result-template">
  <!-- svelte-ignore a11y_consider_explicit_label (docs-search.js fills the text spans) -->
  <a class="search-result" href="/docs" role="option" tabindex="-1" aria-selected="false">
    <svg class="result-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
    <span data-search-context class="result-context"></span>
    <span data-search-title class="result-title"></span>
    <span data-search-excerpt class="result-excerpt"></span>
    <svg class="result-enter" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 5v7a3 3 0 0 1-3 3H5M9 11l-4 4 4 4" />
    </svg>
  </a>
</template>

<style>
  svg {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.75;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .icon {
    flex: none;
    width: 1.25rem;
    height: 1.25rem;
  }

  /* trigger: square icon button on narrow screens, search-field shape from 40rem */
  .trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    border: 1px solid var(--line);
    border-radius: 0.6rem;
    background: transparent;
    color: var(--muted);
    font: inherit;
    font-size: 0.9375rem;
    cursor: pointer;
  }

  .trigger:hover {
    border-color: var(--faint);
    color: var(--ink);
  }

  .trigger-label,
  .shortcut {
    display: none;
  }

  .trigger[hidden],
  .retry[hidden],
  .empty[hidden] {
    display: none;
  }

  .shortcut {
    padding: 0.1rem 0.4rem;
    border: 1px solid var(--line);
    border-radius: 0.35rem;
    background: var(--surface);
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    line-height: 1.4;
    letter-spacing: 0;
  }

  @media (min-width: 40rem) {
    .trigger {
      justify-content: flex-start;
      width: auto;
      min-width: 11rem;
      padding-inline: 0.75rem 0.5rem;
    }

    .trigger-label {
      display: block;
      flex: 1;
      text-align: start;
    }

    .shortcut:not(:empty) {
      display: block;
    }
  }

  /* palette: one bar, results drop below it only while there is a query with something to show */
  .palette {
    width: min(40rem, calc(100% - 2rem));
    max-width: none;
    max-height: calc(100svh - 2 * min(16vh, 8rem));
    max-height: calc(100dvh - 2 * min(16vh, 8rem));
    margin: min(16vh, 8rem) auto auto;
    padding: 0;
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: 0.875rem;
    background: var(--bg);
    color: var(--ink);
    box-shadow: 0 1.5rem 3rem -1rem oklch(0.13 0.004 357 / 0.35);
  }

  .palette[open] {
    display: flex;
    flex-direction: column;
    animation: palette-in 160ms var(--ease-out);
  }

  .palette:has(.field:focus-within) {
    border-color: var(--accent);
  }

  .palette::backdrop {
    background: oklch(0.13 0.004 357 / 0.5);
  }

  @keyframes palette-in {
    from {
      opacity: 0;
      transform: translateY(-0.5rem);
    }
  }

  .field {
    display: flex;
    flex: none;
    align-items: center;
    gap: 0.5rem;
    padding-inline: 1rem 0.375rem;
    color: var(--faint);
  }

  .palette:global([data-loading]) .field > .icon {
    animation: loading 0.8s ease-in-out infinite alternate;
  }

  @keyframes loading {
    to {
      opacity: 0.35;
    }
  }

  input {
    flex: 1;
    min-width: 0;
    height: 3.5rem;
    margin-inline-start: 0.25rem;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--ink);
    font: inherit;
    font-size: 1.125rem;
    outline: none;
  }

  input::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }

  input::placeholder {
    color: var(--faint);
  }

  input:focus-visible {
    outline: none;
  }

  .close {
    display: grid;
    flex: none;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    border: 0;
    border-radius: 0.6rem;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
  }

  .close:hover {
    background: var(--surface);
    color: var(--ink);
  }

  .close:focus-visible {
    outline-offset: -2px;
  }

  .retry {
    flex: none;
    min-height: 2rem;
    padding: 0 0.75rem;
    border: 1px solid var(--line);
    border-radius: 0.5rem;
    background: transparent;
    color: var(--ink);
    font: inherit;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
  }

  .retry:hover {
    border-color: var(--accent);
  }

  .results-area {
    display: none;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0.5rem;
    border-top: 1px solid var(--line);
  }

  .palette:global([data-has-query]) .results-area:has(:global(.search-result), .empty:not([hidden])) {
    display: block;
  }

  .results {
    display: grid;
    gap: 0.125rem;
  }

  .empty {
    margin: 0;
    padding: 1rem 0.5rem;
    color: var(--muted);
    font-size: 0.9375rem;
    text-align: center;
  }

  /* result rows are cloned from the template at runtime, so keep them out of svelte's unused-css pruning */
  .results :global(.search-result) {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    column-gap: 0.75rem;
    align-items: start;
    padding: 0.6rem 0.75rem;
    border-radius: 0.6rem;
    color: var(--ink);
    text-decoration: none;
    scroll-margin-block: 0.5rem;
  }

  .results :global(.search-result:hover) {
    background: var(--surface);
  }

  .results :global(.search-result[aria-selected='true']) {
    background: var(--accent-soft);
  }

  .results :global(.result-icon),
  .results :global(.result-enter) {
    width: 1.125rem;
    height: 1.125rem;
    margin-top: 0.15rem;
    color: var(--faint);
    fill: none;
    stroke: currentColor;
    stroke-width: 1.75;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .results :global(.result-icon) {
    grid-row: 1 / span 3;
  }

  .results :global(.result-enter) {
    grid-column: 3;
    grid-row: 1 / span 3;
    align-self: center;
    visibility: hidden;
    color: var(--accent);
  }

  .results :global(.search-result[aria-selected='true'] .result-icon) {
    color: var(--accent);
  }

  .results :global(.search-result[aria-selected='true'] .result-enter) {
    visibility: visible;
  }

  .results :global(:is(.result-context, .result-title, .result-excerpt)) {
    grid-column: 2;
    min-width: 0;
  }

  .results :global(:is(.result-context, .result-excerpt):empty) {
    display: none;
  }

  .results :global(.result-context) {
    overflow: hidden;
    color: var(--muted);
    font-size: 0.75rem;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .results :global(.result-title) {
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .results :global(.result-excerpt) {
    display: -webkit-box;
    margin-top: 0.15rem;
    overflow: hidden;
    color: var(--muted);
    font-size: 0.8125rem;
    line-height: 1.45;
    overflow-wrap: anywhere;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .results :global(mark) {
    border-radius: 0.2rem;
    background: var(--accent-soft);
    color: var(--ink);
    font-weight: 600;
  }

  .results :global(.search-result[aria-selected='true'] mark) {
    text-decoration: underline 1px var(--accent);
    text-underline-offset: 0.18em;
  }

  @media (max-width: 39.99rem) {
    .palette {
      width: 100%;
      max-height: 100svh;
      max-height: 100dvh;
      margin: 0 auto auto;
      border-width: 0 0 1px;
      border-radius: 0 0 0.875rem 0.875rem;
    }
  }
</style>
