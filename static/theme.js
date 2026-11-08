(() => {
  const key = 'maycord-theme';
  const themes = ['system', 'light', 'dark'];
  const root = document.documentElement;
  let theme = 'system';

  try {
    const saved = localStorage.getItem(key);
    if (themes.includes(saved)) theme = saved;
  } catch {}

  root.dataset.theme = theme;

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('site-theme');
    if (!button) return;

    const next = () => themes[(themes.indexOf(theme) + 1) % themes.length];
    const sync = () => {
      const label = `site theme: ${theme}. switch to ${next()}.`;
      root.dataset.theme = theme;
      button.dataset.theme = theme;
      button.setAttribute('aria-label', label);
      button.title = label;
    };

    sync();
    button.disabled = false;
    button.parentElement.hidden = false;

    button.addEventListener('click', () => {
      theme = next();
      sync();
      try {
        localStorage.setItem(key, theme);
      } catch {}
    });
  });
})();
