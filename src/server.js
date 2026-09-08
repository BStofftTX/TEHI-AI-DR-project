import http from 'node:http';
import { handleRequest } from './routes.js';

const port = Number(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
  handleRequest(req, res).catch((error) => {
    console.error(error);
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('TEHI MVP server error');
  });
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => {
    console.log(`TEHI MVP listening on http://localhost:${port}`);
  });
}

export { server };
