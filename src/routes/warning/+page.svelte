<script lang="ts">
  import LinkIcon from '../../lib/LinkIcon.svelte';
</script>

<svelte:head>
  <title>before you install anything | maycord</title>
  <link rel="canonical" href="https://maycord.dev/warning" />
  <meta property="og:title" content="before you install anything | maycord" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://maycord.dev/warning" />
  <meta
    property="og:description"
    content="discord's rust client is not publicly available and maycord has no public download. how to treat early rewrite and injector claims, and keep your account safe."
  />
  <meta name="twitter:card" content="summary" />
  <meta
    name="description"
    content="discord's rust client is not publicly available and maycord has no public download. how to treat early rewrite and injector claims, and keep your account safe."
  />
</svelte:head>

<main class="frame">
  <article class="card" aria-labelledby="warning-title">
    <header>
      <h1 id="warning-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3 2.5 20h19L12 3Z" />
          <path d="M12 10v4M12 17h.01" />
        </svg>
        before you install anything
      </h1>
      <p class="lead">
        discord’s rust client is not publicly available yet, so maycord is still early research with no public
        injector or installer. <strong>maycord.dev is our only official website.</strong>
      </p>
      <p class="checked">last checked 8 november 2026</p>
    </header>

    <section aria-labelledby="custom-title">
      <h2 id="custom-title">a custom client is not the same as a mod</h2>
      <div class="body">
        <p>
          a standalone client is a separate app that talks to discord’s servers on its own, while a mod changes the
          official discord app from the inside. either way, a demo or a program written in rust does not prove that
          a project behaves like the official app or is safe for your account.
        </p>
        <p>
          discord’s
          <a class="icon-link" href="https://discord.com/terms" rel="noreferrer" target="_blank"
            >terms<LinkIcon /><span class="sr-only"> (opens in a new tab)</span></a
          >
          do not allow unauthorized software that modifies discord, including mods of the official app.
          self-bots, which automate a normal user account, are a separate issue. discord
          <a class="icon-link"
            href="https://support.discord.com/hc/en-us/articles/115002192352-Automated-user-accounts-self-bots-"
            rel="noreferrer"
            target="_blank"
            >prohibits them<LinkIcon /><span class="sr-only"> (opens in a new tab)</span></a
          >, and using one can lead to account termination.
        </p>
      </div>
    </section>

    <section aria-labelledby="claims-title">
      <h2 id="claims-title">be skeptical of all rewrite and injector claims</h2>
      <div class="body">
        <p>
          news about a new native client can bring fake projects and harmful downloads. familiar screenshots, low
          memory use, or the word rust do not make a download safe, and a project that claims to work with a client
          nobody can download yet should show real evidence.
        </p>
        <p>
          <strong>this includes maycord.</strong> do not trust our claims just because they appear on this website.
          check the evidence and only use software if you understand what it does and accept the risks.
        </p>
        <p>
          patching a native app can take a lot of work, and some ideas may not work at all. before you trust a
          project, look at who maintains it, whether its source is public, and how long it has been releasing
          updates. a good reputation helps, but it is not a guarantee.
        </p>
      </div>
    </section>

    <section aria-labelledby="protect-title">
      <h2 id="protect-title">protect your account and device</h2>
      <div class="body">
        <ul>
          <li>never give your discord password or account token to an app, website, or install script you can’t verify.</li>
          <li>don’t run a file just because a post calls it a client mod.</li>
          <li>
            check discord’s own announcements for client releases, and follow maycord only on maycord.dev, where
            there are no downloads yet.
          </li>
        </ul>
        <p>
          if you can’t verify a download, don’t run it. no feature is worth losing your account or putting your
          device at risk.
        </p>
      </div>
    </section>

    <footer class="end">
      <p class="sources">
        sources:
        <a class="icon-link" href="https://discord.com/terms" rel="noreferrer" target="_blank"
          >discord terms of service<LinkIcon /><span class="sr-only"
            > (opens in a new tab)</span
          ></a
        >
        <a class="icon-link"
          href="https://support.discord.com/hc/en-us/articles/115002192352-Automated-user-accounts-self-bots-"
          rel="noreferrer"
          target="_blank"
          >automated user accounts (self-bots)<LinkIcon /><span
            class="sr-only"> (opens in a new tab)</span
          ></a
        >
        <a class="icon-link" href="https://discord.com/safety/360044104071-Tips-against-spam-and-hacking" rel="noreferrer" target="_blank"
          >tips against spam and hacking<LinkIcon /><span class="sr-only"
            > (opens in a new tab)</span
          ></a
        >
      </p>
      <p><a class="home icon-link" href="/"><LinkIcon kind="left" />back to maycord.dev</a></p>
    </footer>
  </article>
</main>

<style>
  .frame {
    width: min(100%, calc(var(--frame) + var(--gutter) * 2));
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    padding: 0 var(--gutter) clamp(0.75rem, 2vw, 1.5rem);
  }

  .card {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: clamp(2rem, 5vw, 3.5rem);
    padding: clamp(1.25rem, 5vw, 4rem);
    border-radius: 1rem;
    background: var(--warn);
    color: var(--warn-ink);
  }

  .card a {
    color: inherit;
  }

  .card a:focus-visible {
    outline-color: currentColor;
  }

  .card ::selection {
    background: var(--warn-ink);
    color: var(--warn);
  }

  h1 {
    display: flex;
    align-items: center;
    gap: 0.35em;
    margin: 0;
    font-size: clamp(1.5rem, 1rem + 2.5vw, 2.25rem);
    font-weight: 650;
    line-height: 1.15;
    letter-spacing: -0.03em;
  }

  h1 svg {
    flex: none;
    width: 0.9em;
    height: 0.9em;
  }

  p,
  ul {
    margin: 0;
  }

  .lead {
    max-width: 46rem;
    margin-top: 1.25rem;
    font-size: clamp(1.125rem, 0.6vw + 1rem, 1.375rem);
    line-height: 1.45;
    text-wrap: pretty;
  }

  .checked {
    margin-top: 0.75rem;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    letter-spacing: 0;
  }

  section {
    display: grid;
    gap: 0.75rem 4rem;
    padding-top: clamp(1.5rem, 3vw, 2rem);
    border-top: 1px solid var(--warn-line);
  }

  h2 {
    margin: 0;
    font-size: clamp(1.25rem, 0.8vw + 1rem, 1.5rem);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.03em;
  }

  .body {
    display: grid;
    gap: 1rem;
    max-width: 40rem;
    text-wrap: pretty;
  }

  .body ul {
    display: grid;
    gap: 0.5rem;
    padding-inline-start: 1.15rem;
  }

  .end {
    display: grid;
    gap: 0.75rem;
    margin-top: auto;
    padding-top: clamp(1.5rem, 3vw, 2rem);
    border-top: 1px solid var(--warn-line);
    font-size: 0.875rem;
  }

  .sources {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1.25rem;
  }

  .home {
    font-weight: 600;
  }

  @media (min-width: 60rem) {
    section {
      grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    }
  }
</style>
