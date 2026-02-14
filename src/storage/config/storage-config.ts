import { env } from 'cloudflare:workers';
import type { StorageConfig } from '../types';

export interface StorageEnv {
  STORAGE_REGION?: string;
  STORAGE_ENDPOINT?: string;
  STORAGE_ACCESS_KEY_ID?: string;
  STORAGE_SECRET_ACCESS_KEY?: string;
  STORAGE_BUCKET_NAME?: string;
  STORAGE_PUBLIC_URL?: string;
  STORAGE_FORCE_PATH_STYLE?: string;
}

function getEnv(): StorageEnv {
  if (typeof env !== 'undefined' && env) {
    return env as StorageEnv;
  }
  return {
    STORAGE_REGION:
      typeof process !== 'undefined' ? process.env?.STORAGE_REGION : undefined,
    STORAGE_ENDPOINT:
      typeof process !== 'undefined'
        ? process.env?.STORAGE_ENDPOINT
        : undefined,
    STORAGE_ACCESS_KEY_ID:
      typeof process !== 'undefined'
        ? process.env?.STORAGE_ACCESS_KEY_ID
        : undefined,
    STORAGE_SECRET_ACCESS_KEY:
      typeof process !== 'undefined'
        ? process.env?.STORAGE_SECRET_ACCESS_KEY
        : undefined,
    STORAGE_BUCKET_NAME:
      typeof process !== 'undefined'
        ? process.env?.STORAGE_BUCKET_NAME
        : undefined,
    STORAGE_PUBLIC_URL:
      typeof process !== 'undefined'
        ? process.env?.STORAGE_PUBLIC_URL
        : undefined,
    STORAGE_FORCE_PATH_STYLE:
      typeof process !== 'undefined'
        ? process.env?.STORAGE_FORCE_PATH_STYLE
        : undefined,
  };
}

/**
 * Default storage configuration from environment
 */
export const storageConfig: StorageConfig = (() => {
  const e = getEnv();
  return {
    region: e.STORAGE_REGION ?? '',
    endpoint: e.STORAGE_ENDPOINT,
    accessKeyId: e.STORAGE_ACCESS_KEY_ID ?? '',
    secretAccessKey: e.STORAGE_SECRET_ACCESS_KEY ?? '',
    bucketName: e.STORAGE_BUCKET_NAME ?? '',
    publicUrl: e.STORAGE_PUBLIC_URL,
    forcePathStyle: e.STORAGE_FORCE_PATH_STYLE !== 'false',
  };
})();
