(() => {
  const root = document.documentElement;
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // hide the stroke before first paint, then draw it once the first time it scrolls into view
  root.dataset.wordmarkMotion = '';

  document.addEventListener('DOMContentLoaded', () => {
    const mark = document.querySelector('[data-wordmark]');
    if (!mark) {
      delete root.dataset.wordmarkMotion;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        mark.dataset.wordmark = 'drawing';
      },
      { threshold: 0.35 }
    );
    observer.observe(mark);
  });
})();
