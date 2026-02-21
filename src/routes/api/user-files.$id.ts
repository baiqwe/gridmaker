import { createFileRoute } from '@tanstack/react-router';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { authApiMiddleware } from '@/middleware/auth-middleware';
import { auth } from '@/auth/auth';
import { getDb } from '@/db';
import { userFiles } from '@/db/app.schema';
import { deleteFile } from '@/storage';
import { and, eq } from 'drizzle-orm';

export const Route = createFileRoute('/api/user-files/$id')({
  server: {
    middleware: [authApiMiddleware],
    handlers: {
      DELETE: async ({ request, params }) => {
        const headers = getRequestHeaders();
        const session = await auth.api.getSession({ headers });
        const userId = session?.user?.id;
        if (!userId) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const id = params.id;
        const db = getDb();
        const [row] = await db
          .select()
          .from(userFiles)
          .where(and(eq(userFiles.id, id), eq(userFiles.userId, userId)))
          .limit(1);

        if (!row) {
          return Response.json({ error: 'Not found' }, { status: 404 });
        }

        await deleteFile(row.r2Key);
        await db.delete(userFiles).where(eq(userFiles.id, id));
        return new Response(null, { status: 204 });
      },
    },
  },
});
