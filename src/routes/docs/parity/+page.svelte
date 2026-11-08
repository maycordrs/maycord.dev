<section aria-labelledby="scope">
  <h2 id="scope">client background</h2>
  <p id="target">
    the <a href="/docs#overview">client overview</a> describes the application these integrations target.
  </p>
</section>

<section aria-labelledby="plugins">
  <h2 id="plugins">plugins</h2>
  <p>
    plugins use fpui’s sandboxed webassembly runtime. the permissions exposed by the framework limit what a plugin
    can access. porting an existing plugin requires an implementation for that runtime and the client hooks it needs.
  </p>
</section>

<section aria-labelledby="themes">
  <h2 id="themes">themes</h2>
  <p>
    fpui themes assign colors to named roles, which an adapter connects to the client’s interface. an existing
    discord css theme cannot be loaded unchanged.
  </p>
</section>

<section aria-labelledby="updates">
  <h2 id="updates">client updates</h2>
  <p>
    an app update can move or change the code an adapter targets. fpui checks the expected code before writing
    and skips changes that no longer match, so a customization is not guaranteed to survive every update.
    check <a href="/docs/status#discord">supported builds</a> before changing versions.
  </p>
  <p id="gaps">
    unfinished features and release milestones are tracked in the <a href="/docs/status#remaining">roadmap</a>.
  </p>
</section>
