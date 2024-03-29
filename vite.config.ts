import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
    plugins: [
        remix({
            routes: async (defineRoutes) => {
                return defineRoutes((route) => {
                    // Layout
                    route("/", "pages/_layout.tsx", () => {
                        // Index
                        route("/", "pages/index.tsx");
                    });
                });
            },
        }),
        tsconfigPaths(),
    ],
});
