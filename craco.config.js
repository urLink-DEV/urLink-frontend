const { whenDev } = require('@craco/craco');
const ManifestPlugin = require('webpack-manifest-plugin');
const CracoAlias = require('craco-alias');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

  webpack: {
    configure: (webpackConfig, { paths }) => {
      // multiple entry point config
      const entries = {
        index: [`${paths.appSrc}/index.js`],
        popup: [`${paths.appSrc}/popup/index.js`],
        background: [`${paths.appSrc}/background/index.js`],
      };

      webpackConfig.entry = entries;

      // multiple html config
      const htmlWebpackPluginSetting = webpackConfig.plugins.find(
        ({ constructor }) => constructor.name === 'HtmlWebpackPlugin'
      );

      const htmlPlugin = Object.keys(entries).map((item) => {
        return new HtmlWebpackPlugin({
          ...htmlWebpackPluginSetting,
          template: `${paths.appPublic}/${item}.html`,
          filename: item + '.html',
          chunks: [item],
        });
      });

      // manifest entry point setting
      // 단일 진입 점을 지원 하도록 구성 되어 있어 수정해야 함
      const multipleEntriesManifestPlugin = new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,

        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);

          // Keep the existing entry point
          const indexEntrypointFiles = entrypoints.index.filter(
            (fileName) => !fileName.endsWith('.map')
          );
          let { index, ...pagesAllEntryPointFiles } = entrypoints;

          // Create our pages entry points
          const pagesEntryPointFiles = Object.keys(pagesAllEntryPointFiles).reduce(
            (filtered, entryKey) => {
              filtered[entryKey] = pagesAllEntryPointFiles[entryKey].filter(
                (fileName) => !fileName.endsWith('.map')
              );
              return filtered;
            },
            {}
          );

          return {
            files: manifestFiles,
            entrypoints: indexEntrypointFiles,
            pages: pagesEntryPointFiles,
          };
        },
      });

      // Substitute htmlWebpackPlugin
      const htmlWebpackIdx = webpackConfig.plugins.findIndex(
        ({ constructor }) => constructor.name === 'HtmlWebpackPlugin'
      );
      webpackConfig.plugins.splice(htmlWebpackIdx, 1, ...htmlPlugin);

      // Substitute ManifestPlugin
      const ManifestIdx = webpackConfig.plugins.findIndex(
        ({ constructor }) => constructor.name === 'ManifestPlugin'
      );
      webpackConfig.plugins.splice(ManifestIdx, 1, multipleEntriesManifestPlugin);

      // Substitute InlineChunkHtmlPlugin
      const InlineChunkHtmlIdx = webpackConfig.plugins.findIndex(
        ({ constructor }) => constructor.name === 'InlineChunkHtmlPlugin'
      );
      webpackConfig.plugins.splice(InlineChunkHtmlIdx, 1);

      whenDev(() => {
        webpackConfig.output.publicPath = process.env.PUBLIC_PATH;
        webpackConfig.optimization.runtimeChunk = 'single';

        // HMRwebpackHotDevClient을 지원
        const webpackHotDevClientPath = require.resolve('react-dev-utils/webpackHotDevClient');
        Object.keys(entries).forEach((entryKey) => {
          if (!entries[entryKey].includes(webpackHotDevClientPath)) {
            entries[entryKey].unshift(webpackHotDevClientPath);
          }
        });
      });

      return webpackConfig;
    },
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
