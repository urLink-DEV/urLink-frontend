const CracoAlias = require('craco-alias');

module.exports = {
  babel: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            chrome: '55',
          },
        },
      ],
    ],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        baseUrl: './src',
      },
    },
  ],
};
