import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';

process.env.NODE_ENV = 'test';
const { server } = await import('../src/server.js');

test('GET / returns TEHI landing page', async (t) => {
  await new Promise((resolve) => server.listen(0, resolve));
  t.after(() => server.close());
  const port = server.address().port;

  const body = await request({ method: 'GET', port, path: '/' });
  assert.match(body, /TEHI MVP/);
  assert.match(body, /Prototype only/i);
});

test('POST /screen returns results page', async (t) => {
  await new Promise((resolve) => server.listen(0, resolve));
  t.after(() => server.close());
  const port = server.address().port;

  const body = await request({
    method: 'POST',
    port,
    path: '/screen',
    headers: { 'content-type': 'image/jpeg' },
  }, Buffer.from('fake-image-data'));

  assert.match(body, /TEHI Results/);
  assert.match(body, /<h2>DR<\/h2>/);
  assert.match(body, /<h2>CVD<\/h2>/);
  assert.match(body, /stub/);
});

test('GET /integration returns TensorFlow Lite readiness page', async (t) => {
  await new Promise((resolve) => server.listen(0, resolve));
  t.after(() => server.close());
  const port = server.address().port;

  const body = await request({ method: 'GET', port, path: '/integration' });
  assert.match(body, /TensorFlow Lite Integration Plan/);
  assert.match(body, /tflite/i);
});

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', ...options }, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}
