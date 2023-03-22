const fs = require('fs')
const path = require('path')

const prettierConfig = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), '.prettierrc')).toString(),
)

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'prettier/prettier': ['error', prettierConfig],
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
}
