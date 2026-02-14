import { env } from 'cloudflare:workers';
import { ConfigurationError } from './types';

/** Minimal R2 bucket interface (Worker binding). */
export interface R2BucketBinding {
  put(
    key: string,
    value:
      | ReadableStream
      | ArrayBuffer
      | ArrayBufferView
      | string
      | null
      | Blob,
    options?: { httpMetadata?: { contentType?: string } }
  ): Promise<unknown>;
  get(key: string): Promise<{
    body: ReadableStream | null;
    httpMetadata?: { contentType?: string };
  } | null>;
  delete(key: string): Promise<void>;
}

/**
 * Get the R2 bucket binding (FILES). Used by R2 provider and file-serving route.
 */
export function getR2Bucket(): R2BucketBinding {
  const bucket = (env as { FILES?: R2BucketBinding }).FILES;
  if (!bucket) {
    throw new ConfigurationError(
      'R2 bucket binding "FILES" is not configured. Add r2_buckets in wrangler.jsonc.'
    );
  }
  return bucket;
}
