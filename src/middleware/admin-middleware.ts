import { auth } from '@/auth/auth';
import { redirect } from '@tanstack/react-router';
import { createMiddleware } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { Routes } from '@/routes';

const ADMIN_ROLE = 'admin';

/**
 * Admin middleware: requires authenticated user with role === 'admin'.
 * Use after auth or alone (redirects to login if not signed in, then to dashboard if not admin).
 */
export const adminMiddleware = createMiddleware().server(async ({ next }) => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });

  if (!session?.user) {
    throw redirect({ to: Routes.Login });
  }

  const role = session.user.role;
  if (role !== ADMIN_ROLE) {
    throw redirect({ to: Routes.Dashboard });
  }

  return await next();
});
