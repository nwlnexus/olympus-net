/** @type {import('tailwindcss').Config} */
module.exports = {
  // the NODE_ENV thing is for https://github.com/Acidic9/prettier-plugin-tailwind/issues/29
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  content: [
    './app/**/*.+(js|jsx|ts|tsx|mdx|md)',
    './node_modules/daisyui/dist/**/*.js',
    './node_modules/react-daisyui/dist/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    fontFamily: {
      body: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      sans: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    darkTheme: 'dark',
    themes: ['dark', 'night', 'cmyk', 'cupcake', 'dracula']
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('daisyui')]
};
