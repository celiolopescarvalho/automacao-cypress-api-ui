const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    // Aceita qualquer arquivo `.cy.js` em qualquer subpasta dentro de `cypress/e2e`
    specPattern: "cypress/e2e/**/*.cy.js",
    baseUrl: "https://front.serverest.dev/",
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      // ⬇️ ESSENCIAL: registra as tasks para o Allure funcionar
      allureWriter(on, config);
      return config;
    }
  }
});
