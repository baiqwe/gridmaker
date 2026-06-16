import { getToolJsonLd } from '@/lib/grid-maker/json-ld';
import { getHreflangLinks } from '@/lib/grid-maker/i18n';
import type { ToolPageConfig } from '@/lib/grid-maker/tool-pages';
import { seo } from '@/lib/seo';
import { getCanonicalUrl } from '@/lib/urls';

export function toolRouteHead(page: ToolPageConfig) {
  const metadata = seo(page.path, {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
  });

  return {
    ...metadata,
    links: [
      ...metadata.links,
      ...getHreflangLinks(page.slug).map((link) => ({
        rel: 'alternate',
        hreflang: link.lang,
        href: getCanonicalUrl(link.path),
      })),
    ],
    scripts: getToolJsonLd(page).map((jsonLd) => ({
      type: 'application/ld+json',
      children: JSON.stringify(jsonLd),
    })),
  };
}
