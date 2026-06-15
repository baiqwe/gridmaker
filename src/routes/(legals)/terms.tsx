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
          title: 'No account required',
          body: 'The first version does not require registration or payment. Features may change over time, but core free usage will remain clearly identified.',
        },
        {
          title: 'No warranty',
          body: 'Grid Maker is provided as-is. We aim for accurate exports and fast performance, but you should review downloaded files before publishing or printing them.',
        },
      ]}
    />
  );
}
