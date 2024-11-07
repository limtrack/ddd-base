import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      "@typescript-eslint/no-unsafe-vars": ["error", { "argsIgnorePattern": "^_" }],
    },
    overrides: [
      {
        files: ["tests/**/*.ts"],
        rules: {
          "@typescript-eslint/no-explicit-any": "off"
        },
      }
    ]
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];