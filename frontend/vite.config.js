import inject from '@rollup/plugin-inject';
import path from 'path';
import postcss from './postcss.config.js';
import { sveltekit } from '@sveltejs/kit/vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { fileURLToPath, URL } from 'url';

/** @type {import('vite').UserConfig} */
const config = {
	build: {
		rollupOptions: {
			plugins: [
				inject({
					util: 'util',
					window: path.resolve('src/helpers/window.js'),
					Buffer: ['buffer', 'Buffer']
				})
			]
		}
	},
	css: {
		postcss
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis'
			},
			plugins: [
				NodeGlobalsPolyfillPlugin({
					process: true,
					buffer: true
				})
			]
		},
		include: ['fuzzy']
	},
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$components: fileURLToPath(new URL('./src/lib/components', import.meta.url)),
			$types: fileURLToPath(new URL('../typings', import.meta.url)),
			$utils: fileURLToPath(new URL('./src/lib/utils', import.meta.url)),
			$ui: fileURLToPath(new URL('./src/lib/ui', import.meta.url))
		}
	}
};

export default config;
