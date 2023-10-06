import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1920,
    viewportHeight: 1080,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
