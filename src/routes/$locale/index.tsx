import { ToolPage } from '@/components/grid-maker/tool-page';
import {
  getLocaleConfig,
  getLocalizedLandingToolPages,
  getLocalizedToolPage,
  isLocale,
} from '@/lib/grid-maker/i18n';
import { toolRouteHead } from '@/lib/grid-maker/route-head';
import { createFileRoute, notFound } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/')({
  head: ({ params }) => {
    if (!isLocale(params.locale)) {
      throw notFound();
    }

    const page = getLocalizedToolPage(params.locale, 'home');
    if (!page) {
      throw notFound();
    }

    return toolRouteHead(page);
  },
  component: LocalizedHomePage,
});

function LocalizedHomePage() {
  const { locale } = Route.useParams();
  if (!isLocale(locale)) {
    throw notFound();
  }

  const page = getLocalizedToolPage(locale, 'home');
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
