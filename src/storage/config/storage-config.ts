import { env } from 'cloudflare:workers';
import type { StorageConfig } from '../types';

export interface StorageEnv {
  STORAGE_PUBLIC_URL?: string;
}

function getEnv(): StorageEnv {
  if (typeof env !== 'undefined' && env) {
    return env as StorageEnv;
  }
  return {
    STORAGE_PUBLIC_URL:
      typeof process !== 'undefined'
        ? process.env?.STORAGE_PUBLIC_URL
        : undefined,
  };
}

/**
 * R2 storage config. Bucket is from Worker binding (FILES); only publicUrl is from env.
 */
export const storageConfig: StorageConfig = (() => {
  const e = getEnv();
  return {
    publicUrl: e.STORAGE_PUBLIC_URL,
  };
})();
