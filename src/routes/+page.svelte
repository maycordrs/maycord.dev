<script lang="ts">
  import LinkIcon from '../lib/LinkIcon.svelte';
  import MaycordWordmark from '../lib/MaycordWordmark.svelte';
</script>

<svelte:head>
  <title>maycord | an upcoming client mod for discord’s rust app</title>
  <link rel="canonical" href="https://maycord.dev/" />
  <script src="/wordmark.js"></script>
  <meta property="og:title" content="maycord | an upcoming client mod for discord’s rust app" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://maycord.dev/" />
  <meta property="og:description" content="maycord is an upcoming client mod for discord’s rust app, built on fpui. explore the documentation, development updates, and community." />
  <meta name="twitter:card" content="summary" />
  <meta
    name="description"
    content="maycord is an upcoming client mod for discord’s rust app, built on fpui. explore the documentation, development updates, and community."
  />
</svelte:head>

<main>
  <div class="frame notices">
    <aside class="notice" aria-labelledby="availability-title">
      <h2 id="availability-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3 2.5 20h19L12 3Z" />
          <path d="M12 10v4M12 17h.01" />
        </svg>
        not available yet
      </h2>
      <p>
        <strong><a href="https://maycord.dev/">maycord.dev</a> is our only official website</strong>, and maycord
        is not yet available to download. if another site offers a maycord download, it does not come from us.
      </p>
    </aside>
    <aside class="notice" aria-labelledby="official-title">
      <h2 id="official-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3 2.5 20h19L12 3Z" />
          <path d="M12 10v4M12 17h.01" />
        </svg>
        be careful with client and injector claims
      </h2>
      <p>
        discord’s rust client has not been publicly released, so claims of a working mod for it need clear
        evidence. be skeptical of early rewrites and injector claims, including ours, and only use software
        if you understand what it does and accept the risks.
      </p>
      <p class="more"><a class="icon-link" href="/warning">read the full warning<LinkIcon kind="right" /></a></p>
    </aside>
  </div>

  <section class="frame hero" aria-labelledby="hero-title">
    <div class="hero-card">
      <MaycordWordmark />

      <h1 id="hero-title">maycord is an upcoming client mod for discord’s rust app.</h1>

      <p class="actions">
        <a class="button icon-link" href="https://discord.gg/pFBbwyX2JK" rel="noreferrer" target="_blank"
          >join the discussion<LinkIcon /><span class="sr-only"> (opens in a new tab)</span></a
        >
        <a class="quiet icon-link" href="https://github.com/schmayterling/maycord" rel="noreferrer" target="_blank"
          >github repo (soon)<LinkIcon /><span class="sr-only"> (opens in a new tab)</span></a
        >
      </p>
    </div>
  </section>

  <section class="frame framework" aria-labelledby="fpui-title">
    <div class="framework-card">
      <h2 id="fpui-title">
        <svg class="framework-mark" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m9 24 12 8-12 8m30-16-12 8 12 8m4-16 12 8-12 8" />
        </svg>
        built on fpui
      </h2>
      <div>
        <p>
          fpui is a runtime mod framework for native apps. its core patches machine code, so it does not depend
          on the app’s ui framework. maycord uses its adapters, patching tools, and sandboxed plugin host to build
          customizations for discord.
        </p>
        <p class="more">
          <a class="icon-link" href="https://fpui.dev/" rel="noreferrer" target="_blank"
            >explore fpui<LinkIcon /><span class="sr-only"> (opens in a new tab)</span></a
          >
        </p>
      </div>
    </div>
  </section>

  <section class="frame faq" id="faq" aria-labelledby="faq-title">
    <h2 id="faq-title">questions</h2>
    <dl>
      <div>
        <dt>is maycord a standalone client?</dt>
        <dd>
          no. maycord will modify a compatible official discord client, so you’ll need that client installed.
        </dd>
      </div>
      <div>
        <dt>why is fpui a separate project from maycord?</dt>
        <dd>
          we split the patching engine out early so other gpui apps could use it, while maycord could focus on
          discord. each supported app and build needs a compatible adapter.
        </dd>
      </div>
      <div>
        <dt>which discord app will maycord work with?</dt>
        <dd>
          maycord is intended for discord’s upcoming native rust client. it does not work with the current discord
          app, and the native client had not been publicly released when we last checked on 8 november 2026.
        </dd>
      </div>
      <div>
        <dt>is it possible?</dt>
        <dd>
          fpui has already changed colors, run plugins, and changed behavior in native gpui test apps on macos.
          those results give maycord a foundation, but compatibility still needs testing on discord’s own client.
        </dd>
      </div>
      <div>
        <dt>why would you even make this?</dt>
        <dd>i like a challenge, and honestly, i wasn’t sure what else to do with my free time.</dd>
      </div>
      <div>
        <dt>how would maycord be installed?</dt>
        <dd>
          the intended flow is to load maycord when a compatible official client starts, then apply your themes
          and plugins. we are still working out the installer and update process.
        </dd>
      </div>
      <div>
        <dt>where can i get updates or download maycord?</dt>
        <dd>
          there is no public download yet, but you can
          <a class="icon-link" href="https://discord.gg/pFBbwyX2JK" rel="noreferrer" target="_blank"
            >join the discord<LinkIcon /><span class="sr-only"> (opens in a new tab)</span></a
          >
          for development updates and release announcements.
        </dd>
      </div>
      <div>
        <dt>is this against discord’s terms of service?</dt>
        <dd>
          yes. like other unofficial client mods, maycord would modify the discord app in ways that discord’s
          <a class="icon-link" href="https://discord.com/terms" rel="noreferrer" target="_blank"
            >terms of service<LinkIcon /><span class="sr-only"> (opens in a new tab)</span></a
          >
          do not allow, so using it could put your account at risk.
          <a href="/warning">read the full warning</a> before trying a mod.
        </dd>
      </div>
    </dl>
  </section>
</main>


<style>
  .frame {
    width: min(100%, calc(var(--frame) + var(--gutter) * 2));
    margin-inline: auto;
    padding-inline: var(--gutter);
  }

  .notices {
    display: grid;
    gap: 1.25rem;
  }

  .notice {
    padding: clamp(1.25rem, 3vw, 2rem);
    border-radius: 0.875rem;
    background: var(--warn);
    color: var(--warn-ink);
  }

  .notice h2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 0.5rem;
    font-size: 1.125rem;
    line-height: 1.3;
    letter-spacing: normal;
  }

  .notice h2 svg {
    flex: none;
    width: 1.25rem;
    height: 1.25rem;
  }

  .notice p {
    margin: 0;
    text-wrap: pretty;
  }

  .notice .more,
  .framework-card .more {
    margin-top: 1rem;
    font-weight: 600;
  }

  .notice a {
    color: inherit;
    text-decoration-thickness: 2px;
  }

  .notice a:focus-visible {
    outline-color: currentColor;
  }

  .hero {
    padding-top: 1.25rem;
  }

  .hero-card {
    display: grid;
    justify-items: center;
    padding: clamp(2.5rem, 7vw, 5rem) clamp(1rem, 5vw, 3rem);
    border-radius: 1rem;
    background: var(--hero);
    color: var(--hero-ink);
    text-align: center;
  }

  h1 {
    max-width: 24ch;
    margin: clamp(1.75rem, 5vw, 2.5rem) 0 0;
    font-size: clamp(1.5rem, 1.1rem + 1.6vw, 2rem);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.03em;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.75rem 1.5rem;
    margin: 1.5rem 0 0;
  }

  .button {
    padding: 0.65rem 1.1rem;
    border-radius: 0.6rem;
    background: var(--hero-ink);
    color: var(--hero);
    font-weight: 500;
    text-decoration: none;
    transition: transform 0.2s var(--ease-out);
  }

  .button:hover {
    transform: translateY(-1px);
  }

  .quiet {
    color: var(--hero-ink);
    font-weight: 500;
    border-bottom-color: oklch(0.1929 0.0087 334.62 / 0.4);
  }

  .quiet:hover {
    border-bottom-color: currentColor;
  }

  .hero-card :focus-visible {
    outline-color: var(--hero-ink);
  }

  h2 {
    margin: 0 0 1.5rem;
    font-size: 1.375rem;
    font-weight: 600;
    letter-spacing: -0.03em;
  }

  .framework {
    padding-top: 1.25rem;
  }

  .framework-card {
    display: grid;
    align-items: center;
    gap: 1.25rem 3rem;
    padding: clamp(1.5rem, 4vw, 3rem);
    border-radius: 1rem;
    background: oklch(0.87710 0.05777 242.13);
    color: oklch(0.24913 0.03445 246.14);
  }

  .framework-card h2 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0;
    font-size: clamp(1.375rem, 1.1rem + 1vw, 1.75rem);
  }

  .framework-mark {
    flex: none;
    width: 2.25rem;
    height: 2.25rem;
  }

  .framework-card p {
    margin: 0;
    text-wrap: pretty;
  }

  .framework-card a {
    color: inherit;
  }

  .framework-card :focus-visible {
    outline-color: currentColor;
  }

  .faq {
    padding-top: clamp(3rem, 8vw, 5.5rem);
  }

  dl {
    margin: 0;
  }

  .faq dl > div {
    display: grid;
    gap: 0.35rem 4rem;
    padding-block: 1.4rem;
    border-top: 1px solid var(--line);
  }

  dt {
    font-size: 1.0625rem;
    font-weight: 600;
    text-wrap: balance;
  }

  dd {
    margin: 0;
    color: var(--muted);
    text-wrap: pretty;
  }

  @media (min-width: 60rem) {
    .framework-card {
      grid-template-columns: 1fr 2fr;
    }

    .faq dl > div {
      padding-block: 1.6rem;
    }
  }

</style>
