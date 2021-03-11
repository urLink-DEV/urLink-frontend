module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        singleQuote: true,
        semi: false,
        useTabs: false,
        tabWidth: 2,
        trailingComma: 'es5',
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
};
