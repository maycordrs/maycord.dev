<section aria-labelledby="discord">
  <h2 id="discord">availability and supported clients</h2>
  <p>
    discord’s native rust client had not been publicly released when we last checked on 8 november 2026.
    maycord has no public download, tested discord adapter, or supported build list yet. today’s discord app
    is not supported. follow discord’s own announcements for release news.
  </p>
  <p>
    framework experiments do not establish discord compatibility. loading, theme coverage, and plugins must be
    tested against discord’s own client.
  </p>
</section>

<section aria-labelledby="demonstrated">
  <h2 id="demonstrated">what fpui has demonstrated</h2>
  <p>
    fpui research on controlled native apps has demonstrated live color changes, sandboxed plugins, event hooks,
    and checked changes to behavior and interface text. macos on apple silicon is the demonstrated platform.
    those tests also loaded the agent when the test app started.
  </p>
  <p>
    discovery and offline text patching have also been exercised on the shipped zed editor. that is narrower
    evidence than a complete, supported integration. the overlay prototype is a separate companion window,
    not a new element inserted into another app’s own interface.
  </p>
</section>

<section aria-labelledby="remaining">
  <h2 id="remaining">what remains for maycord</h2>
  <ul>
    <li>test an adapter against a public release of discord’s native client.</li>
    <li>connect themes and plugins to discord-specific interface elements and events.</li>
    <li>build a usable way to manage customizations and permissions.</li>
    <li>publish tested installation, update, and removal steps.</li>
    <li>verify platform support, including end-to-end testing on windows and linux.</li>
  </ul>
</section>

<section aria-labelledby="license">
  <h2 id="license">licensing</h2>
  <p>
    fpui’s engine is licensed under <code>GPL-3.0-or-later</code>. see the <a href="#site-license">website license</a>
    for this site.
  </p>
</section>
