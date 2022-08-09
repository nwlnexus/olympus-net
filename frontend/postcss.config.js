import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tailwindConfig from './tailwind.config.mjs';
import postcssImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
import tailwindNesting from '@tailwindcss/nesting';

export default {
	plugins: [
		process.env.NODE_ENV === 'production' ? null : postcssImport,
		tailwindNesting(postcssNesting),
		tailwind(tailwindConfig),
		autoprefixer
	]
};
