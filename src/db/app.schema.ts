/**
 * Application database schema (non-auth tables).
 * Add your app tables here; keep Better Auth tables in auth.schema.ts.
 */

import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { user } from './auth.schema';

/**
 * User files: metadata for files uploaded to R2 (path userfiles/{userId}/xxx).
 * filename = stored name on R2 (e.g. uuid.ext); originalName = user's file name.
 */
export const userFiles = sqliteTable('user_files', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  contentType: text('content_type').notNull(),
  size: integer('size').notNull(),
  r2Key: text('r2_key').notNull(),
  isPublic: integer('is_public', { mode: 'boolean' }),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
});

export const userFilesRelations = relations(userFiles, ({ one }) => ({
  user: one(user, {
    fields: [userFiles.userId],
    references: [user.id],
  }),
}));