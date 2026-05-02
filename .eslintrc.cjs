/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  ignorePatterns: [
    "dist/**",
    "node_modules/**",
    "coverage/**",
    "documentation/.vitepress/cache/**",
    "documentation/.vitepress/dist/**",
  ],
  overrides: [
    {
      files: ["tests/**/*.ts"],
      env: { browser: true },
      globals: {
        vi: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
      rules: {
        "vue/one-component-per-file": "off",
      },
    },
  ],
  rules: {
    "max-lines": [
      "error",
      {
        max: 250,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrors: "all",
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": [
      "error",
      { allowSingleExtends: true },
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          Function: false,
        },
      },
    ],
    "vue/multi-word-component-names": "off",
    "vue/require-default-prop": "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
  },
};
