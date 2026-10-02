import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Skill tooling that lives alongside the app, not part of it.
    ".claude/**",
    // Vendored scroll-craft engine, copied unedited per the skill's own rule.
    "lib/scrollcraft/scrollcraft.js",
  ]),
]);

export default eslintConfig;
