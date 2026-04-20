import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, 'src');
const PORT = 5173;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.glb': 'model/gltf-binary',
  '.hdr': 'application/octet-stream',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let rel = decodeURIComponent(url.pathname);
    if (rel === '/') rel = '/index.html';
    if (rel.endsWith('/')) rel += 'index.html';

    const abs = path.normalize(path.join(ROOT, rel));
    if (!abs.startsWith(ROOT)) { res.writeHead(403).end('forbidden'); return; }

    let data;
    try {
      data = await fs.readFile(abs);
    } catch {
      // try index.html in a directory-like path
      const fallback = path.join(abs, 'index.html');
      try { data = await fs.readFile(fallback); rel += '/index.html'; }
      catch {
        // serve the bilingual 404 page if it exists
        try {
          data = await fs.readFile(path.join(ROOT, '404.html'));
          res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
          res.end(data);
          return;
        } catch {
          res.writeHead(404).end('not found');
          return;
        }
      }
    }

    const ext = path.extname(rel).toLowerCase();
    res.writeHead(200, { 'content-type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  } catch (err) {
    res.writeHead(500).end(String(err));
  }
}).listen(PORT, () => console.log(`emerald.co → http://localhost:${PORT}`));
