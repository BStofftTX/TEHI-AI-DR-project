import { summarizeUpload } from './utils/imageSummary.js';
import { runScreening } from './inference/screeningEngine.js';
import { getModelIntegrationInfo } from './inference/modelRegistry.js';
import { renderLandingPage } from './views/landingPage.js';
import { renderResultPage } from './views/resultPage.js';
import { renderIntegrationPage } from './views/integrationPage.js';

export async function handleRequest(req, res) {
  if (req.method === 'GET' && req.url === '/') {
    return html(res, 200, renderLandingPage());
  }

  if (req.method === 'POST' && req.url === '/screen') {
    const imageSummary = await summarizeUpload(req);
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

function html(res, status, body) {
  res.writeHead(status, { 'content-type': 'text/html; charset=utf-8' });
  res.end(body);
}
