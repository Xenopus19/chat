const js = require("@eslint/js");
const globals = require("globals");
const babelParser = require("@babel/eslint-parser");

module.exports = [
  {
    ignores: ["client/**", "dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: ["@babel/plugin-syntax-typescript"],
        },
      },
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "preserve-caught-error": "off",
      "no-console": "warn",
    },
  },
];