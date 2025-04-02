const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://confluence:8612',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1024,
    viewportHeight: 768,
    defaultCommandTimeout: 15000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    video: false,
    env: {
      iterations: 5, // Default number of pages to create
      delay_ms: 2000, // Default delay between page creations in milliseconds
      CONFLUENCE_URL: 'YOUR_CONFLUENCE_URL', // Base URL of Confluence instance
      CONFLUENCE_USERNAME: 'YOUR_USER_NAME', // Login username
      CONFLUENCE_PASSWORD: 'YOUR_PASSWORD', // Login password
   },
  }
})