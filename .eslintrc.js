module.exports = {
  root: true,
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['react-hooks'],
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
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'prettier/prettier': [
      'warn',
      {
        printWidth: 100,
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: 'es5',
        bracketSpacing: true,
        endOfLine: 'auto',
        // arrowParens: 'avoid',
      },
    ],
  },
};
