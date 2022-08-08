import { terser } from 'rollup-plugin-terser';
// plugin-node-resolve and plugin-commonjs are required for a rollup bundled project
// to resolve dependencies from node_modules. See the documentation for these plugins
// for more details.
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import eslint from '@rollup/plugin-eslint';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
  input: 'src/index.ts',
  output: {
    exports: 'named',
    format: 'esm',
    file: 'dist/index.mjs',
    sourcemap: true,
  },
  plugins: [
    nodePolyfills(),
    typescript(),
    eslint(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion__: 15,
    }),
    terser(),
  ],
};
