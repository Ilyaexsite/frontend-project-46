export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testMatch: [
      '**/__tests__/**/*.js',
      '**/?(*.)+(spec|test).js',
    ],
  }