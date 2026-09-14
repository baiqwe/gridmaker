// DO NOT DELETE THIS FILE!!!
// This file is a good smoke test to make sure the custom server entry is working
import handler from '@tanstack/react-start/server-entry';
import { getCanonicalPathRedirect } from '@/lib/grid-maker/canonical-path';

/**
 * TanStack Start server entry
 * https://github.com/backpine/tanstack-start-on-cloudflare/blob/main/src/server.ts
 */
console.log("[server-entry]: using custom server entry in 'src/server.ts'");

const blockedLegacyPrefixes = [
  '/admin',
  '/auth',
  '/blog',
  '/changelog',
  '/dashboard',
  '/pricing',
  '/roadmap',
  '/settings',
  '/waitlist',
];

function isBlockedLegacyPath(pathname: string) {
  return blockedLegacyPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export default {
  fetch(request: Request) {
    const url = new URL(request.url);
    const canonicalPath = getCanonicalPathRedirect(url.pathname);
    const productionHost = [
      'anygridmaker.com',
      'www.anygridmaker.com',
    ].includes(url.hostname);
    if (
      canonicalPath ||
      (productionHost &&
        (url.protocol === 'http:' || url.hostname.startsWith('www.')))
    ) {
      if (canonicalPath) url.pathname = canonicalPath;
      if (productionHost) {
        url.protocol = 'https:';
        url.hostname = 'anygridmaker.com';
      }
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === '/en' || url.pathname.startsWith('/en/')) {
      return new Response('Not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }

    if (isBlockedLegacyPath(url.pathname)) {
      return new Response('Not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }

    return handler.fetch(request, {
      context: {
        fromFetch: true,
      },
    });
  },
};
