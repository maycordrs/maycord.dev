import assert from 'node:assert/strict';
import test from 'node:test';
import { indexDocuments, searchDocuments } from '../static/docs-search-engine.mjs';

const documents = [
  { href: '/docs/plugins', title: 'creating a plugin', pageTitle: 'creating a plugin', text: 'build webassembly plugins.', kind: 'page' },
  { href: '/docs/plugins#permissions', title: 'permissions and consent', pageTitle: 'creating a plugin', text: 'a plugin declares capabilities. access must be approved before its hooks run.', kind: 'section' },
  { href: '/docs/reference#runtime-support', title: 'runtime support', pageTitle: 'api reference', text: 'BytePatchSite changes the binary offline. ReturnSite and ArgSite run live.', kind: 'section' },
  { href: '/docs/updates#monitor', title: 'the patch monitor', pageTitle: 'staying current', text: 'maycord-monitor reports whether expected bytes still match. it does not apply patches.', kind: 'section' },
  { href: '/docs/updates#generating', title: 'generating signatures', pageTitle: 'staying current', text: 'maycord-discover --force-return generates an adapter entry from a symbol.', kind: 'section' },
  { href: '/docs/themes', title: 'creating a theme', pageTitle: 'creating a theme', text: 'an accent color can be written as #f2a3c0.', kind: 'page' },
  { href: '/warning', title: 'warning', pageTitle: 'warning', text: 'be skeptical of unverified download claims and risks to your account.', kind: 'page' }
];
const index = indexDocuments(documents);

test('exact headings rank above incidental body matches', () => {
  assert.equal(searchDocuments(index, 'permissions')[0].href, '/docs/plugins#permissions');
  assert.equal(searchDocuments(index, 'patch monitor')[0].href, '/docs/updates#monitor');
});

test('full body text and code identifiers are searchable', () => {
  assert.equal(searchDocuments(index, 'approved before')[0].href, '/docs/plugins#permissions');
  assert.equal(searchDocuments(index, 'BYTEPATCHSITE')[0].href, '/docs/reference#runtime-support');
  assert.equal(searchDocuments(index, '--force-return')[0].href, '/docs/updates#generating');
  assert.equal(searchDocuments(index, '#f2a3c0')[0].href, '/docs/themes');
});

test('fuzzy matching handles omitted and swapped letters', () => {
  assert.equal(searchDocuments(index, 'permissons')[0].href, '/docs/plugins#permissions');
  assert.equal(searchDocuments(index, 'plguin')[0].href, '/docs/plugins');
  assert.equal(searchDocuments(index, 'moniter')[0].href, '/docs/updates#monitor');
  assert.equal(searchDocuments(index, 'webasembly')[0].href, '/docs/plugins');
});

test('all query terms must match, even if entered out of order', () => {
  assert.equal(searchDocuments(index, 'consent permissions')[0].href, '/docs/plugins#permissions');
  assert.deepEqual(searchDocuments(index, 'permissions nonexistentxyz'), []);
});

test('empty and unrelated queries produce no results', () => {
  assert.deepEqual(searchDocuments(index, ''), []);
  assert.deepEqual(searchDocuments(index, '   '), []);
  assert.deepEqual(searchDocuments(index, 'qzjxvqqqq'), []);
  assert.deepEqual(searchDocuments(index, '<img src=x onerror=alert(1)>'), []);
});

test('result excerpts expose the matching body passage', () => {
  const result = searchDocuments(index, 'unverified download')[0];
  assert.equal(result.href, '/warning');
  assert.match(result.excerpt, /unverified download/);
  assert.ok(result.matches.includes('unverified'));
});
