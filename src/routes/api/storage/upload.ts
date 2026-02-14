import { createFileRoute } from '@tanstack/react-router';
import { websiteConfig } from '@/config/website';
import { MAX_FILE_SIZE } from '@/lib/constants';
import { requireSession, unauthorizedResponse } from '@/lib/require-session';
import { uploadFile } from '@/storage';
import { StorageError } from '@/storage/types';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const Route = createFileRoute('/api/storage/upload')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const session = await requireSession(request);
        if (!session) {
          return unauthorizedResponse();
        }

        if (!websiteConfig.storage?.enable) {
          return Response.json(
            { error: 'Storage is not enabled' },
            { status: 503 }
          );
        }

        try {
          const formData = await request.formData();
          const file = formData.get('file') as File | null;
          const folder = (formData.get('folder') as string | null) ?? undefined;

          if (!file) {
            return Response.json(
              { error: 'No file provided' },
              { status: 400 }
            );
          }

          if (file.size > MAX_FILE_SIZE) {
            return Response.json(
              { error: 'File size exceeds the server limit' },
              { status: 400 }
            );
          }

          if (!ALLOWED_TYPES.includes(file.type)) {
            return Response.json(
              { error: 'File type not supported' },
              { status: 400 }
            );
          }

          const buffer = Buffer.from(await file.arrayBuffer());
          const result = await uploadFile(
            buffer,
            file.name,
            file.type,
            folder || undefined
          );

          return Response.json(result);
        } catch (error) {
          if (error instanceof StorageError) {
            return Response.json({ error: error.message }, { status: 500 });
          }
          return Response.json(
            { error: 'Something went wrong while uploading the file' },
            { status: 500 }
          );
        }
      },
    },
  },
});
