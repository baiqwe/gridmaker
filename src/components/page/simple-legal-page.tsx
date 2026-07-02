import Container from '@/components/layout/container';
import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

type SimpleLegalPageProps = {
  title: string;
  description: string;
  sections: Array<{ title: string; body: ReactNode }>;
};

export function SimpleLegalPage({
  title,
  description,
  sections,
}: SimpleLegalPageProps) {
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
          <span aria-current="page">{title}</span>
        </nav>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Grid Maker
        </p>
        <h1 className="mt-3 text-4xl font-bold">{title}</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {description}
        </p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <div className="mt-3 text-base leading-8 text-muted-foreground">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
