export function renderErrorPage({ title, message }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TEHI - ${escapeHtml(title)}</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px; background: #edf3f8; color: #16314c; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; }
    main { width: min(520px, 100%); padding: 28px; border: 1px solid #d8e2ec; border-radius: 18px; background: #fff; box-shadow: 0 24px 60px rgba(21, 41, 68, 0.14); }
    h1 { margin-top: 0; }
    p { line-height: 1.5; }
    a { display: inline-block; margin-top: 8px; padding: 12px 16px; border-radius: 12px; background: #234d78; color: #fff; font-weight: 700; text-decoration: none; }
  </style>
</head>
<body>
  <main>
    <div role="alert" aria-live="assertive">
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(message)}</p>
    </div>
    <a href="/">Return to image upload</a>
  </main>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
