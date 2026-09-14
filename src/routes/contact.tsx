import Container from '@/components/layout/container';
import { websiteConfig } from '@/config/website';
import { seo } from '@/lib/seo';
import { createFileRoute, Link } from '@tanstack/react-router';

const title = 'Contact Grid Maker';
const description =
  'Contact information for Grid Maker support, privacy questions, bug reports, and AdSense or advertising policy questions.';

export const Route = createFileRoute('/contact')({
  head: () =>
    seo('/contact', {
      title: `${title} | ${websiteConfig.metadata?.name}`,
      description,
    }),
  component: ContactPage,
});

function ContactPage() {
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
          <span aria-current="page">Contact</span>
        </nav>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Support and policy contact
        </p>
        <h1 className="mt-3 text-4xl font-bold">{title}</h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          Grid Maker is a free browser-based image grid tool. Use this page for
          product feedback, bug reports, privacy questions, compatibility
          issues, and advertising or policy questions related to the site.
        </p>

        <div className="mt-10 grid gap-6">
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">Email support</h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              For support, privacy requests, corrections, or advertising
              questions, email{' '}
              <a
                href="mailto:support@anygridmaker.com"
                className="break-all font-medium underline"
              >
                support@anygridmaker.com
              </a>
              . Include the page URL, browser, and a description of the issue.
              Do not send passwords or sensitive images. Email attachments are
              sent to our mailbox, unlike images edited locally in the tool.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">Public issue tracker</h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              For non-sensitive bug reports, you can use the public GitHub
              repository. Please include the page URL, browser, device type, and
              a short description of what happened. Do not attach private images
              or files that you do not have permission to share.
            </p>
            <a
              href="https://github.com/baiqwe/gridmaker/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-md border border-border px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted hover:text-foreground"
            >
              Open a GitHub issue
            </a>
          </section>

          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">Privacy and advertising</h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              For privacy or advertising questions, include the relevant page
              URL and the country or region where you viewed the site. The tool
              processes uploaded images locally in your browser, and advertising
              partners do not receive the images you edit.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/privacy"
                className="rounded-md border border-border px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                to="/cookie"
                className="rounded-md border border-border px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted hover:text-foreground"
              >
                Cookie Policy
              </Link>
            </div>
          </section>
        </div>
      </article>
    </Container>
  );
}
