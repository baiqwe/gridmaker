import { createFileRoute, redirect } from '@tanstack/react-router';
import { Routes } from '@/routes';

export const Route = createFileRoute('/admin/')({
  beforeLoad: () => {
    throw redirect({ to: Routes.AdminUsers });
  },
});
