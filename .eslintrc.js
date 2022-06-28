const path = require('path')

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:react/recommended', 'eslint-config-prettier', 'plugin:prettier/recommended'],
  plugins: ['react', 'react-hooks', 'import', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    chrome: 'readonly',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@/*', path.resolve(__dirname, './src')],
          ['@background/*', path.resolve(__dirname, './src/background')],
          ['@main/*', path.resolve(__dirname, './src/main')],
          ['@popup/*', path.resolve(__dirname, './src/popup')],
          ['@assets/*', path.resolve(__dirname, './src/assets')],
          ['@hooks/*', path.resolve(__dirname, './src/hooks')],
          ['@modules/*', path.resolve(__dirname, './src/modules')],
          ['@utils/*', path.resolve(__dirname, './src/utils')],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'react/prop-types': [0],
    'no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
