import forms from '@tailwindcss/forms';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	content: ['./src/**/*.{html,js,jsx,svelte,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {}
	},
	variants: {
		scrollbars: ['dark']
	},
	plugins: [forms, daisyui]
};
