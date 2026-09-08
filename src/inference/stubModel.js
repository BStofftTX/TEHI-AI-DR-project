import crypto from 'node:crypto';

const DR_LABELS = [
  '0 - No DR detected',
  '1 - Mild DR',
  '2 - Moderate DR',
  '3 - Severe DR',
  '4 - Proliferative DR',
];

export function runStubInference(imageSummary) {
  const seed = `${imageSummary.fileName}:${imageSummary.size}:${imageSummary.mimeType}`;
  const hash = crypto.createHash('sha256').update(seed).digest('hex');
  const drIndex = parseInt(hash.slice(0, 2), 16) % DR_LABELS.length;
  const cvdLikely = parseInt(hash.slice(2, 4), 16) % 2;
  const drConfidence = 0.55 + (parseInt(hash.slice(4, 6), 16) / 255) * 0.35;
  const cvdConfidence = 0.55 + (parseInt(hash.slice(6, 8), 16) / 255) * 0.35;

  return {
    diabeticRetinopathy: {
      classIndex: drIndex,
      label: DR_LABELS[drIndex],
      confidence: Number(drConfidence.toFixed(3)),
    },
    cardiovascularRisk: {
      classIndex: cvdLikely,
      label: cvdLikely ? '1 - CVD likely' : '0 - CVD unlikely',
      confidence: Number(cvdConfidence.toFixed(3)),
    },
    modelType: 'stub',
    warning: 'Prototype-only inference. Replace with validated model artifacts before any real-world screening use.',
  };
}

export { DR_LABELS };
