<script lang="ts">
  import type { Snippet } from 'svelte';
  import { page } from '$app/state';
  import { groups, pages } from './nav';

  let { children }: { children: Snippet } = $props();

  const index = $derived(pages.findIndex((entry) => entry.href === page.url.pathname));
  const current = $derived(pages[index]);
  const group = $derived(groups.find((entry) => entry.pages.includes(current)));
  const previous = $derived(index > 0 ? pages[index - 1] : undefined);
  const next = $derived(index >= 0 ? pages[index + 1] : undefined);
  const title = $derived(current ? `${current.title} | maycord docs` : 'maycord docs');
  const url = $derived(`https://maycord.dev${current?.href ?? '/docs'}`);
</script>

<svelte:head>
  <title>{title}</title>
  {#if current}
    <link rel="canonical" href={url} />
    <meta name="description" content={current.lede} />
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:description" content={current.lede} />
    <meta name="twitter:card" content="summary" />
  {/if}
</svelte:head>

{#snippet links()}
  {#each groups as entry (entry.title)}
    <p class="group-title">{entry.title}</p>
    <ul aria-label={entry.title}>
      {#each entry.pages as item (item.href)}
        <li>
          <a href={item.href} aria-current={item === current ? 'page' : undefined}>{item.title}</a>
          {#if item === current}
            <ul class="sections" aria-label="on this page">
              {#each item.sections as [id, label] (id)}
                <li><a href={`#${id}`}>{label}</a></li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
  {/each}
{/snippet}

<main class="frame docs">
  <div class="side">
    <details class="menu">
      <summary>
        <span>docs menu</span>
        {#if current}<span class="menu-current">{current.title}</span>{/if}
      </summary>
      <nav aria-label="documentation">{@render links()}</nav>
    </details>
    <nav class="sidebar" aria-label="documentation">{@render links()}</nav>
  </div>

  <article class="content">
    {#if current}
      <header class="page-head">
        <nav class="crumbs" aria-label="breadcrumb">
          <ol>
            <li><a href="/docs">docs</a></li>
            {#if group}<li>{group.title}</li>{/if}
            <li><span aria-current="page">{current.title}</span></li>
          </ol>
        </nav>
        <h1>{current.title}</h1>
        <p class="lede">{current.lede}</p>
        <aside class="prototype" aria-label="project references">
          <p>
            check <a href="/docs/status#discord">availability and supported clients</a> and read the
            <a href="/warning">account and download warning</a>.
          </p>
        </aside>
        <aside class="prototype" aria-label="documentation updates">
          <p><strong>hot:</strong> this documentation is evolving and can change anytime.</p>
        </aside>
      </header>
    {/if}

    <div class="prose">
      {@render children()}
    </div>

    {#if previous || next}
      <nav class="pager" aria-label="previous and next pages">
        {#if previous}
          <a class="prev" href={previous.href}><span class="pager-label">previous</span>{previous.title}</a>
        {/if}
        {#if next}
          <a class="next" href={next.href}><span class="pager-label">next</span>{next.title}</a>
        {/if}
      </nav>
    {/if}
  </article>
</main>

<style>
  .frame {
    width: min(100%, calc(var(--frame) + var(--gutter) * 2));
    margin-inline: auto;
    padding-inline: var(--gutter);
  }

  .docs {
    display: grid;
    gap: 1.5rem;
    padding-top: 0.5rem;
  }

  /* sidebar and compact menu */
  .sidebar {
    display: none;
  }

  .menu {
    border: 1px solid var(--line);
    border-radius: 0.75rem;
  }

  .menu summary {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-height: 2.75rem;
    padding: 0.4rem 1rem;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    list-style: none;
  }

  .menu summary::-webkit-details-marker {
    display: none;
  }

  .menu summary::after {
    content: '';
    flex: none;
    width: 0.5rem;
    height: 0.5rem;
    margin-inline-start: auto;
    border-right: 1.5px solid var(--muted);
    border-bottom: 1.5px solid var(--muted);
    transform: translateY(-0.15rem) rotate(45deg);
  }

  .menu[open] summary::after {
    transform: translateY(0.1rem) rotate(-135deg);
  }

  .menu-current {
    overflow: hidden;
    color: var(--muted);
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .menu nav {
    padding: 0 0.6rem 0.75rem;
  }

  .group-title {
    margin: 1rem 0 0.3rem;
    padding-inline: 0.6rem;
    color: var(--faint);
    font-size: 0.75rem;
    font-weight: 600;
  }

  .group-title:first-child {
    margin-top: 0.25rem;
  }

  .side ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .side a {
    display: block;
    padding: 0.35rem 0.6rem;
    border-radius: 0.5rem;
    color: var(--muted);
    font-size: 0.9375rem;
    line-height: 1.35;
    text-decoration: none;
  }

  .side a:hover {
    color: var(--ink);
  }

  .side a[aria-current='page'] {
    background: var(--accent-soft);
    color: var(--ink);
    font-weight: 600;
  }

  .side .sections {
    margin: 0.25rem 0 0.4rem 0.9rem;
    padding-inline-start: 0.4rem;
    border-inline-start: 1px solid var(--line);
  }

  .side .sections a {
    padding-block: 0.25rem;
    color: var(--faint);
    font-size: 0.875rem;
  }

  .side .sections a:hover {
    color: var(--ink);
  }

  /* page header */
  .content {
    min-width: 0;
    max-width: 46rem;
  }

  .page-head {
    margin-bottom: clamp(1.75rem, 5vw, 2.25rem);
  }

  .crumbs ol {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 0.5rem;
    margin: 0 0 0.6rem;
    padding: 0;
    color: var(--faint);
    font-size: 0.8125rem;
    list-style: none;
  }

  .crumbs li + li::before {
    content: '/';
    margin-inline-end: 0.5rem;
    color: var(--line);
  }

  .crumbs a {
    color: var(--muted);
  }

  .crumbs [aria-current='page'] {
    color: var(--accent);
    font-weight: 600;
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 1.5rem + 2vw, 2.5rem);
    font-weight: 650;
    line-height: 1.1;
    letter-spacing: -0.04em;
  }

  .lede {
    max-width: 68ch;
    margin: 0.75rem 0 0;
    color: var(--muted);
    font-size: clamp(1.0625rem, 0.4vw + 1rem, 1.1875rem);
    text-wrap: pretty;
  }

  .prototype,
  .prose :global(.prototype) {
    margin: 1.5rem 0 0;
    padding: 0.9rem 1.1rem;
    border-radius: 0.75rem;
    background: var(--warn);
    color: var(--warn-ink);
    font-size: 0.9375rem;
  }

  .prototype p,
  .prose :global(.prototype p) {
    margin: 0;
  }

  .prototype a,
  .prose :global(.prototype a) {
    color: inherit;
    font-weight: 600;
    text-decoration-thickness: 2px;
  }

  .prototype a:focus-visible,
  .prose :global(.prototype a:focus-visible) {
    outline-color: currentColor;
  }

  /* previous and next */
  .pager {
    display: grid;
    gap: 0.75rem;
    margin-top: clamp(2.5rem, 6vw, 3.5rem);
  }

  .pager a {
    display: grid;
    gap: 0.15rem;
    padding: 0.8rem 1rem;
    border: 1px solid var(--line);
    border-radius: 0.75rem;
    color: var(--ink);
    font-weight: 600;
    text-decoration: none;
  }

  .pager a:hover {
    border-color: var(--accent);
  }

  .pager-label {
    color: var(--faint);
    font-size: 0.8125rem;
    font-weight: 400;
  }

  .pager .next {
    text-align: end;
  }

  @media (min-width: 40rem) {
    .pager {
      grid-template-columns: 1fr 1fr;
    }

    .pager .next {
      grid-column: 2;
    }
  }

  @media (min-width: 64rem) {
    .docs {
      grid-template-columns: 14rem minmax(0, 1fr);
      align-items: start;
      gap: 4rem;
    }

    .menu {
      display: none;
    }

    .side {
      position: sticky;
      top: calc(var(--site-header-height) + 1.5rem);
    }

    .sidebar {
      display: block;
      max-height: calc(100svh - var(--site-header-height) - 3rem);
      overflow-y: auto;
      padding-bottom: 1rem;
    }
  }

  /* shared prose for routed pages */
  .prose :global(:is(section, h2, h3)[id]) {
    scroll-margin-top: 1.5rem;
  }

  .prose :global(section:first-child) {
    padding-top: clamp(1.75rem, 5vw, 2.25rem);
    border-top: 1px solid var(--line);
  }

  .prose :global(section + section) {
    margin-top: clamp(2.5rem, 6vw, 3.5rem);
    padding-top: clamp(2rem, 5vw, 2.75rem);
    border-top: 1px solid var(--line);
  }

  .prose :global(h2) {
    margin: 0 0 1rem;
    font-size: clamp(1.375rem, 1.2rem + 0.6vw, 1.625rem);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.03em;
  }

  .prose :global(h3) {
    margin: 2rem 0 0.6rem;
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .prose :global(p) {
    max-width: 68ch;
    margin: 0 0 1rem;
    text-wrap: pretty;
  }

  .prose :global(ul),
  .prose :global(ol) {
    max-width: 68ch;
    margin: 0 0 1rem;
    padding-inline-start: 1.25rem;
  }

  .prose :global(li + li) {
    margin-top: 0.35rem;
  }

  .prose :global(code) {
    padding: 0.1em 0.35em;
    border-radius: 0.3rem;
    background: var(--surface);
    font-family: var(--font-mono);
    font-size: 0.875em;
    letter-spacing: 0;
    overflow-wrap: anywhere;
  }

</style>
