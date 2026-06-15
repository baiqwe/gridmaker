import { websiteConfig } from '@/config/website';
import type { ToolPageConfig } from '@/lib/grid-maker/tool-pages';
import { getCanonicalUrl } from '@/lib/urls';

export function getToolJsonLd(page: ToolPageConfig) {
  const url = getCanonicalUrl(page.path);
  const app = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: page.h1,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    url,
    description: page.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: websiteConfig.metadata?.name ?? 'Grid Maker',
        item: getCanonicalUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.h1,
        item: url,
      },
    ],
  };

  return [app, faq, breadcrumb];
}
