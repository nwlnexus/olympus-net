/** @type {import("eslint/conf/eslint-all")} */
let config = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/jest',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
    'prettier'
  ],
  ignorePatterns: ['node_modules', 'build'],
  settings: {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx']
  },
  parserOptions: {
    sourceType: 'module'
  },
  plugins: ['testing-library', 'jest-dom']
};

module.exports = config;
