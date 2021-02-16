const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, '/build'),
    port: 9000,
  },
  entry: './src/index.js',
  output: {
    filename: 'static/js/[name].[chunkhash].js',
    path: path.resolve('../public/', 'popup'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', 'css'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@chromeApis': path.resolve(__dirname, 'src/chromeApis'),
      '@http': path.resolve(__dirname, 'src/http'),
      '@modules': path.resolve(__dirname, 'src/modules'),
    },
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      hash: true,
      template: './src/index.html',
      filename: 'popup.html',
    }),
  ],
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false,
};
