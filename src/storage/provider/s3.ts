import { S3mini } from 's3mini';
import { storageConfig } from '../config/storage-config';
import {
  ConfigurationError,
  type StorageConfig,
  StorageError,
  type StorageProvider,
  UploadError,
  type UploadFileParams,
  type UploadFileResult,
} from '../types';

/**
 * S3-compatible storage provider using s3mini (works with Cloudflare R2, AWS S3, etc.)
 */
export class S3Provider implements StorageProvider {
  private config: StorageConfig;
  private s3Client: S3mini | null = null;

  constructor(config: StorageConfig = storageConfig) {
    this.config = config;
  }

  getProviderName(): string {
    return 'S3';
  }

  private getS3Client(): S3mini {
    if (this.s3Client) return this.s3Client;

    const { region, endpoint, accessKeyId, secretAccessKey, bucketName } =
      this.config;

    if (!region) {
      throw new ConfigurationError('Storage region is not configured');
    }
    if (!accessKeyId || !secretAccessKey) {
      throw new ConfigurationError('Storage credentials are not configured');
    }
    if (!endpoint) {
      throw new ConfigurationError('Storage endpoint is required for s3mini');
    }
    if (!bucketName) {
      throw new ConfigurationError('Storage bucket name is not configured');
    }

    const endpointWithBucket = `${endpoint.replace(/\/$/, '')}/${bucketName}`;

    this.s3Client = new S3mini({
      accessKeyId,
      secretAccessKey,
      endpoint: endpointWithBucket,
      region,
    });

    return this.s3Client;
  }

  private generateUniqueFilename(originalFilename: string): string {
    const extension = originalFilename.split('.').pop() || '';
    const uuid =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    return `${uuid}${extension ? `.${extension}` : ''}`;
  }

  async uploadFile(params: UploadFileParams): Promise<UploadFileResult> {
    try {
      const { file, filename, contentType, folder } = params;
      const s3 = this.getS3Client();
      const { bucketName } = this.config;

      const uniqueFilename = this.generateUniqueFilename(filename);
      const key = folder ? `${folder}/${uniqueFilename}` : uniqueFilename;

      let fileContent: Buffer | string;
      if (file instanceof Blob) {
        fileContent = Buffer.from(await file.arrayBuffer());
      } else {
        fileContent = file;
      }

      const response = await s3.putObject(key, fileContent, contentType);

      if (!response.ok) {
        throw new UploadError(`Failed to upload file: ${response.statusText}`);
      }

      const { publicUrl } = this.config;
      const url = publicUrl
        ? `${publicUrl.replace(/\/$/, '')}/${key}`
        : `${this.config.endpoint?.replace(/\/$/, '') || ''}/${key}`;

      return { url, key };
    } catch (error) {
      if (error instanceof ConfigurationError) throw error;
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown error occurred during file upload';
      throw new UploadError(message);
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      const s3 = this.getS3Client();
      await s3.deleteObject(key);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown error occurred during file deletion';
      throw new StorageError(message);
    }
  }
}
