 
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  moduleNameMapper: {
    "^nedb-promises$": "/__mocks__/nedb-promises.js"
  }
};