const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '19q3sx',
  chromeWebSecurity: false,
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 30000,
  reporter: "mochawesome",
  env: {
    url: "https://rahulshettyacademy.com",
    shop_url: "https://rahulshettyacademy.com/angularpractice"
  },
  retries: {
    runMode: 1,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: "cypress/integration/examples/*.js"
  },
})
