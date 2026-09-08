import { runModel } from './adapters/stubAdapter.js';

export function runScreening(imageSummary) {
  const inference = runModel(imageSummary);

  return {
    appName: 'TEHI (The Eyes Have It)',
    disclaimer:
      'This prototype is not a medical diagnostic device. It is a screening workflow demonstration only and must be reviewed by qualified clinicians.',
    imageSummary,
    outputs: inference,
    recommendedNextStep:
      'Use this result only as a prototype screening output. Seek clinician review and validated model integration before any field deployment.',
  };
}
