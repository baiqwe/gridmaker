// DO NOT DELETE THIS FILE!!!
// This file is a good smoke test to make sure the custom server entry is working
import handler from '@tanstack/react-start/server-entry';
import { toolPages } from '@/lib/grid-maker/tool-pages';

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

const englishRedirectPaths = new Set(toolPages.map((page) => page.path));

function getExplicitEnglishRedirect(pathname: string) {
  if (pathname === '/en' || pathname === '/en/') {
    return '/';
  }

  if (!pathname.startsWith('/en/')) {
    return null;
  }

  const pathWithoutLocale = pathname.replace(/^\/en(?=\/)/, '');
  if (englishRedirectPaths.has(pathWithoutLocale)) {
    return pathWithoutLocale;
  }

  return null;
}

export default {
  fetch(request: Request) {
    const url = new URL(request.url);
    const englishRedirect = getExplicitEnglishRedirect(url.pathname);
    if (englishRedirect) {
      url.pathname = englishRedirect;
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
