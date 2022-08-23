const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'vj4dyf',
  viewportWidth : 1920,
  viewportHeight : 1080,  
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern	: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern : ['**/1-getting-started/*','**/2-advanced-examples/*']

  }
})