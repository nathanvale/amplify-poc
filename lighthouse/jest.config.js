

module.exports = {
  setupFilesAfterEnv: ["jest-expect-message"],
  setupFiles: [
    'react-app-polyfill/jsdom'
  ],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  testMatch: [
    '<rootDir>/performance/**/*.test.js',
  ]
};
