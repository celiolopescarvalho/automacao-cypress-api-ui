const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  env: {
    apiUrl: 'https://serverest.dev',
    frontUrl: 'https://front.serverest.dev',
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    baseUrl: "https://serverest.dev", 

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    }
  }
});
