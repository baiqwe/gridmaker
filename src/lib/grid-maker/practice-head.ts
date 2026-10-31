import {
  practiceCopy,
  practicePaths,
  type PracticeLocale,
} from './pixel-practice';
import { seo } from '@/lib/seo';
import { getCanonicalUrl } from '@/lib/urls';

export function practiceHead(locale: PracticeLocale) {
  const c = practiceCopy[locale],
    path = practicePaths[locale];
  const base = seo(path, { title: c.title, description: c.description });
  return {
    ...base,
    links: [
      ...base.links,
      ...[
        { hreflang: 'en', path: practicePaths.en },
        { hreflang: 'pt', path: practicePaths.pt },
        { hreflang: 'x-default', path: practicePaths.en },
      ].map(({ hreflang, path }) => ({
        rel: 'alternate',
        hreflang,
        href: getCanonicalUrl(path),
      })),
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: c.home,
              item: getCanonicalUrl(locale === 'pt' ? '/pt' : '/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: c.h1,
              item: getCanonicalUrl(path),
            },
          ],
        }),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: c.h1,
          url: getCanonicalUrl(path),
          description: c.description,
          inLanguage: locale,
          applicationCategory: 'DesignApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }),
      },
    ],
  };
}
