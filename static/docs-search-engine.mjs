const normalize = (text) => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const words = (text) => text.match(/[a-z0-9]+(?:[_-][a-z0-9]+)*/g) || [];

// Bounded optimal-string-alignment distance also catches swapped adjacent letters.
function distance(left, right, limit) {
  if (Math.abs(left.length - right.length) > limit) return limit + 1;
  let previous = Array.from({ length: right.length + 1 }, (_, i) => i);
  let beforePrevious;
  for (let i = 1; i <= left.length; i++) {
    const row = [i];
    for (let j = 1; j <= right.length; j++) {
      row[j] = Math.min(
        row[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + Number(left[i - 1] !== right[j - 1])
      );
      if (i > 1 && j > 1 && left[i - 1] === right[j - 2] && left[i - 2] === right[j - 1]) {
        row[j] = Math.min(row[j], beforePrevious[j - 2] + 1);
      }
    }
    if (Math.min(...row) > limit) return limit + 1;
    beforePrevious = previous;
    previous = row;
  }
  return previous[right.length];
}

function field(text) {
  const normalized = normalize(text);
  const tokens = [...new Set(words(normalized))];
  return { text: normalized, tokens, exact: new Set(tokens) };
}

export function indexDocuments(documents) {
  return documents.map((document, order) => ({
    ...document,
    order,
    fields: [
      [field(document.title), 100],
      [field(document.pageTitle), 45],
      [field(document.text), 15]
    ]
  }));
}

function matchTerm(term, indexed, weight) {
  if (indexed.exact.has(term)) return { score: weight, word: term };
  const prefix = indexed.tokens.find((word) => word.startsWith(term));
  if (prefix) return { score: weight * 0.85, word: prefix };
  const substring = term.length >= 3 && indexed.tokens.find((word) => word.includes(term));
  if (substring) return { score: weight * 0.7, word: substring };
  // Long identifiers still get exact/prefix matching, without unbounded fuzzy work.
  const limit = term.length >= 8 ? 2 : term.length >= 4 ? 1 : 0;
  if (!limit || term.length > 32) return null;
  let best;
  for (const word of indexed.tokens) {
    if (word.length > 32 || Math.abs(word.length - term.length) > limit) continue;
    const edits = distance(term, word, limit);
    if (edits <= limit && (!best || edits < best.edits)) best = { word, edits };
  }
  return best ? { score: weight * (0.6 - best.edits * 0.1), word: best.word } : null;
}

function excerpt(text, matches) {
  const clean = text.replace(/\s+/g, ' ').trim();
  const normalized = normalize(clean);
  const positions = matches.map((word) => normalized.indexOf(word)).filter((at) => at >= 0);
  const at = positions.length ? Math.min(...positions) : 0;
  let start = Math.max(0, at - 55);
  if (start > 0) {
    const space = clean.indexOf(' ', start);
    if (space >= 0 && space < at) start = space + 1;
  }
  const end = Math.min(clean.length, start + 180);
  return (start ? '…' : '') + clean.slice(start, end) + (end < clean.length ? '…' : '');
}

export function searchDocuments(index, query) {
  const normalized = normalize(query.slice(0, 160)).replace(/\s+/g, ' ').trim();
  if (!normalized) return [];

  const terms = [...new Set(words(normalized))];
  const results = [];
  for (const entry of index) {
    let score = 0;
    const matches = [];
    let complete = true;
    for (const term of terms) {
      let best;
      for (const [indexed, weight] of entry.fields) {
        const match = matchTerm(term, indexed, weight);
        if (match && (!best || match.score > best.score)) best = match;
      }
      if (!best) { complete = false; break; }
      score += best.score;
      matches.push(best.word);
    }
    if (!complete) continue;
    if (!terms.length) {
      if (!entry.fields[2][0].text.includes(normalized)) continue;
      matches.push(normalized);
      score = 5;
    }
    if (entry.fields[0][0].text === normalized) score += 150;
    else if (entry.fields[0][0].text.includes(normalized)) score += 80;
    if (entry.fields[2][0].text.includes(normalized)) score += 25;
    results.push({
      ...entry, score, matches: [...new Set(matches)],
      excerpt: excerpt(entry.text, matches)
    });
  }
  return results.sort((a, b) => b.score - a.score || a.order - b.order).slice(0, 10);
}
