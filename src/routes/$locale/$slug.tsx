import { ToolPage } from '@/components/grid-maker/tool-page';
import { PixelPracticePage } from '@/components/grid-maker/pixel-practice-page';
import { practiceHead } from '@/lib/grid-maker/practice-head';
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
    if (params.locale === 'pt' && params.slug === 'pixel-art-facil')
      return practiceHead('pt');
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
  if (locale === 'pt' && slug === 'pixel-art-facil')
    return <PixelPracticePage key="pt" locale="pt" />;
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
      locale={locale}
      homePath={`/${locale}`}
      relatedPages={getLocalizedLandingToolPages(locale)}
    />
  );
}
