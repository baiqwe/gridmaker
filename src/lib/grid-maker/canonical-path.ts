import { getLocalizedToolPages, locales } from './i18n';
import { toolPages } from './tool-pages';

const canonicalPaths = new Set([
  ...toolPages.map((page) => page.path),
  ...locales.flatMap((locale) =>
    getLocalizedToolPages(locale).map((page) => page.path)
  ),
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/cookie',
]);

// Recover only known pages from historical relative-link mistakes.
export function getCanonicalPathRedirect(pathname: string): string | null {
  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  let candidate = decoded.replace(/\/+$/, '') || '/';
  candidate = candidate.replace(/^\/\$locale\/\$slug(?=\/)/, '');
  if (candidate === '/en') candidate = '/';
  else candidate = candidate.replace(/^\/en(?=\/)/, '');

  const segments = candidate.split('/').filter(Boolean);
  if (segments.length === 2 && segments[0] === segments[1]) {
    candidate = `/${segments[0]}`;
  }
  return candidate !== pathname && canonicalPaths.has(candidate)
    ? candidate
    : null;
}
