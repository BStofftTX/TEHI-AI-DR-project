export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export class UploadTooLargeError extends Error {
  constructor() {
    super(`Upload exceeds the ${MAX_UPLOAD_BYTES} byte limit.`);
    this.name = 'UploadTooLargeError';
  }
}

export async function summarizeUpload(req) {
  const declaredLength = Number(req.headers['content-length']);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_UPLOAD_BYTES) {
    throw new UploadTooLargeError();
  }

  const chunks = [];
  let receivedBytes = 0;
  for await (const chunk of req) {
    receivedBytes += chunk.length;
    if (receivedBytes > MAX_UPLOAD_BYTES) {
      req.resume();
      throw new UploadTooLargeError();
    }
    chunks.push(chunk);
  }

  const body = Buffer.concat(chunks);
  const contentType = req.headers['content-type'] || 'application/octet-stream';

  return {
    fileName: extractFileName(contentType) || 'fundus-upload.bin',
    size: body.length,
    mimeType: contentType.split(';')[0].trim(),
    receivedBytes: body.length,
    hasBody: body.length > 0,
  };
}

function extractFileName(contentType) {
  const match = /filename="([^"]+)"/.exec(contentType || '');
  return match?.[1] ?? null;
}
