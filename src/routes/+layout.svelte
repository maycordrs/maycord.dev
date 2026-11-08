<script lang="ts">
  import type { Snippet } from 'svelte';
  import { page } from '$app/state';
  import DocSearch from '../lib/DocSearch.svelte';
  import LinkIcon from '../lib/LinkIcon.svelte';
  import '../app.css';

  let { children }: { children: Snippet } = $props();
</script>

<div class="site-shell">
  <header>
    <nav aria-label="main navigation">
      <a class="brand" href="/" aria-label="maycord home">
        <img src="/favicon.svg" alt="" width="28" height="28" />maycord
      </a>
      <div class="nav-actions">
        <a class="nav-link icon-link" href="https://fpui.dev/" rel="noreferrer" target="_blank"
          >fpui<svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg><span class="sr-only"> (opens in a new tab)</span></a
        >
        <a class="nav-link" href="/docs" aria-current={page.url.pathname === '/docs' ? 'page' : page.url.pathname.startsWith('/docs/') ? 'true' : undefined}
          >docs</a
        >
        <DocSearch />
      </div>
    </nav>
  </header>

  {@render children()}

  <footer class="foot">
    <div class="foot-top">
      <p class="links">
        <a href="https://discord.gg/pFBbwyX2JK" rel="noreferrer" target="_blank" class="icon-link"
          >discord<LinkIcon /><span class="sr-only"> (opens in a new tab)</span></a
        >
        <a href="https://github.com/schmayterling/maycord" rel="noreferrer" target="_blank" class="icon-link"
          >github<LinkIcon /><span class="sr-only"> (opens in a new tab)</span></a
        >
      </p>
      <div class="site-theme" hidden>
        <button id="site-theme" type="button" data-theme="system" aria-label="site theme" title="site theme" disabled>
          <svg class="system" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="4" width="18" height="12" rx="2" />
            <path d="M8 20h8M12 16v4" />
          </svg>
          <svg class="light" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            />
          </svg>
          <svg class="dark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
          </svg>
        </button>
      </div>
    </div>
    <p>maycord is an independent project, not affiliated with or endorsed by discord inc.</p>
    <p>
      <a id="site-license" class="icon-link" href="https://github.com/maycordrs/maycord.dev" rel="noreferrer" target="_blank"
        >this site is mit licensed<LinkIcon /><span class="sr-only"> (opens in a new tab)</span></a
      >
    </p>
  </footer>
</div>

<style>
  .site-shell {
    display: flex;
    flex-direction: column;
    min-height: 100svh;
  }

  .site-shell > :global(main) {
    flex: 1;
  }

  header {
    position: sticky;
    top: 0;
    z-index: 1;
    height: var(--site-header-height);
    background: var(--bg);
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: min(100%, calc(var(--frame) + var(--gutter) * 2));
    height: 100%;
    margin-inline: auto;
    padding-inline: var(--gutter);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: clamp(0.75rem, 3vw, 1.5rem);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--ink);
    font-weight: 600;
    letter-spacing: -0.03em;
    text-decoration: none;
  }

  .nav-link {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    border-bottom: 0;
    color: var(--muted);
    font-size: 0.9375rem;
    font-weight: 500;
    text-decoration: none;
  }

  .nav-link:hover,
  .nav-link[aria-current] {
    color: var(--ink);
  }

  .nav-link[aria-current] {
    text-decoration: underline 2px var(--accent);
    text-underline-offset: 0.4em;
  }

  .foot {
    display: grid;
    gap: 0.35rem;
    width: min(100%, calc(var(--frame) + var(--gutter) * 2));
    margin: clamp(3rem, 8vw, 5rem) auto 0;
    padding: 1.5rem var(--gutter) 2.5rem;
    background: linear-gradient(var(--line), var(--line)) var(--gutter) 0 / calc(100% - var(--gutter) * 2) 1px
      no-repeat;
    color: var(--faint);
    font-size: 0.8125rem;
  }

  .foot p {
    margin: 0;
  }

  .foot-top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem 1.5rem;
    margin-bottom: 0.65rem;
    font-size: 0.9375rem;
  }

  .site-theme[hidden] {
    display: none;
  }

  .site-theme button {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    border: 1px solid var(--line);
    border-radius: 0.6rem;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
  }

  .site-theme button:hover {
    border-color: var(--faint);
    color: var(--ink);
  }

  .site-theme svg {
    display: none;
    width: 1.25rem;
    height: 1.25rem;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.75;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* theme.js swaps data-theme at runtime, so keep these out of svelte's unused-css pruning */
  .site-theme :global(button[data-theme='system'] > .system),
  .site-theme :global(button[data-theme='light'] > .light),
  .site-theme :global(button[data-theme='dark'] > .dark) {
    display: block;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.25rem;
  }

  .foot a {
    color: var(--muted);
  }

  .foot a:hover {
    color: var(--ink);
  }
</style>
