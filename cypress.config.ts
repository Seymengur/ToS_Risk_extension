import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:4178",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: false,
    video: true,
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});
