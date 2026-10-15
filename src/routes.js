import { summarizeUpload, UploadTooLargeError, MAX_UPLOAD_BYTES } from './utils/imageSummary.js';
import { runScreening } from './inference/screeningEngine.js';
import { getModelIntegrationInfo } from './inference/modelRegistry.js';
import { renderLandingPage } from './views/landingPage.js';
import { renderResultPage } from './views/resultPage.js';
import { renderIntegrationPage } from './views/integrationPage.js';
import { renderErrorPage } from './views/errorPage.js';

export async function handleRequest(req, res) {
  if (req.method === 'GET' && req.url === '/') {
    return html(res, 200, renderLandingPage());
  }

  if (req.method === 'POST' && req.url === '/screen') {
    let imageSummary;
    try {
      imageSummary = await summarizeUpload(req);
    } catch (error) {
      if (!(error instanceof UploadTooLargeError)) {
        throw error;
      }
      return html(
        res,
        413,
        renderErrorPage({
          title: 'Upload too large',
          message: `Choose an image no larger than ${MAX_UPLOAD_BYTES / (1024 * 1024)} MiB.`,
        })
      );
    }
    if (!imageSummary.hasBody) {
      return html(
        res,
        400,
        renderErrorPage({
          title: 'Image required',
          message: 'Choose a fundus image before running the prototype screening.',
        })
      );
    }
    if (!isSupportedUploadType(imageSummary.mimeType)) {
      return html(
        res,
        415,
        renderErrorPage({
          title: 'Unsupported image type',
          message: 'Upload an image file such as JPEG, PNG, or another supported image format.',
        })
      );
    }
    const result = runScreening(imageSummary);
    return html(res, 200, renderResultPage(result));
  }

  if (req.method === 'GET' && req.url === '/integration') {
    return html(res, 200, renderIntegrationPage(getModelIntegrationInfo()));
  }

  return html(
    res,
    404,
    '<h1>Not found</h1><p>The requested TEHI MVP route does not exist.</p>'
  );
}

function isSupportedUploadType(mimeType) {
  return mimeType === 'application/octet-stream' || mimeType.startsWith('image/');
}

function html(res, status, body) {
  res.writeHead(status, { 'content-type': 'text/html; charset=utf-8' });
  res.end(body);
}
