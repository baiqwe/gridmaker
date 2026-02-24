import CallToActionSection from '@/components/blocks/calltoaction';
import FaqSection from '@/components/blocks/faqs';
import FeaturesSection from '@/components/blocks/features';
import Features2Section from '@/components/blocks/features2';
import Features3Section from '@/components/blocks/features3';
import HeroSection from '@/components/blocks/hero';
import IntegrationSection from '@/components/blocks/integration';
import Integration2Section from '@/components/blocks/integration2';
import LogoCloudSection from '@/components/blocks/logo-cloud';
import NewsletterCard from '@/components/blocks/newsletter-card';
import PricingSection from '@/components/blocks/pricing';
import StatsSection from '@/components/blocks/stats';
import TestimonialsSection from '@/components/blocks/testimonials';
import { websiteConfig } from '@/config/website';
import { seo } from '@/lib/seo';
import { getCanonicalUrl } from '@/lib/urls';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  head: () => {
    const name = websiteConfig.metadata?.name ?? '';
    const title = websiteConfig.metadata?.title ?? '';
    const description = websiteConfig.metadata?.description ?? '';
    const url = getCanonicalUrl('/');
    const webSiteJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name,
      description,
      url,
    };
    const metadata = seo('/', { title, description });
    return {
      ...metadata,
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(webSiteJsonLd),
        },
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <LogoCloudSection />
      <StatsSection />
      <Features3Section />
      <FeaturesSection />
      <CallToActionSection />
      <Features2Section />
      <IntegrationSection />
      <Integration2Section />
      <PricingSection />
      <FaqSection />
      <TestimonialsSection />
      <NewsletterCard />
    </div>
  );
}
