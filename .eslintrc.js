module.exports = {
  root: true,
  extends: ['react-app'],
  plugins: ['react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    'linebreak-style': ['warn', require('os').EOL === '\r\n' ? 'windows' : 'unix'],
  },
};
