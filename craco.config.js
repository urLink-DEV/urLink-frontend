const path = require('path')

const { whenDev, whenProd } = require('@craco/craco')
const CracoAlias = require('craco-alias')
const CracoEsbuildPlugin = require('craco-esbuild')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  webpack: {
    configure: (webpackConfig, { paths }) => {
      // multiple entry point config
      const entries = {
        index: [path.resolve(__dirname, 'src/main/index.js')],
        popup: [path.resolve(__dirname, 'src/popup/index.js')],
        background: [path.resolve(__dirname, 'src/background/index.js')],
      }
      webpackConfig.entry = entries

      // appIndexJs entry config
      paths.appIndexJs = entries.index[0]

      // multiple html config
      const htmlWebpackPluginSetting = webpackConfig.plugins.find(
        ({ constructor }) => constructor.name === 'HtmlWebpackPlugin'
      )
      const htmlPlugin = Object.keys(entries).map((item) => {
        return new HtmlWebpackPlugin({
          ...htmlWebpackPluginSetting,
          template: `${paths.appPublic}/${item}.html`,
          filename: item + '.html',
          chunks: [item],
        })
      })

      // manifest entry point setting
      // 단일 진입 점을 지원 하도록 구성 되어 있어 entries key 기준으로 다시 구성
      const multipleEntriesManifestPlugin = new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,

        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path
            return manifest
          }, seed)

          // Keep the existing entry point
          const indexEntrypointFiles = entrypoints.index.filter((fileName) => !fileName.endsWith('.map'))
          let { index, ...pagesAllEntryPointFiles } = entrypoints

          // Create our pages entry points
          const pagesEntryPointFiles = Object.keys(pagesAllEntryPointFiles).reduce((filtered, entryKey) => {
            filtered[entryKey] = pagesAllEntryPointFiles[entryKey].filter((fileName) => !fileName.endsWith('.map'))
            return filtered
          }, {})

          return {
            files: manifestFiles,
            entrypoints: indexEntrypointFiles,
            pages: pagesEntryPointFiles,
          }
        },
      })

      // Substitute htmlWebpackPlugin
      const htmlIdx = webpackConfig.plugins.findIndex(({ constructor }) => constructor.name === 'HtmlWebpackPlugin')
      webpackConfig.plugins.splice(htmlIdx, 1, ...htmlPlugin)

      // Substitute ManifestPlugin
      const manifestIdx = webpackConfig.plugins.findIndex(({ constructor }) => constructor.name === 'ManifestPlugin')
      webpackConfig.plugins.splice(manifestIdx, 1, multipleEntriesManifestPlugin)

      // Substitute InlineChunkHtmlPlugin
      const inlineChunkHtmlIdx = webpackConfig.plugins.findIndex(
        ({ constructor }) => constructor.name === 'InlineChunkHtmlPlugin'
      )
      webpackConfig.plugins.splice(inlineChunkHtmlIdx, 1)

      webpackConfig.resolve = {
        extensions: ['.js', '.jsx', '.json'],
        modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
      }

      whenDev(() => {
        webpackConfig.optimization.runtimeChunk = 'single'
        webpackConfig.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: false }))
        webpackConfig.devtool = 'eval-cheap-module-source-map'
      })

      whenProd(() => {
        webpackConfig.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }))
        webpackConfig.plugins.push(new ProgressBarPlugin())
        webpackConfig.devtool = false
      })

      return webpackConfig
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
    {
      plugin: CracoEsbuildPlugin,
      options: {
        esbuildLoaderOptions: {
          loader: 'jsx',
          target: 'es2015',
        },
        esbuildMinimizerOptions: {
          target: 'es2015',
          css: true,
        },
      },
    },
  ],
}
