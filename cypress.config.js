const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'fhqgoe',
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3001'
  },
});
