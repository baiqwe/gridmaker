import Container from '@/components/layout/container';

type SimpleLegalPageProps = {
  title: string;
  description: string;
  sections: Array<{ title: string; body: string }>;
};

export function SimpleLegalPage({
  title,
  description,
  sections,
}: SimpleLegalPageProps) {
  return (
    <Container className="px-4 py-16">
      <article className="mx-auto max-w-3xl">
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
              <p className="mt-3 text-base leading-8 text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
