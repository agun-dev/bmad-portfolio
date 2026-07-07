import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwindPlugin from "eslint-plugin-tailwindcss";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // 1. Register the plugin globally
  {
    plugins: { tailwindcss: tailwindPlugin },
  },

  // 2. Apply rules + settings to TS/TSX/JS/JSX files
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    settings: {
      tailwindcss: {
        // Scan classes inside cn(), cva(), and clsx() call arguments
        callees: ["cn", "cva", "clsx"],
      },
    },
    rules: {
      // All tailwindcss rules disabled — eslint-plugin-tailwindcss v4 uses
      // a synckit worker thread to load Tailwind config that deadlocks on Windows.
      // Class sorting is handled by prettier-plugin-tailwindcss instead.
      "tailwindcss/classnames-order": "off",
      "tailwindcss/enforces-shorthand": "off",
      "tailwindcss/enforces-negative-arbitrary-values": "off",
      "tailwindcss/no-contradicting-classname": "off",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/no-unnecessary-arbitrary-value": "off",
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "_bmad/**",
    "_bmad-output/**",
    "public/**",
  ]),
]);

export default eslintConfig;
