import { SimpleLegalPage } from '@/components/page/simple-legal-page';
import { websiteConfig } from '@/config/website';
import { seo } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';

const title = 'Cookie Policy';
const description =
  'Cookie, analytics, and advertising information for Grid Maker, a browser-based image grid tool.';

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
          title: 'Advertising cookies',
          body: 'If Google AdSense or another advertising partner is enabled, ads may use cookies or similar technologies to deliver and measure advertising. Uploaded image files are still processed in the browser and are not sent to advertising partners by this tool.',
        },
        {
          title: 'Managing cookies',
          body: 'Most browsers let you block, delete, or limit cookies. You can also adjust Google ad personalization settings separately. Some analytics or advertising measurements may stop working, but the main image grid features remain available.',
        },
      ]}
    />
  );
}
