export async function summarizeUpload(req) {
  const chunks = [];
  for await (const chunk of req) {
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
