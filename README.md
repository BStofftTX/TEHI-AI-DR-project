# TEHI MVP

TEHI (The Eyes Have It) is a screening prototype inspired by the USD research documents in this repository. This MVP is designed as a smartphone-first/web-first prototype for:

- 5-class diabetic retinopathy screening from fundus images
- binary cardiovascular risk screening from fundus images

## Important disclaimer

This prototype is **not a medical diagnostic tool** and must not be used to diagnose, treat, or replace clinician judgment. It is a software MVP intended to demonstrate product flow, inference integration points, and testing structure.

## What is included

- a small Node.js web server
- a more realistic mobile-first TEHI landing experience
- camera-or-gallery upload UX for smartphone workflow
- a stub inference pipeline for DR + CVD screening
- clear integration points for future real TensorFlow Lite model weights
- runnable tests
- architecture notes

## Why a stub model

The original repository currently contains project papers and concept documents, but no production model weights, no training artifacts, and no app code. This MVP therefore uses a deterministic stub inference layer so the product workflow can be built and tested now, while preserving a clean path for real model integration later.

## MVP outputs

### Diabetic retinopathy classes
- 0: No DR detected
- 1: Mild DR
- 2: Moderate DR
- 3: Severe DR
- 4: Proliferative DR

### Cardiovascular screening output
- 0: CVD unlikely
- 1: CVD likely

## Run locally

Requirements:
- Node.js 20+

Start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Run tests

```bash
npm test
```

## Project structure

```text
src/
  server.js                # HTTP server
  routes.js                # route handlers
  inference/
    screeningEngine.js     # orchestration for screening outputs
    stubModel.js           # deterministic placeholder inference
    modelRegistry.js       # model artifact planning and registry info
    adapters/
      stubAdapter.js       # current active adapter
      tfliteAdapter.js     # future TensorFlow Lite adapter seam
  utils/
    imageSummary.js        # lightweight image metadata summarizer
  views/
    landingPage.js         # mobile-first landing UI
    resultPage.js          # result UI renderer
    integrationPage.js     # model integration readiness UI
test/
  screeningEngine.test.js
  server.test.js
ARCHITECTURE.md
```

## Next steps for real model integration

1. Add a real labeled fundus dataset pipeline
2. Train or import DR classification weights
3. Train or import CVD risk model weights
4. Replace the active stub adapter with a real TensorFlow Lite adapter implementation
5. Add image preprocessing consistent with model training
6. Add calibration, confidence reporting, and clinician-facing review workflow
7. Add audit logging, security, privacy, and deployment hardening

## Source basis

This MVP is based on the concept and research direction in:
- `Vision final project idea.docx`
- `Stofft DR paper.docx`
- `Stofft-CVD Paper.docx`
