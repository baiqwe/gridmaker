import { isLocale } from '@/lib/grid-maker/i18n';
import { createFileRoute, notFound, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale')({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) {
      throw notFound();
    }
  },
  component: () => <Outlet />,
});
