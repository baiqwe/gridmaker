import { websiteConfig } from '@/config/website';
import { storageConfig } from './config/storage-config';
import { S3Provider } from './provider/s3';
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
    if (websiteConfig.storage?.provider === 's3') {
      storageProvider = new S3Provider();
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
