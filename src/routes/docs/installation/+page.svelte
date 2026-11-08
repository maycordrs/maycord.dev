<section aria-labelledby="requirements">
  <h2 id="requirements">what you will need</h2>
  <p>
    each app and build needs a manually authored, verified adapter, so using gpui alone does not establish
    compatibility. see the <a href="/docs#overview">client overview</a> and
    <a href="/docs/status#discord">supported builds</a> before starting.
  </p>
</section>

<section aria-labelledby="injector">
  <h2 id="injector">the planned launch flow</h2>
  <p>
    the intended flow is to load maycord when the app starts, then apply your chosen
    <a href="/docs/parity">themes and plugins</a>.
  </p>
  <p>
    fpui’s loader launch path checks the executable’s build fingerprint before starting it. direct loading and
    wrapping rely on the <a href="/docs/parity#updates">in-process checks</a> instead.
  </p>
</section>

<section aria-labelledby="wrapper">
  <h2 id="wrapper">automatic loading</h2>
  <p>
    fpui’s macos wrapper prototype loads the agent when an app opens normally. it changes the app bundle’s
    settings and re-signs the bundle, replacing the original vendor signature.
  </p>
</section>

<section aria-labelledby="removing">
  <h2 id="removing">removing a wrap</h2>
  <p>
    unwrapping clears the loader settings but cannot restore the signature replaced by
    <a href="#wrapper">wrapping</a>. an official reinstall or update is needed to recover it.
  </p>
</section>

<section aria-labelledby="offline">
  <h2 id="offline">what changes on disk</h2>
  <p>
    live patches change a running app’s memory. offline byte patches modify a copy of the executable on disk,
    which is different from changing the bundle settings through the wrapper.
  </p>
  <p>
    the choice of method for maycord’s installer is part of the
    <a href="/docs/status#remaining">remaining release work</a>.
  </p>
</section>
