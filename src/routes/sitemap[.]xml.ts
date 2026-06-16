import { createFileRoute } from '@tanstack/react-router';
import {
  getHreflangLinks,
  getLocalizedToolPages,
  locales,
} from '@/lib/grid-maker/i18n';
import { getBaseUrl } from '@/lib/urls';
import { toolPages } from '@/lib/grid-maker/tool-pages';

/**
 * Dynamic sitemap.xml
 * https://tanstack.dev/start/latest/docs/framework/react/guide/seo#dynamic-sitemap
 */
export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const base = getBaseUrl().replace(/\/$/, '');
        const toolUrls: {
          path: string;
          slug?: string;
          changefreq?: string;
          priority?: string;
        }[] = [
          { path: '/', slug: 'home', changefreq: 'daily', priority: '1.0' },
          ...toolPages
            .filter((page) => page.path !== '/')
            .map((page) => ({
              path: page.path,
              slug: page.slug,
              changefreq: 'weekly',
              priority: '0.9',
            })),
          ...locales.flatMap((locale) =>
            getLocalizedToolPages(locale).map((page) => ({
              path: page.path,
              slug: page.slug,
              changefreq: page.slug === 'home' ? 'daily' : 'weekly',
              priority: page.slug === 'home' ? '0.8' : '0.7',
            }))
          ),
        ];

        const staticUrls: {
          path: string;
          changefreq?: string;
          priority?: string;
        }[] = [
          { path: '/about', changefreq: 'monthly' },
          { path: '/terms', changefreq: 'monthly' },
          { path: '/privacy', changefreq: 'monthly' },
          { path: '/cookie', changefreq: 'monthly' },
        ];

        const urlEntry = (
          path: string,
          opts?: {
            slug?: string;
            changefreq?: string;
            priority?: string;
            lastmod?: string;
          }
        ) => {
          const lastmod = opts?.lastmod
            ? `\n    <lastmod>${opts.lastmod}</lastmod>`
            : '';
          const changefreq = opts?.changefreq
            ? `\n    <changefreq>${opts.changefreq}</changefreq>`
            : '';
          const priority = opts?.priority
            ? `\n    <priority>${opts.priority}</priority>`
            : '';
          const alternateLinks = opts?.slug
            ? getHreflangLinks(opts.slug)
                .map(
                  (link) =>
                    `\n    <xhtml:link rel="alternate" hreflang="${link.lang}" href="${base}${link.path}" />`
                )
                .join('')
            : '';
          return `  <url>\n    <loc>${base}${path}</loc>${alternateLinks}${lastmod}${changefreq}${priority}\n  </url>`;
        };

        const toolPart = toolUrls
          .map((u) =>
            urlEntry(u.path, {
              slug: u.slug,
              changefreq: u.changefreq,
              priority: u.priority,
            })
          )
          .join('\n');

        const staticPart = staticUrls
          .map((u) =>
            urlEntry(u.path, { changefreq: u.changefreq, priority: u.priority })
          )
          .join('\n');

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${toolPart}
${staticPart}
</urlset>`;

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
          },
        });
      },
    },
  },
});
