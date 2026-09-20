// Copies the Vite production build (dist/) over the repo root so GitHub
// Pages can serve this gh-pages branch directly, without a CI build step.
// Run via `npm run deploy` (builds first, then this script).
import { cpSync, existsSync, readdirSync, renameSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');

if (!existsSync(distDir)) {
    console.error('dist/ not found — run `npm run build` first.');
    process.exit(1);
}

// The Vite entry is app.html (see vite.config.js) so the build's own
// index.html isn't clobbered mid-build; rename it back to index.html,
// the filename GitHub Pages actually serves.
const builtEntry = path.join(distDir, 'app.html');
if (existsSync(builtEntry)) {
    renameSync(builtEntry, path.join(distDir, 'index.html'));
}

// Remove the previously published assets folder so renamed/removed
// hashed bundles don't linger at the root.
const publishedAssetsDir = path.join(rootDir, 'assets');
if (existsSync(publishedAssetsDir)) {
    rmSync(publishedAssetsDir, { recursive: true, force: true });
}

for (const entry of readdirSync(distDir)) {
    cpSync(path.join(distDir, entry), path.join(rootDir, entry), { recursive: true });
}

console.log('Published dist/ to the repository root for GitHub Pages.');
