import type { UploadFileResult } from './types';

const API_STORAGE_UPLOAD = '/api/storage/upload';

/**
 * Uploads a file from the browser via the upload API (for use in client components).
 */
export const uploadFileFromBrowser = async (
  file: File,
  folder?: string
): Promise<UploadFileResult> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder ?? '');

  const response = await fetch(API_STORAGE_UPLOAD, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 413) {
      throw new Error('File size exceeds the server limit');
    }
    let errorMessage = 'Failed to upload file';
    try {
      const data = (await response.json()) as {
        error?: string;
        message?: string;
      };
      errorMessage = data.error ?? data.message ?? errorMessage;
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return (await response.json()) as UploadFileResult;
};
