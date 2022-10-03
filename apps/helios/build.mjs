import { build } from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire as topLevelCreateRequire } from 'module';
import commonjsPlugin from '@chialab/esbuild-plugin-commonjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

build({
  bundle: true,
  format: 'esm',
  conditions: ['worker', 'browser'],
  target: 'esnext',
  entryPoints: [path.join(__dirname, 'src', 'index.ts')],
  outfile: path.join(__dirname, 'dist', 'index.mjs'),
  sourcemap: false,
  charset: 'utf8',
  minify: process.env.NODE_ENV === 'production',
  plugins: [commonjsPlugin()]
}).catch(err => {
  console.error(err.stack);
  process.exitCode = 1;
});
