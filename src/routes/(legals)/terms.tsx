import { SimpleLegalPage } from '@/components/page/simple-legal-page';
import { websiteConfig } from '@/config/website';
import { seo } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';

const title = 'Terms of Service';
const description =
  'Simple terms for using Grid Maker, a free browser-based image grid tool.';

export const Route = createFileRoute('/(legals)/terms')({
  head: () =>
    seo('/terms', {
      title: `${title} | ${websiteConfig.metadata?.name}`,
      description,
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SimpleLegalPage
      title={title}
      description={description}
      sections={[
        {
          title: 'Use of the tool',
          body: 'You may use Grid Maker to create image grids, split images, and export edited files. You are responsible for the images you choose to process and download.',
        },
        {
          title: 'Image rights and uploads',
          body: 'Only process images that you own, have permission to edit, or are allowed to use under the applicable license. Grid Maker processes files in the browser and does not grant rights to third-party photos, artwork, logos, or brand assets.',
        },
        {
          title: 'No account required',
          body: 'The first version does not require registration or payment. Features may change over time, but core free usage will remain clearly identified.',
        },
        {
          title: 'Advertising and analytics',
          body: 'The site may use analytics to understand aggregate traffic and may show advertising when Google AdSense or another advertising partner is enabled. Ads should be clearly separated from the core image workflow, should not block navigation, and should not be presented as download buttons or required actions. Privacy and cookie details are described in the Privacy Policy and Cookie Policy.',
        },
        {
          title: 'No warranty',
          body: 'Grid Maker is provided as-is. We aim for accurate exports and fast performance, but you should review downloaded files before publishing or printing them.',
        },
        {
          title: 'Feedback',
          body: (
            <>
              Product feedback, bug reports, and browser compatibility issues
              can be reported through the public{' '}
              <a
                href="https://github.com/baiqwe/gridmaker"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline"
              >
                Grid Maker GitHub repository
              </a>
              .
            </>
          ),
        },
      ]}
    />
  );
}
