export function getModelIntegrationInfo() {
  return {
    adapter: 'stub-adapter',
    status: 'No validated production model artifacts are present yet. The MVP is wired for later TensorFlow Lite integration.',
    expectedArtifacts: [
      'models/dr_classifier.tflite',
      'models/cvd_classifier.tflite',
      'models/labels.json',
      'models/preprocessing.json',
    ],
    exampleLayout: `models/
  dr_classifier.tflite
  cvd_classifier.tflite
  labels.json
  preprocessing.json
src/
  inference/
    adapters/
      stubAdapter.js
      tfliteAdapter.js
    modelRegistry.js`,
  };
}
