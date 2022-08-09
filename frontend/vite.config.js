import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath, URL } from 'url';
import postcss from './postcss.config.js';

/** @type {import('vite').UserConfig} */
const config = {
	css: {
		postcss
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
