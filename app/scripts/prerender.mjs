// Writes one fully rendered HTML file per dimension (dist/index.html, dist/nether/index.html, dist/end/index.html)
// so search engines and link previews get real content without running JavaScript.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render, routes } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

for (const url of routes) {
  const { html, head } = render(url);
  const page = template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, `<!--seo-->\n  ${head}\n  <!--/seo-->`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const out = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
  // also <route>.html, so hosts that map /nether to nether.html (no trailing slash) serve the right page
  if (url !== '/') fs.writeFileSync(path.join(dist, `${url.slice(1)}.html`), page);
  console.log(`prerendered ${url} -> ${path.relative(root, out)} (${(page.length / 1024).toFixed(1)} kB)`);
}
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
