import { terser } from 'rollup-plugin-terser';
// plugin-node-resolve and plugin-commonjs are required for a rollup bundled project
// to resolve dependencies from node_modules. See the documentation for these plugins
// for more details.
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import eslint from '@rollup/plugin-eslint';
import alias from '@rollup/plugin-alias';

export default {
  input: 'src/index.ts',
  output: {
    exports: 'named',
    format: 'esm',
    file: 'dist/index.mjs',
    sourcemap: true
  },
  plugins: [
    alias({
      entries: [{ find: 'fs', replacement: './src/stubs/null.js' }]
    }),
    typescript(),
    commonjs(),
    nodeResolve({
      browser: true
    }),
    eslint(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion__: 15
    }),
    terser()
  ]
};
