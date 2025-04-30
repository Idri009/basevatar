import { baseConfig } from "./base-config.js";
import { defineProject, mergeConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export const uiConfig = mergeConfig(
    baseConfig,
    defineProject({
        plugins: [tsconfigPaths(), react()],
        test: {
            environment: "jsdom",
        },
    })
);
