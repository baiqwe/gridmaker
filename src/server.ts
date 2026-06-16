// DO NOT DELETE THIS FILE!!!
// This file is a good smoke test to make sure the custom server entry is working
import handler from '@tanstack/react-start/server-entry';

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
