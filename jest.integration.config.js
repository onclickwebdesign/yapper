console.log('RUNNING INTEGRATION TESTS');
module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testRegex: 'test/.*\.integration\.js$'
};