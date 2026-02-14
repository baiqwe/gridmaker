/**
 * R2-only storage config (public URL for served objects; bucket comes from Worker binding).
 */
export interface StorageConfig {
  publicUrl?: string;
}

/**
 * Storage provider error types
 */
export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StorageError';
  }
}

export class ConfigurationError extends StorageError {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export class UploadError extends StorageError {
  constructor(message: string) {
    super(message);
    this.name = 'UploadError';
  }
}

export interface UploadFileParams {
  file: Buffer | Blob;
  filename: string;
  contentType: string;
  folder?: string;
}

export interface UploadFileResult {
  url: string;
  key: string;
}

export interface StorageProvider {
  uploadFile(params: UploadFileParams): Promise<UploadFileResult>;
  deleteFile(key: string): Promise<void>;
  getProviderName(): string;
}
