/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/jest',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
    'prettier'
  ]
};
