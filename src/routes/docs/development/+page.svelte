<script lang="ts">
  import LinkIcon from '../../../lib/LinkIcon.svelte';
</script>

<section aria-labelledby="scope">
  <h2 id="scope">where to contribute</h2>
  <p>
    use the <a href="/docs#fpui">project split</a> to route a contribution:
  </p>
  <ul>
    <li>send application-specific integration changes to maycord.</li>
    <li>send reusable runtime and adapter-tooling changes to fpui.</li>
  </ul>
</section>

<section aria-labelledby="client">
  <h2 id="client">working on the client</h2>
  <p>
    <a class="icon-link" href="https://discord.gg/pFBbwyX2JK" rel="noreferrer" target="_blank">join the discord<LinkIcon /><span class="sr-only"> (opens in a new tab)</span></a>
    for the current development workflow, source access, and help choosing a piece of work.
    fpui’s engine setup and api guides are maintained with the framework.
  </p>
</section>

<section aria-labelledby="website">
  <h2 id="website">working on this website</h2>
  <p>
    use a checkout of the
    <a class="icon-link" href="https://github.com/maycordrs/maycord.dev" rel="noreferrer" target="_blank">website repository<LinkIcon /><span class="sr-only"> (opens in a new tab)</span></a>
    with node.js 22 and npm. the site is a separate sveltekit project, and these commands build it.
  </p>
  <ol>
    <li>run <code>npm ci</code> to install dependencies from the lockfile.</li>
    <li>run <code>npm run dev</code> to start the local preview.</li>
    <li>run <code>npm run check</code> to check types and svelte diagnostics.</li>
    <li>run <code>npm run build</code> to verify the static production build.</li>
  </ol>
</section>

<section aria-labelledby="contributing">
  <h2 id="contributing">sharing work</h2>
  <p>
    when discussing a change or reporting a problem, include what you tried, what you expected, and what happened.
    for native app work, name the test app, its build, and the operating system so someone else can reproduce it.
    label the work as a framework experiment, a website change, or a tested client integration.
  </p>
</section>
