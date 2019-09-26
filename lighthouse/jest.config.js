

module.exports = {
  setupFiles: [
    'react-app-polyfill/jsdom'
  ],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  testMatch: [
    '<rootDir>/performance/**/*.test.js',
  ]
};
