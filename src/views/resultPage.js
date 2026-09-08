function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function scoreColor(label) {
  if (/4|Proliferative|likely/i.test(label)) return '#ad1d27';
  if (/2|3|Moderate|Severe/i.test(label)) return '#ad6b1d';
  return '#234d78';
}

export function renderResultPage(result) {
  const dr = result.outputs.diabeticRetinopathy;
  const cvd = result.outputs.cardiovascularRisk;
  const image = result.imageSummary;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>TEHI Results</title>
  <style>
    :root {
      --bg: #edf3f8;
      --ink: #16314c;
      --muted: #5c6f85;
      --navy: #234d78;
      --red: #ad1d27;
      --line: #d8e2ec;
      --panel: #ffffff;
      --warning-bg: #fff5e5;
      --warning-text: #72521a;
      --shadow: 0 24px 60px rgba(21, 41, 68, 0.14);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background: linear-gradient(180deg, #f4f8fc 0%, #e7eef5 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      color: var(--ink);
      display: grid;
      place-items: center;
      padding: 18px 14px;
    }
    .phone-frame {
      width: min(420px, 100%);
      background: #101319;
      border-radius: 42px;
      padding: 10px;
      box-shadow: 0 30px 80px rgba(0,0,0,0.22);
    }
    .screen {
      background: var(--panel);
      border-radius: 34px;
      min-height: 86vh;
      padding: 24px 18px 24px;
      position: relative;
      overflow: hidden;
    }
    .screen:before {
      content: '';
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 110px;
      height: 20px;
      background: #0f1218;
      border-radius: 0 0 16px 16px;
      opacity: 0.95;
    }
    .top {
      padding-top: 22px;
      text-align: center;
    }
    .brand {
      margin: 0;
      font-size: 1.95rem;
      letter-spacing: 0.06em;
      color: var(--ink);
    }
    .subtitle {
      margin: 8px auto 0;
      max-width: 280px;
      color: var(--muted);
      line-height: 1.4;
      font-size: 0.96rem;
    }
    .warning {
      margin-top: 14px;
      background: var(--warning-bg);
      color: var(--warning-text);
      border-radius: 14px;
      padding: 10px 12px;
      font-size: 0.84rem;
      line-height: 1.35;
      text-align: left;
    }
    .hero-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 18px;
    }
    .score-card {
      border-radius: 20px;
      padding: 16px 14px;
      color: white;
      box-shadow: 0 14px 26px rgba(16, 35, 58, 0.14);
    }
    .score-card h2 {
      margin: 0;
      font-size: 1.45rem;
    }
    .score-card p {
      margin: 6px 0 0;
      font-size: 0.84rem;
      line-height: 1.3;
      opacity: 0.95;
    }
    .details {
      display: grid;
      gap: 12px;
      margin-top: 14px;
    }
    .panel {
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 16px;
      background: #f8fbfe;
    }
    .panel h3 {
      margin: 0 0 8px;
      font-size: 1rem;
      color: var(--ink);
    }
    .panel p {
      margin: 5px 0;
      color: var(--muted);
      line-height: 1.4;
      font-size: 0.92rem;
    }
    .actions {
      display: grid;
      gap: 10px;
      margin-top: 14px;
    }
    a.button {
      border-radius: 15px;
      padding: 14px 16px;
      font-size: 0.98rem;
      font-weight: 800;
      text-align: center;
      text-decoration: none;
      background: linear-gradient(135deg, var(--navy), #2f679c);
      color: white;
    }
    a.secondary {
      border-radius: 15px;
      padding: 14px 16px;
      font-size: 0.98rem;
      font-weight: 800;
      text-align: center;
      text-decoration: none;
      background: white;
      color: var(--navy);
      border: 1px solid var(--line);
    }
    .footer {
      margin-top: 12px;
      font-size: 0.8rem;
      line-height: 1.35;
      color: var(--muted);
      text-align: center;
    }
  </style>
</head>
<body>
  <main class="phone-frame">
    <section class="screen">
      <div class="top">
        <h1 class="brand">TEHI Results</h1>
        <p class="subtitle">Prototype screening outputs for diabetic retinopathy and cardiovascular risk from the uploaded fundus image.</p>
        <div class="warning">${esc(result.disclaimer)}</div>
      </div>

      <div class="hero-cards">
        <div class="score-card" style="background: linear-gradient(135deg, ${scoreColor(dr.label)}, #24496e);">
          <h2>DR</h2>
          <p><strong>${esc(dr.label)}</strong></p>
          <p>Confidence: ${esc(dr.confidence)}</p>
        </div>
        <div class="score-card" style="background: linear-gradient(135deg, ${scoreColor(cvd.label)}, #8f151e);">
          <h2>CVD</h2>
          <p><strong>${esc(cvd.label)}</strong></p>
          <p>Confidence: ${esc(cvd.confidence)}</p>
        </div>
      </div>

      <div class="details">
        <div class="panel">
          <h3>Upload summary</h3>
          <p><strong>File:</strong> ${esc(image.fileName)}</p>
          <p><strong>MIME type:</strong> ${esc(image.mimeType)}</p>
          <p><strong>Bytes received:</strong> ${esc(image.receivedBytes)}</p>
        </div>

        <div class="panel">
          <h3>Model status</h3>
          <p><strong>Inference engine:</strong> ${esc(result.outputs.modelType)}</p>
          <p>${esc(result.outputs.warning)}</p>
        </div>

        <div class="panel">
          <h3>Recommended next step</h3>
          <p>${esc(result.recommendedNextStep)}</p>
        </div>
      </div>

      <div class="actions">
        <a class="button" href="/">Run another prototype screening</a>
        <a class="secondary" href="/integration">View TensorFlow Lite integration plan</a>
      </div>

      <div class="footer">TEHI remains a prototype screening workflow and should be reviewed by qualified clinicians before any real-world use.</div>
    </section>
  </main>
</body>
</html>`;
}
