import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

export default [
  {
    ignores: [
      "eslint.config.js",
      "prettier.config.js",
      "vite.config.ts",
      "node_modules",
      "dist",
    ],
  },

  js.configs.recommended,


  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
];