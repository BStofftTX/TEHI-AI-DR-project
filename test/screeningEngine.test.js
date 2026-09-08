import test from 'node:test';
import assert from 'node:assert/strict';
import { runScreening } from '../src/inference/screeningEngine.js';

test('runScreening returns DR and CVD outputs with disclaimer', () => {
  const result = runScreening({
    fileName: 'fundus.jpg',
    size: 12345,
    mimeType: 'image/jpeg',
    receivedBytes: 12345,
    hasBody: true,
  });

  assert.equal(result.appName, 'TEHI (The Eyes Have It)');
  assert.match(result.disclaimer, /not a medical diagnostic device/i);
  assert.ok(result.outputs.diabeticRetinopathy.label);
  assert.ok(result.outputs.cardiovascularRisk.label);
  assert.equal(result.outputs.modelType, 'stub');
});
