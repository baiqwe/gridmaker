import { ToolPage } from '@/components/grid-maker/tool-page';
import {
  getLocaleConfig,
  getLocalizedLandingToolPages,
  getLocalizedToolPage,
  getPageSlugByLocalizedSlug,
  isLocale,
} from '@/lib/grid-maker/i18n';
import { toolRouteHead } from '@/lib/grid-maker/route-head';
import { createFileRoute, notFound } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/$slug')({
  head: ({ params }) => {
    if (!isLocale(params.locale)) {
      throw notFound();
    }

    const pageSlug = getPageSlugByLocalizedSlug(params.locale, params.slug);
    if (!pageSlug) {
      throw notFound();
    }

    const page = getLocalizedToolPage(params.locale, pageSlug);
    if (!page) {
      throw notFound();
    }

    return toolRouteHead(page);
  },
  component: LocalizedToolPage,
});

function LocalizedToolPage() {
  const { locale, slug } = Route.useParams();
  if (!isLocale(locale)) {
    throw notFound();
  }

  const pageSlug = getPageSlugByLocalizedSlug(locale, slug);
  if (!pageSlug) {
    throw notFound();
  }

  const page = getLocalizedToolPage(locale, pageSlug);
  if (!page) {
    throw notFound();
  }

  const config = getLocaleConfig(locale);

  return (
    <ToolPage
      page={page}
      copy={config.pageCopy}
      homePath={`/${locale}`}
      relatedPages={getLocalizedLandingToolPages(locale)}
    />
  );
}
