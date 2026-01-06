import { put, del, list, type PutBlobResult, type PutCommandOptions } from '@vercel/blob';

export interface UploadOptions {
  name: string;
  data: string | Buffer | File | Blob;
  contentType?: string;
}

export interface BlobInfo {
  url: string;
  pathname: string;
}

/**
 * 上传文件到 Vercel Blob
 */
export async function uploadFile(options: UploadOptions): Promise<BlobInfo> {
  const { name, data, contentType = 'application/octet-stream' } = options;

  const putOptions: PutCommandOptions = {
    access: 'public',
    contentType,
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  };

  const blob = await put(name, data, putOptions);

  return {
    url: blob.url,
    pathname: blob.pathname,
  };
}

/**
 * 从 Vercel Blob 删除文件
 */
export async function deleteFile(url: string): Promise<void> {
  await del(url, {
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  });
}

/**
 * 列出 Vercel Blob 中的所有文件
 */
export async function listFiles(prefix?: string): Promise<BlobInfo[]> {
  const { blobs } = await list({
    prefix,
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  });

  return blobs.map((blob) => ({
    url: blob.url,
    pathname: blob.pathname,
  }));
}

/**
 * 上传图片（自动设置 contentType）
 */
export async function uploadImage(
  name: string,
  data: string | Buffer | File | Blob
): Promise<BlobInfo> {
  // 从文件名推断内容类型
  const ext = name.split('.').pop()?.toLowerCase();
  const contentTypeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
  };

  const contentType = contentTypeMap[ext || ''] || 'image/jpeg';

  return uploadFile({
    name,
    data,
    contentType,
  });
}
