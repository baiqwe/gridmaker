import { SimpleLegalPage } from '@/components/page/simple-legal-page';
import { websiteConfig } from '@/config/website';
import { seo } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';

const title = 'Cookie Policy';
const description =
  'Cookie and analytics information for Grid Maker, a browser-based image grid tool.';

export const Route = createFileRoute('/(legals)/cookie')({
  head: () =>
    seo('/cookie', {
      title: `${title} | ${websiteConfig.metadata?.name}`,
      description,
    }),
  component: CookiePage,
});

function CookiePage() {
  return (
    <SimpleLegalPage
      title={title}
      description={description}
      sections={[
        {
          title: 'Essential storage',
          body: 'The site may use essential browser storage for theme preferences or basic functionality. Uploaded image files are not stored by the server.',
        },
        {
          title: 'Analytics cookies',
          body: 'If analytics are enabled, they are used to understand aggregate traffic and improve the product. You can control cookie behavior in your browser settings.',
        },
        {
          title: 'Advertising',
          body: 'The MVP does not require advertising cookies. If ads are added later, this page should be updated before launch.',
        },
      ]}
    />
  );
}
