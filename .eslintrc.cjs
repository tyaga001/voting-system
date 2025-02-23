/** @type {import("eslint").Linter.Config} */
const config = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    // "project": true,
    "project": "./tsconfig.json",
  },
  // "ignorePatterns": ["*.css", "*.scss"],
  "plugins": [
    "@typescript-eslint"
  ],
  "globals": {
    "React": "readonly"
  },
  "settings": {
    "react": {
      "version": "detect",
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./tsconfig.json",
        "moduleDirectory": ["node_modules", "src"]
      },
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "no-duplicate-imports": "off",
    "import/no-duplicates": "off",
    "no-undef": "error",
    "no-unused-vars": "off",
    "import/no-unresolved": [
      "error",
      { "ignore": ["^geist/"] }  // Add specific packages to ignore
    ],
    "react/prop-types": "off",
    "@next/next/no-img-element": "off",
    "import/named": "error",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "prefer-const": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/no-named-as-default-member": "error",
    "react/no-unknown-property": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-object-type": "off",
  },
  "env": {
    "browser": true,
    "node": true
  }
}
module.exports = config;