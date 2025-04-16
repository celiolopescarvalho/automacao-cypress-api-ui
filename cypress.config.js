const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Aceita qualquer arquivo `.cy.js` em qualquer subpasta dentro de `cypress/e2e`
    specPattern: "cypress/e2e/**/*.cy.js",
    baseUrl: "https://front.serverest.dev/", // ou a URL que você usa
    supportFile: "cypress/support/e2e.js",
  },
});
