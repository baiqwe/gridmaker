import { createFileRoute } from '@tanstack/react-router';
import { getR2Bucket } from '@/storage/get-bucket';
import { ConfigurationError } from '@/storage/types';

/**
 * Serves a file from R2 by key. Used when STORAGE_PUBLIC_URL is not set (same-origin proxy).
 * Keys are unguessable (e.g. avatars/<uuid>.jpg); no auth required for read.
 */
export const Route = createFileRoute('/api/storage/file')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const key = url.searchParams.get('key');
        if (!key || key.includes('..')) {
          return new Response('Bad Request', { status: 400 });
        }

        try {
          const bucket = getR2Bucket();
          const object = await bucket.get(key);
          if (!object?.body) {
            return new Response('Not Found', { status: 404 });
          }

          const contentType =
            object.httpMetadata?.contentType ?? 'application/octet-stream';
          return new Response(object.body, {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=31536000, immutable',
            },
          });
        } catch (e) {
          if (e instanceof ConfigurationError) {
            return new Response('Storage not configured', { status: 503 });
          }
          throw e;
        }
      },
    },
  },
});
