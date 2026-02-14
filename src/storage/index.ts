import { websiteConfig } from '@/config/website';
import { storageConfig } from './config/storage-config';
import { R2Provider } from './provider/r2';
import type { StorageConfig, StorageProvider, UploadFileResult } from './types';

export const defaultStorageConfig: StorageConfig = storageConfig;

let storageProvider: StorageProvider | null = null;

export const getStorageProvider = (): StorageProvider => {
  if (!storageProvider) {
    return initializeStorageProvider();
  }
  return storageProvider;
};

export const initializeStorageProvider = (): StorageProvider => {
  if (!storageProvider) {
    if (websiteConfig.storage?.provider === 'r2') {
      storageProvider = new R2Provider();
    } else {
      throw new Error(
        `Unsupported storage provider: ${websiteConfig.storage?.provider}`
      );
    }
  }
  return storageProvider;
};

export const uploadFile = async (
  file: Buffer | Blob,
  filename: string,
  contentType: string,
  folder?: string
): Promise<UploadFileResult> => {
  const provider = getStorageProvider();
  return provider.uploadFile({ file, filename, contentType, folder });
};

export const deleteFile = async (key: string): Promise<void> => {
  const provider = getStorageProvider();
  return provider.deleteFile(key);
};
