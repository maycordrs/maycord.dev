<!-- one continuous hand-drawn stroke: m a y c o r d, then the d's exit swings back under the word, through the y, and ends under the m -->
<svg class="maycord-wordmark" data-wordmark viewBox="-14 -62 484 196" aria-hidden="true" focusable="false">
  <path
    pathLength="1"
    d="M -6 44 C 6 38 20 22 26 4 C 27 14 24 30 22 41 C 24 22 32 0 46 1 C 58 3 56 26 54 41 C 56 22 64 0 78 1 C 92 3 74 40 96 40
      C 104 40 106 10 120 2 C 128 -2 138 0 142 4 C 132 -4 108 4 108 24 C 108 38 118 44 128 40 C 136 36 142 20 144 2 C 142 18 138 40 156 40
      C 162 38 166 20 168 2 C 166 22 166 40 180 40 C 192 40 198 20 200 2 C 198 36 200 80 190 106 C 182 124 138 124 138 102 C 138 78 180 56 214 40
      C 218 30 220 4 236 1 C 242 0 246 2 248 6 C 240 -2 220 4 220 24 C 220 38 230 44 242 40
      C 252 36 266 4 284 2 C 296 1 302 12 301 22 C 300 34 290 42 280 41 C 270 40 266 28 268 20 C 270 10 278 2 284 2 C 292 2 298 7 306 7 C 312 7 316 4 320 2
      C 322 0 324 -4 326 -6 C 328 0 336 4 342 2 C 342 16 338 40 356 40
      C 362 40 364 10 378 2 C 386 -2 396 0 400 4 C 390 -4 368 4 368 24 C 368 38 378 44 388 40 C 396 36 402 20 404 2 C 408 -18 420 -44 412 -50 C 404 -56 388 -44 391 -26 C 394 -4 398 30 406 40 C 410 44 420 42 426 38
      C 446 30 464 52 452 66 C 436 82 300 78 200 76 C 120 74 40 72 -4 64"
  />
</svg>

<style>
  .maycord-wordmark {
    display: block;
    width: min(100%, 34rem);
    height: auto;
    overflow: visible;
  }

  path {
    fill: none;
    stroke: currentColor;
    stroke-width: 8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* wordmark.js sets the root flag before first paint only when motion is allowed, so without js the mark is fully drawn */
  :global(:root[data-wordmark-motion] .maycord-wordmark path) {
    stroke-dasharray: 1 2;
    stroke-dashoffset: 1.02;
  }

  :global(:root[data-wordmark-motion] .maycord-wordmark[data-wordmark='drawing'] path) {
    animation: maycord-write 3.6s cubic-bezier(0.42, 0, 0.32, 1) 0.2s forwards;
  }

  @keyframes -global-maycord-write {
    to {
      stroke-dashoffset: 0;
    }
  }

  /* covers a preference change after load, since the global reduce rule only shortens duration, not the delay */
  @media (prefers-reduced-motion: reduce) {
    :global(:root[data-wordmark-motion] .maycord-wordmark path) {
      stroke-dashoffset: 0;
      animation: none;
    }
  }
</style>
