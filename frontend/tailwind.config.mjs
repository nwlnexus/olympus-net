import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
const config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,jsx,svelte,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {}
	},
	variants: {
		scrollbars: ['dark']
	},
	daisyui: {
		themes: ['light', 'dark', 'night']
	},
	plugins: [forms, typography, daisyui]
};

export default config;
