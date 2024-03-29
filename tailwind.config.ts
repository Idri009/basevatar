import type { Config } from "tailwindcss";

export default {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("tailwind-bootstrap-grid")()],
    corePlugins: {
        container: false,
    },
} satisfies Config;
