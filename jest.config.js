export default {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js'
  ],
  transform: {},
  extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
}
