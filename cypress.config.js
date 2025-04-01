const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CONFLUENCE_URL || 'http://confluence:8612',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 15000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    video: false,
    env: {
      iterations: process.env.ITERATIONS || 5,
      delay_ms: process.env.DELAY_MS || 2000,
      CONFLUENCE_URL: 'http://confluence:8612',
      CONFLUENCE_USERNAME: 'admin',
      CONFLUENCE_PASSWORD: 'admin'
    }
  }
})