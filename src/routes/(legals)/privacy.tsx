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
          body: 'When advertising is enabled, third-party advertising partners such as Google AdSense may use cookies, device identifiers, IP addresses, web beacons, or similar technologies to serve, measure, and improve ads. Google and its partners may use these signals to show personalized or non-personalized ads depending on your location, settings, consent choices, and applicable law. These partners do not receive the images you edit because image processing remains local to your browser.',
        },
        {
          title: 'Third-party advertising cookies',
          body: 'Third-party vendors, including Google, may use cookies to serve ads based on a user’s prior visits to this site or other websites. Google’s use of advertising cookies enables it and its partners to serve ads based on visits to this site and/or other sites on the Internet.',
        },
        {
          title: 'Your choices',
          body: 'You can control cookies and personalized advertising through your browser settings, Google ad settings, and consent controls where they are available. Users in regions that require consent, including the EEA and UK, may be shown consent choices before personalized advertising or similar storage is used. Blocking advertising cookies may reduce personalization, but the core grid maker tools will continue to work.',
        },
        {
          title: 'Personal information and ad requests',
          body: 'Do not place personal information in page URLs or tool inputs that you intend to share publicly. Grid Maker does not intentionally send names, email addresses, uploaded image contents, or other personally identifiable information to Google ad requests.',
        },
        {
          title: 'Contact',
          body: (
            <>
              For privacy questions or requests, email{' '}
              <a
                href="mailto:support@anygridmaker.com"
                className="break-all font-medium underline"
              >
                support@anygridmaker.com
              </a>
              . We receive the email address, message, and any attachments you
              send and use them to respond to your request. Do not send
              sensitive images or passwords. Browser-only image processing does
              not apply to files you deliberately send by email.
            </>
          ),
        },
      ]}
    />
  );
}
