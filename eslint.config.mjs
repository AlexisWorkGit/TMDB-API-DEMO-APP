import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";
//import jsxA11Y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslitConfig = [
  ...compat.config({
    env: {
      browser: true,
      es2022: true,
      node: true,
    },
  }),
  { files: ["**/*.{ts,tsx,js,jsx,md,mdx,css,yaml,yml}"] },
  {
    ignores: [
      ".next/*",
      ".cache/*",
      "**/*.css",
      "**/dist",
      "esm/*",
      "public/*",
      "tests/*",
      "scripts/*",
      "**/*.config.js",
      "**/node_modules",
      "**/coverage",
      "**/.next",
      "**/.cache",
      "**/build",
      "README.md",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "next/core-web-vitals",
      "next/typescript",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "plugin:react-hooks/recommended",
      // "plugin:jsx-a11y/recommended",
      "eslint:recommended",
      "plugin:prettier/recommended"
    )
  ),
  {
    plugins: {
      "@stylistic": stylistic,
      react: fixupPluginRules(react),
      "unused-imports": unusedImports,
      import: fixupPluginRules(_import),
      // "@typescript-eslint": typescriptEslint,
      // "jsx-a11y": fixupPluginRules(jsxA11Y),
      prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
      globals: {
        ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
        ...globals.node,
        ...globals.browser,
        React: true,
        RequestInit: true,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      tailwindcss: {
        callees: ["cn"],
        config: "tailwind.config.js",
      },
    },

    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "no-console": "warn",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-key": "off",
      "react/react-in-jsx-scope": "off",
      "react/react-in-ts-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      // "jsx-a11y/click-events-have-key-events": "warn",
      // "jsx-a11y/interactive-supports-focus": "warn",
      // "jsx-a11y/heading-has-content": "warn",
      // "react/jsx-first-prop-new-line": ["warn", "never"],
      // "jsx-a11y/anchor-is-valid": "warn",
      "tailwindcss/no-custom-classname": "off",
      "prettier/prettier": "warn",
      "no-unused-vars": "off",
      "unused-imports/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "object-curly-spacing": ["error", "always"],
      semi: ["error", "always"],
      // "no-unexpected-multiline": "error",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_.*?$",
        },
      ],

      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-empty-object-type": [
        "warn",
        {
          allowInterfaces: "always",
          allowObjectTypes: "always",
        },
      ],

      /* This is giving me a headache
      "import/order": [
        "warn",
        {
          pathGroups: [
            {
              pattern: "@clerk/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@vercel/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "next/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["internal", "external", "builtins"],
          groups: [
            "builtin",
            "external",
            "internal",
            ["sibling", "parent"],
            "unknown",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
        },
      ],*/

      //"react/jsx-newline": ["warn", { prevent: false, allowMultilines: true }],
      "react/self-closing-comp": "warn",
      "react/jsx-props-no-multi-spaces": "warn",
      "react/jsx-props-no-spread-multi": "warn",
      "react/jsx-no-useless-fragment": "warn",
      "react/no-unknown-property": [
        "error",
        {
          ignore: ["vaul-drawer-wrapper"],
        },
      ],

      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: true,
          reservedFirst: false,
          ignoreCase: false,
        },
      ],

      "react/jsx-tag-spacing": [
        "warn",
        {
          closingSlash: "never",
          beforeSelfClosing: "always",
          afterOpening: "never",
          beforeClosing: "never",
        },
      ],

      "react/sort-comp": [
        "warn",
        {
          order: ["static-variables", "static-methods", "lifecycle", "everything-else", "render"],
          groups: {
            lifecycle: [
              "displayName",
              "propTypes",
              "contextTypes",
              "childContextTypes",
              "defaultProps",
              "state",
              "constructor",
              "getDerivedStateFromProps",
              "componentDidMount",
              "shouldComponentUpdate",
              "getSnapshotBeforeUpdate",
              "componentDidUpdate",
              "componentWillUnmount",
            ],
          },
        },
      ],

      /*"padding-line-between-statements": [
        "warn",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
        {
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: "*",
        },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],*/

      /*
       * Stylistic rules
       * see: https://eslint.style/rules/js
       */

      "@stylistic/array-element-newline": [
        "error",
        {
          ArrayExpression: "consistent",
          ArrayPattern: { minItems: 3 },
        },
      ],

      "@stylistic/array-bracket-newline": ["error", "consistent"],
      //"@stylistic/multiline-comment-style": ["error", "starred-block"],
      "@stylistic/max-statements-per-line": ["error", { max: 1 }],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/eol-last": ["error", "always"],
    },
  },
];

export default eslitConfig;
