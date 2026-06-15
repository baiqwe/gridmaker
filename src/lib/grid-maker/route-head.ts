import { getToolJsonLd } from '@/lib/grid-maker/json-ld';
import type { ToolPageConfig } from '@/lib/grid-maker/tool-pages';
import { seo } from '@/lib/seo';

export function toolRouteHead(page: ToolPageConfig) {
  return {
    ...seo(page.path, {
      title: page.title,
      description: page.description,
      keywords: page.keywords,
    }),
    scripts: getToolJsonLd(page).map((jsonLd) => ({
      type: 'application/ld+json',
      children: JSON.stringify(jsonLd),
    })),
  };
}
