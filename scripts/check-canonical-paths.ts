import assert from 'node:assert/strict';
import { getCanonicalPathRedirect } from '../src/lib/grid-maker/canonical-path';
import { getLocalizedToolPages, locales } from '../src/lib/grid-maker/i18n';
import { toolPages } from '../src/lib/grid-maker/tool-pages';

const cases: Array<[string, string | null]> = [
  ['/drawing-grid-maker/drawing-grid-maker', '/drawing-grid-maker'],
  [
    '/cross-stitch-grid-maker/cross-stitch-grid-maker',
    '/cross-stitch-grid-maker',
  ],
  ['/crochet-grid-maker/crochet-grid-maker', '/crochet-grid-maker'],
  ['/$locale/$slug/es/cuadricula-pixel', '/es/cuadricula-pixel'],
  ['/%24locale/%24slug/es/cuadricula-pixel', '/es/cuadricula-pixel'],
  ['/en/pixel-grid-maker/', '/pixel-grid-maker'],
  ['/en/', '/'],
  ['/en/easy-pixel-art-grid/', '/easy-pixel-art-grid'],
  ['/pt/pixel-art-facil/', '/pt/pixel-art-facil'],
  ['/easy-pixel-art-grid', null],
  ['/pt/pixel-art-facil', null],
  ['/en/unknown', null],
  ['/unknown/unknown', null],
  ['/%invalid', null],
  ['//evil.example/', null],
];
for (const [source, expected] of cases) {
  assert.equal(getCanonicalPathRedirect(source), expected, source);
}
const pages = [...toolPages, ...locales.flatMap(getLocalizedToolPages)];
assert.equal(new Set(pages.map((page) => page.path)).size, pages.length);
for (const page of pages) {
  assert.equal(getCanonicalPathRedirect(page.path), null, page.path);
  if (page.path !== '/') {
    assert.equal(getCanonicalPathRedirect(`${page.path}/`), page.path);
  }
}
console.log(
  `Passed ${cases.length} regression cases and ${pages.length} canonical page checks.`
);
