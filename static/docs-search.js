import { indexDocuments, searchDocuments } from './docs-search-engine.mjs';

const dialog = document.getElementById('docs-search-dialog');
const trigger = document.getElementById('docs-search-trigger');

if (dialog && trigger && typeof dialog.showModal === 'function') {
  const input = document.getElementById('docs-search-input');
  const list = document.getElementById('docs-search-results');
  const status = document.getElementById('docs-search-status');
  const empty = document.getElementById('docs-search-empty');
  const retry = document.getElementById('docs-search-retry');
  const template = document.getElementById('docs-search-result-template');
  const pages = JSON.parse(dialog.dataset.searchPages).filter((page) => {
    const url = new URL(page.href, location.origin);
    return url.origin === location.origin && (url.pathname === '/' || url.pathname === '/warning' || /^\/docs(?:\/|$)/.test(url.pathname));
  });
  const pageDocuments = pages.map((page) => ({
    href: page.href, title: page.title, pageTitle: page.title, text: page.lede, kind: 'page'
  }));

  let index = indexDocuments(pageDocuments);
  let rows = [];
  let selected = -1;
  let displayedQuery = '';
  let complete = false;
  let loading = false;
  let failures = 0;
  let pending;
  let timer;
  let returnFocus;
  let previousOverflow = '';
  let backdropDown = false;

  function highlight(element, text, matches) {
    element.replaceChildren();
    const escaped = matches.filter(Boolean).map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (!escaped.length) {
      element.textContent = text;
      return;
    }
    const pattern = new RegExp(escaped.join('|'), 'gi');
    let start = 0;
    for (const match of text.matchAll(pattern)) {
      element.append(document.createTextNode(text.slice(start, match.index)));
      const mark = document.createElement('mark');
      mark.textContent = match[0];
      element.append(mark);
      start = match.index + match[0].length;
    }
    element.append(document.createTextNode(text.slice(start)));
  }

  function select(position, scroll = false) {
    selected = rows.length ? (position + rows.length) % rows.length : -1;
    rows.forEach((row, i) => row.setAttribute('aria-selected', String(i === selected)));
    if (selected < 0) input.removeAttribute('aria-activedescendant');
    else {
      input.setAttribute('aria-activedescendant', rows[selected].id);
      if (scroll) rows[selected].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  function render() {
    if (!dialog.open) return;
    const previous = displayedQuery === input.value ? rows[selected]?.getAttribute('href') : null;
    const results = searchDocuments(index, input.value);
    displayedQuery = input.value;
    const fragment = document.createDocumentFragment();
    rows = results.map((result, i) => {
      const row = template.content.firstElementChild.cloneNode(true);
      row.id = 'docs-search-result-' + i;
      row.href = result.href;
      row.setAttribute('aria-label', result.kind === 'page' ? result.title : result.title + ', ' + result.pageTitle);
      row.querySelector('[data-search-context]').textContent = result.kind === 'page' ? 'documentation' : result.pageTitle;
      highlight(row.querySelector('[data-search-title]'), result.title, result.matches);
      highlight(row.querySelector('[data-search-excerpt]'), result.excerpt, result.matches);
      fragment.append(row);
      return row;
    });
    list.replaceChildren(fragment);
    const retained = rows.findIndex((row) => row.getAttribute('href') === previous);
    select(retained >= 0 ? retained : 0);
    list.setAttribute('aria-busy', String(loading));
    input.setAttribute('aria-expanded', String(rows.length > 0));
    dialog.toggleAttribute('data-has-query', Boolean(input.value.trim()));
    dialog.toggleAttribute('data-loading', loading);
    empty.hidden = rows.length > 0 || loading || !input.value.trim();
    retry.hidden = !failures || loading;
    if (loading) status.textContent = 'loading pages…';
    else if (failures) status.textContent = 'some pages could not load. showing available results.';
    else if (!input.value.trim()) status.textContent = 'search';
    else status.textContent = rows.length ? rows.length + (rows.length === 1 ? ' result.' : ' results.') : 'no results found.';
  }

  async function readPage(page) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(page.href, { signal: controller.signal });
      if (!response.ok) throw new Error('documentation unavailable');
      const html = await response.text();
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const prose = parsed.querySelector('.prose');
      const content = prose || parsed.querySelector('main');
      if (!content) throw new Error('page content missing');
      content.querySelectorAll('script, style, template, [hidden]').forEach((element) => element.remove());
      if (!prose) return [{
        href: page.href, title: page.title, pageTitle: page.title,
        text: content.textContent.replace(/\s+/g, ' ').trim(), kind: 'page'
      }];
      return [...prose.querySelectorAll('section')].flatMap((section) => {
        const heading = section.querySelector('h2[id]');
        if (!heading) return [];
        const body = section.cloneNode(true);
        body.querySelector('h2')?.remove();
        return [{
          href: page.href + '#' + encodeURIComponent(heading.id),
          title: heading.textContent.trim(),
          pageTitle: page.title,
          text: body.textContent.replace(/\s+/g, ' ').trim(),
          kind: 'section'
        }];
      });
    } finally {
      clearTimeout(timeout);
    }
  }

  function loadIndex() {
    if (pending || complete) return;
    loading = true;
    render();
    pending = Promise.allSettled(pages.map(readPage)).then((results) => {
      const documents = new Map(pageDocuments.map((entry) => [entry.href, entry]));
      failures = 0;
      for (const result of results) {
        if (result.status === 'fulfilled') {
          for (const entry of result.value) documents.set(entry.href, entry);
        } else failures++;
      }
      index = indexDocuments([...documents.values()]);
      complete = failures === 0;
      loading = false;
      pending = undefined;
      render();
    });
  }

  function open(opener = document.activeElement) {
    if (dialog.open) {
      dialog.close();
      return;
    }
    returnFocus = opener instanceof HTMLElement && opener !== document.body ? opener : trigger;
    previousOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
    trigger.setAttribute('aria-expanded', 'true');
    input.focus({ preventScroll: true });
    input.select();
    if (!complete) loadIndex();
    else render();
  }

  function outside(event) {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
  }

  trigger.addEventListener('click', () => open(trigger));
  document.getElementById('docs-search-close').addEventListener('click', () => dialog.close());
  retry.addEventListener('click', () => {
    loadIndex();
    input.focus({ preventScroll: true });
  });
  dialog.addEventListener('close', () => {
    clearTimeout(timer);
    document.documentElement.style.overflow = previousOverflow;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    trigger.setAttribute('aria-expanded', 'false');
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  });
  dialog.addEventListener('pointerdown', (event) => {
    backdropDown = event.target === dialog && outside(event);
  });
  dialog.addEventListener('click', (event) => {
    if (backdropDown && event.target === dialog && outside(event)) dialog.close();
    backdropDown = false;
  });
  list.addEventListener('pointermove', (event) => {
    const row = event.target.closest('.search-result');
    const position = rows.indexOf(row);
    if (position >= 0 && position !== selected) select(position);
  });
  list.addEventListener('click', (event) => {
    if (event.target.closest('.search-result')) dialog.close();
  });
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(render, 75);
  });
  input.addEventListener('keydown', (event) => {
    if (event.isComposing) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      dialog.close();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (displayedQuery !== input.value) render();
      select(selected + (event.key === 'ArrowDown' ? 1 : -1), true);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      clearTimeout(timer);
      if (displayedQuery !== input.value) render();
      rows[selected]?.click();
    }
  });
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      open();
    }
  });

  const shortcut = trigger.querySelector('[data-search-shortcut]');
  if (shortcut) shortcut.textContent = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘ k' : 'ctrl k';
  trigger.disabled = false;
  trigger.hidden = false;
}
