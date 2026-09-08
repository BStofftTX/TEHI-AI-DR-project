function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function renderIntegrationPage(modelInfo) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TEHI Model Integration</title>
  <style>
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background: #09111e; color: #eef5ff; }
    .wrap { max-width: 820px; margin: 0 auto; padding: 24px; }
    .card { background: #121d33; border-radius: 18px; padding: 22px; margin-bottom: 16px; border: 1px solid rgba(255,255,255,0.08); }
    h1, h2 { margin-top: 0; }
    code, pre { font-family: Menlo, monospace; }
    pre { background: #0a1426; padding: 14px; border-radius: 12px; overflow:auto; }
    a { color: #86c6ff; }
    .muted { color: #b9c8e5; }
    ul { line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>TensorFlow Lite Integration Plan</h1>
      <p class="muted">This TEHI MVP is prepared to accept real model artifacts later without changing the product flow.</p>
    </div>

    <div class="card">
      <h2>Current model mode</h2>
      <p><strong>Adapter:</strong> ${esc(modelInfo.adapter)}</p>
      <p><strong>Status:</strong> ${esc(modelInfo.status)}</p>
      <p><strong>Expected artifacts:</strong> ${esc(modelInfo.expectedArtifacts.join(', '))}</p>
    </div>

    <div class="card">
      <h2>Recommended TensorFlow Lite path</h2>
      <ul>
        <li>Export a diabetic retinopathy classifier to <code>.tflite</code></li>
        <li>Export a cardiovascular screening model to <code>.tflite</code> or keep it server-side if needed</li>
        <li>Standardize image preprocessing dimensions and normalization</li>
        <li>Replace the stub adapter with a production adapter under <code>src/inference/adapters/</code></li>
        <li>Version model artifacts and preprocessing rules together</li>
      </ul>
    </div>

    <div class="card">
      <h2>Expected file layout</h2>
      <pre>${esc(modelInfo.exampleLayout)}</pre>
    </div>

    <div class="card">
      <a href="/">Back to TEHI MVP</a>
    </div>
  </div>
</body>
</html>`;
}
