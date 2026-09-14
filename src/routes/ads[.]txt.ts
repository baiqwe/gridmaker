import { getAdsenseClient } from '@/lib/adsense';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/ads.txt')({
  server: {
    handlers: {
      GET: async () => {
        const client = getAdsenseClient();
        const publisher = client?.startsWith('ca-pub-')
          ? client.replace(/^ca-/, '')
          : '';
        const body = publisher
          ? `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`
          : '# Google AdSense publisher ID is not configured yet.\n';

        return new Response(body, {
          status: publisher ? 200 : 404,
          headers: {
            'Cache-Control': 'public, max-age=3600',
            'Content-Type': 'text/plain; charset=utf-8',
          },
        });
      },
    },
  },
});
