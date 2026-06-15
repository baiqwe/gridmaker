import Container from '@/components/layout/container';
import { websiteConfig } from '@/config/website';
import { seo } from '@/lib/seo';
import { createFileRoute, Link } from '@tanstack/react-router';

const title = 'About Grid Maker';
const description =
  'Grid Maker is a free browser-based image grid tool for social media, drawing, crochet, and pixel art workflows.';

export const Route = createFileRoute('/about')({
  head: () =>
    seo('/about', {
      title: `${title} | ${websiteConfig.metadata?.name}`,
      description,
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Container className="px-4 py-16">
      <article className="mx-auto max-w-3xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Link to="/" className="font-medium hover:text-foreground">
            Grid Maker
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">About</span>
        </nav>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Browser-based image tools
        </p>
        <h1 className="mt-3 text-4xl font-bold">{title}</h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          {description}
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Why this site exists</h2>
          <p className="text-base leading-8 text-muted-foreground">
            Grid Maker is built for people who need a fast, private way to split
            images or add reference grids without creating an account. The first
            version focuses on practical workflows: Instagram grids, drawing
            reference grids, crochet and craft grids, and pixel grid previews.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">How images are handled</h2>
          <p className="text-base leading-8 text-muted-foreground">
            Image processing happens locally in your browser with Canvas APIs.
            The site does not upload your selected image to a server, and the
            generated downloads are created on your device.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Core tools</h2>
          <ul className="space-y-3 text-base leading-8 text-muted-foreground">
            <li>
              <Link
                to="/instagram-grid-maker"
                className="font-medium underline"
              >
                Instagram Grid Maker
              </Link>{' '}
              for splitting a photo into social tiles.
            </li>
            <li>
              <Link to="/drawing-grid-maker" className="font-medium underline">
                Drawing Grid Maker
              </Link>{' '}
              for adding proportion guides to reference photos.
            </li>
            <li>
              <Link to="/crochet-grid-maker" className="font-medium underline">
                Crochet Grid Maker
              </Link>{' '}
              for dense craft planning grids.
            </li>
            <li>
              <Link to="/pixel-grid-maker" className="font-medium underline">
                Pixel Grid Maker
              </Link>{' '}
              for pixelated previews and block-based layouts.
            </li>
          </ul>
        </section>
      </article>
    </Container>
  );
}
