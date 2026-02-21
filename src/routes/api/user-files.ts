import { createFileRoute } from '@tanstack/react-router';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { authApiMiddleware } from '@/middleware/auth-middleware';
import { auth } from '@/auth/auth';
import { getDb } from '@/db';
import { userFiles } from '@/db/app.schema';
import { count, desc, eq } from 'drizzle-orm';

export const Route = createFileRoute('/api/user-files')({
  server: {
    middleware: [authApiMiddleware],
    handlers: {
      GET: async ({ request }) => {
        const headers = getRequestHeaders();
        const session = await auth.api.getSession({ headers });
        const userId = session?.user?.id;
        if (!userId) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const url = new URL(request.url);
        const pageIndex = Math.max(
          0,
          Number(url.searchParams.get('pageIndex')) || 0
        );
        const pageSize = Math.min(
          100,
          Math.max(1, Number(url.searchParams.get('pageSize')) || 10)
        );

        const db = getDb();
        const where = eq(userFiles.userId, userId);
        const [totalRow] = await db
          .select({ count: count() })
          .from(userFiles)
          .where(where);
        const total = totalRow?.count ?? 0;

        const items = await db
          .select()
          .from(userFiles)
          .where(where)
          .orderBy(desc(userFiles.createdAt))
          .limit(pageSize)
          .offset(pageIndex * pageSize);

        return Response.json({ items, total });
      },
    },
  },
});
