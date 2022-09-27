const path = require('path');

const fromRoot = d => path.join(__dirname, d);
module.exports = {
  roots: [fromRoot('src')],
  resetMocks: true,
  coveragePathIgnorePatterns: [],
  collectCoverageFrom: ['**/src/**/*.{js,ts,tsx}'],
  coverageThreshold: null,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
    '^.+\\.jsx?$': 'esbuild-jest'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleDirectories: ['node_modules', fromRoot('tests')],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '~/(.*)': fromRoot('src/$1')
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname']
};
