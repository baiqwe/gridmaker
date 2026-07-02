import { SimpleLegalPage } from '@/components/page/simple-legal-page';
import { websiteConfig } from '@/config/website';
import { seo } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';

const title = 'Privacy Policy';
const description =
  'Grid Maker processes images in your browser and explains how analytics and advertising partners may use limited site data.';

export const Route = createFileRoute('/(legals)/privacy')({
  head: () =>
    seo('/privacy', {
      title: `${title} | ${websiteConfig.metadata?.name}`,
      description,
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SimpleLegalPage
      title={title}
      description={description}
      sections={[
        {
          title: 'Browser-only image processing',
          body: 'Uploaded images are handled locally by your browser using Canvas APIs. We do not receive, store, or inspect the images you edit with the tool.',
        },
        {
          title: 'Analytics',
          body: 'We may use privacy-conscious analytics to understand aggregate product usage, such as page views and tool interactions. Analytics data is not used to reconstruct your uploaded images.',
        },
        {
          title: 'Advertising',
          body: 'When advertising is enabled, third-party advertising partners such as Google AdSense may use cookies, device identifiers, or similar technologies to serve, measure, and improve ads. These partners do not receive the images you edit because image processing remains local to your browser.',
        },
        {
          title: 'Your choices',
          body: 'You can control cookies and personalized advertising through your browser settings and Google ad settings. Blocking advertising cookies may reduce personalization, but the core grid maker tools will continue to work.',
        },
        {
          title: 'Contact',
          body: 'If contact details are added later, privacy requests will be handled through the listed support channel. Until then, avoid uploading files that you do not have permission to edit.',
        },
      ]}
    />
  );
}
