export function renderLandingPage() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>TEHI MVP</title>
  <style>
    :root {
      --bg: #edf3f8;
      --ink: #16314c;
      --muted: #596e86;
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
      text-align: center;
      padding-top: 22px;
    }
    .top h1 {
      margin: 0;
      font-size: 2.05rem;
      letter-spacing: 0.06em;
      color: var(--ink);
    }
    .mini-eye {
      width: 118px;
      height: 68px;
      margin: 12px auto 12px;
      position: relative;
      border: 2px solid #76808a;
      border-radius: 100px / 70px;
      background: #fff;
      overflow: hidden;
    }
    .iris-mini, .iris-main {
      border-radius: 50%;
      background: conic-gradient(
        #5d3621 0deg 120deg,
        #48763c 120deg 240deg,
        #5ba5e6 240deg 360deg
      );
      box-shadow: inset 0 0 18px rgba(0,0,0,0.18);
    }
    .iris-mini {
      width: 54px;
      height: 54px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .pupil-mini, .pupil-main {
      border-radius: 50%;
      background: #060708;
      position: absolute;
      box-shadow: 0 0 10px rgba(0,0,0,0.15);
    }
    .pupil-mini {
      width: 22px;
      height: 22px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .glint-mini, .glint-main {
      border-radius: 50%;
      background: rgba(255,255,255,0.72);
      position: absolute;
    }
    .glint-mini {
      width: 8px;
      height: 8px;
      left: calc(50% - 10px);
      top: calc(50% - 8px);
    }
    .headline {
      margin: 8px 0 6px;
      font-size: 1.55rem;
      line-height: 1.15;
      font-weight: 700;
      color: var(--ink);
    }
    .subhead {
      margin: 0 auto;
      max-width: 290px;
      font-size: 1rem;
      line-height: 1.35;
      color: var(--muted);
    }
    .hero-visual {
      margin: 20px auto 18px;
      width: 255px;
      height: 255px;
      position: relative;
      display: grid;
      place-items: center;
    }
    .target-ring, .target-ring-2 {
      position: absolute;
      border: 1.5px solid rgba(35, 77, 120, 0.18);
      border-radius: 50%;
    }
    .target-ring {
      width: 76%;
      height: 76%;
    }
    .target-ring-2 {
      width: 54%;
      height: 54%;
    }
    .cross-h, .cross-v {
      position: absolute;
      background: rgba(35, 77, 120, 0.22);
    }
    .cross-h { width: 100%; height: 1px; }
    .cross-v { width: 1px; height: 100%; }
    .iris-main {
      width: 76%;
      height: 76%;
      position: relative;
    }
    .pupil-main {
      width: 34%;
      height: 34%;
      left: 33%;
      top: 33%;
    }
    .glint-main {
      width: 10%;
      height: 10%;
      left: 37%;
      top: 35%;
    }
    .node {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255,255,255,0.95);
      border: 1px solid rgba(35, 77, 120, 0.18);
    }
    .n1 { top: 34px; right: 78px; }
    .n2 { left: 38px; top: 112px; }
    .n3 { right: 32px; top: 122px; }
    .n4 { left: 90px; bottom: 48px; }
    .n5 { right: 70px; bottom: 56px; }
    .scan-line {
      position: absolute;
      width: 56px;
      height: 2px;
      background: rgba(35, 77, 120, 0.34);
    }
    .s1 { left: 0; top: 72px; }
    .s2 { right: 0; top: 72px; }
    .s3 { left: 0; bottom: 78px; }
    .s4 { right: 0; bottom: 78px; }
    .cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 6px;
    }
    .action-card {
      border-radius: 18px;
      padding: 16px 14px;
      color: white;
      text-align: center;
      box-shadow: 0 14px 26px rgba(16, 35, 58, 0.14);
    }
    .action-card h2 {
      margin: 0;
      font-size: 1.65rem;
      letter-spacing: 0.04em;
    }
    .action-card p {
      margin: 6px 0 0;
      font-size: 0.82rem;
      line-height: 1.25;
      opacity: 0.94;
    }
    .dr { background: linear-gradient(135deg, #2a5582, #24496e); }
    .cvd { background: linear-gradient(135deg, #b31d28, #8f151e); }
    .upload-card {
      margin-top: 14px;
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 14px;
      background: #f8fbfe;
    }
    .upload-card h3 {
      margin: 0 0 8px;
      font-size: 1rem;
      color: var(--ink);
    }
    .upload-card p {
      margin: 0;
      color: var(--muted);
      font-size: 0.92rem;
      line-height: 1.4;
    }
    .picker {
      position: relative;
      display: block;
      margin-top: 12px;
      padding: 14px;
      border-radius: 14px;
      border: 1.5px dashed #b6c5d6;
      background: white;
      text-align: center;
      color: var(--navy);
      font-weight: 700;
    }
    .picker input {
      position: absolute;
      inset: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    .actions {
      display: grid;
      gap: 10px;
      margin-top: 12px;
    }
    button, .secondary {
      border: 0;
      border-radius: 15px;
      padding: 14px 16px;
      font-size: 0.98rem;
      font-weight: 800;
      text-align: center;
      text-decoration: none;
    }
    button {
      background: linear-gradient(135deg, var(--navy), #2f679c);
      color: white;
    }
    .secondary {
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
    .warning {
      margin-top: 10px;
      background: var(--warning-bg);
      color: var(--warning-text);
      border-radius: 14px;
      padding: 10px 12px;
      font-size: 0.84rem;
      line-height: 1.35;
    }
  </style>
</head>
<body>
  <main class="phone-frame">
    <section class="screen">
      <div class="top">
        <h1>TEHI</h1>
        <div class="mini-eye" aria-hidden="true">
          <div class="iris-mini"></div>
          <div class="pupil-mini"></div>
          <div class="glint-mini"></div>
        </div>
        <div class="headline">Your Eyes. Your Health. Detected.</div>
        <p class="subhead">Advanced AI screening for Diabetic Retinopathy and Cardiovascular Risk.</p>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <div class="scan-line s1"></div>
        <div class="scan-line s2"></div>
        <div class="scan-line s3"></div>
        <div class="scan-line s4"></div>
        <div class="cross-h"></div>
        <div class="cross-v"></div>
        <div class="target-ring"></div>
        <div class="target-ring-2"></div>
        <div class="iris-main">
          <div class="pupil-main"></div>
          <div class="glint-main"></div>
        </div>
        <div class="node n1"></div>
        <div class="node n2"></div>
        <div class="node n3"></div>
        <div class="node n4"></div>
        <div class="node n5"></div>
      </div>

      <div class="cards">
        <div class="action-card dr">
          <h2>DR</h2>
          <p>Diabetic Retinopathy</p>
        </div>
        <div class="action-card cvd">
          <h2>CVD</h2>
          <p>Cardiovascular Disease</p>
        </div>
      </div>

      <form method="post" action="/screen" enctype="application/octet-stream">
        <div class="upload-card">
          <h3>Capture or upload a fundus image</h3>
          <p>Use the camera or select an image from your device gallery to run the TEHI prototype screening flow.</p>
          <label class="picker">
            Choose image from camera or gallery
            <input id="image" name="image" type="file" accept="image/*" capture="environment" required />
          </label>
          <div class="actions">
            <button type="submit">Run prototype screening</button>
            <a class="secondary" href="/integration">TensorFlow Lite integration plan</a>
          </div>
          <div class="warning"><strong>Prototype only.</strong> TEHI is a screening workflow demonstration and does not replace clinician diagnosis or treatment planning.</div>
        </div>
      </form>

      <div class="footer">TEHI branding and layout updated toward your latest mobile mockup. I can keep refining the visual fidelity from here.</div>
    </section>
  </main>
</body>
</html>`;
}
