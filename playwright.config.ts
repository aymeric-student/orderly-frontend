import { defineConfig } from "@playwright/test";

const defaultUrl = "http://localhost:4200";

export default defineConfig({
    testDir: "./tests",
    use: {
        baseURL: defaultUrl,
        browserName: "chromium",
        headless: true,
    },
});
