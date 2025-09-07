export default {
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.js'],
    moduleNameMapping: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {},
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
  }
  