import fs from 'node:fs';

const source = [
  'src/lib/grid-maker/tool-pages.ts',
  'src/lib/grid-maker/seo-content.ts',
]
  .map((file) => fs.readFileSync(file, 'utf8'))
  .join('\n');

const pages = [
  ['home', '/', 'grid maker'],
  ['instagram-grid-maker', '/instagram-grid-maker', 'instagram grid maker'],
  ['drawing-grid-maker', '/drawing-grid-maker', 'drawing grid maker'],
  ['crochet-grid-maker', '/crochet-grid-maker', 'crochet grid maker'],
  ['pixel-grid-maker', '/pixel-grid-maker', 'pixel grid maker'],
  ['add-grid-to-photo', '/add-grid-to-photo', 'add grid to photo'],
  [
    'cross-stitch-grid-maker',
    '/cross-stitch-grid-maker',
    'cross stitch grid maker',
  ],
];

function clean(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function sourceChunk(slug) {
  const marks = [`slug: '${slug}'`, `'${slug}': {`, `\n  ${slug}: {`];
  const chunks = [];
  for (const mark of marks) {
    let searchFrom = 0;
    while (searchFrom < source.length) {
      const start = source.indexOf(mark, searchFrom);
      if (start < 0) break;
      const braceStart = source.indexOf('{', start);
      if (braceStart < 0) {
        searchFrom = start + mark.length;
        continue;
      }

      let depth = 0;
      let quote = '';
      let escaped = false;
      let found = '';
      for (let index = braceStart; index < source.length; index += 1) {
        const char = source[index];
        if (escaped) {
          escaped = false;
          continue;
        }
        if (char === '\\') {
          escaped = true;
          continue;
        }
        if (quote) {
          if (char === quote) quote = '';
          continue;
        }
        if (char === '"' || char === "'" || char === '`') {
          quote = char;
          continue;
        }
        if (char === '{') depth += 1;
        if (char === '}') depth -= 1;
        if (depth === 0) {
          found = source.slice(start, index + 1);
          searchFrom = index + 1;
          break;
        }
      }
      if (!found) {
        searchFrom = start + mark.length;
      } else {
        chunks.push(found);
      }
    }
  }
  return chunks
    .sort((a, b) => b.length - a.length)
    .slice(0, 3)
    .join(' ');
}

function phraseCount(text, phrase) {
  const haystack = clean(text);
  const needle = clean(phrase);
  let count = 0;
  let position = 0;
  while (position >= 0) {
    position = haystack.indexOf(needle, position);
    if (position < 0) break;
    count += 1;
    position += needle.length;
  }
  return count;
}

console.log('Path | Keyword | Words | Hits | Density | Status');
console.log('--- | --- | ---: | ---: | ---: | ---');

for (const [slug, path, keyword] of pages) {
  const chunk = sourceChunk(slug)
    .replaceAll(slug, ' ')
    .replace(/keywords:\s*['"][^'"]+['"],?/g, ' ');
  const words = clean(chunk).split(' ').filter(Boolean).length;
  const hits = phraseCount(chunk, keyword);
  const keywordWords = clean(keyword).split(' ').length;
  const density = words ? (hits * keywordWords * 100) / words : 0;
  const status = density >= 0.6 && density <= 2.2 ? 'OK' : 'Review';
  console.log(
    `${path} | ${keyword} | ${words} | ${hits} | ${density.toFixed(2)}% | ${status}`
  );
}
