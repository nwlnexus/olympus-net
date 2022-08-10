import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tailwindConfig from './tailwind.config.mjs';
import postcssNesting from 'postcss-nesting';
import tailwindNesting from '@tailwindcss/nesting';

export default {
	plugins: [tailwindNesting(postcssNesting), tailwind(tailwindConfig), autoprefixer]
};
