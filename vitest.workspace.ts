import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
    "./apps/slack/vitest.config.ts",
    "./apps/web/vitest.config.ts",
    "./apps/cronjob/vitest.config.ts",
    "./packages/database/vitest.config.ts",
]);
