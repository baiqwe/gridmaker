import { HeaderSection } from '@/components/shared/header-section';

const m = {
  title: 'STATS',
  subtitle: 'Built for growth',
  description: 'Numbers that speak for themselves',
  items: {
    'item-1': { title: 'Active users' },
    'item-2': { title: 'API requests' },
    'item-3': { title: 'Teams' },
  },
};

export default function StatsSection() {
  return (
    <section id="stats" className="px-4 py-16">
      <div className="mx-auto max-w-5xl px-6 space-y-8 md:space-y-16">
        <HeaderSection
          title={m.title}
          subtitle={m.subtitle}
          subtitleAs="h2"
          description={m.description}
          descriptionAs="p"
        />

        <div className="grid gap-2 *:text-center md:grid-cols-3 md:divide-x md:divide-border">
          <div className="space-y-4 py-4 md:py-0">
            <div className="text-5xl font-bold text-primary">+1200</div>
            <p className="text-muted-foreground font-medium">
              {m.items['item-1'].title}
            </p>
          </div>
          <div className="space-y-4 py-4 md:py-0">
            <div className="text-5xl font-bold text-primary">22 Million</div>
            <p className="text-muted-foreground font-medium">
              {m.items['item-2'].title}
            </p>
          </div>
          <div className="space-y-4 py-4 md:py-0">
            <div className="text-5xl font-bold text-primary">+500</div>
            <p className="text-muted-foreground font-medium">
              {m.items['item-3'].title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
