export default {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapping: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  extensionsToTreatAsEsm: ['.js'],
}