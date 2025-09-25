module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    project: ['./tsconfig.json']
  },
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {}
    }
  ],
  rules: {
    // project-level overrides
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off'
    ,
    // Basic stylistic rules so ESLint can act as a simple formatter
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'semi': ['error', 'always'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'max-len': ['warn', { 'code': 100 }]
  }
};
