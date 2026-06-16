import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const pages = defineCollection({
  name: 'pages',
  directory: 'content/pages',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().optional(),
    content: z.string(),
  }),
  transform: (doc) => ({
    ...doc,
    slug: (doc as { _meta: { path: string } })._meta.path,
  }),
});

export default defineConfig({
  collections: [pages],
});
