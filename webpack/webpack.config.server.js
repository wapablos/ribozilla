const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')

const { baseConfig, rootPath } = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  target: 'web',
  entry: [
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    './src/index.tsx'
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    open: false,
    port: 4000,
    liveReload: false
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ async: false }),
    new HtmlWebpackPlugin({
      filename: path.resolve(rootPath, 'build/index.html'),
      template: path.resolve(rootPath, 'public/index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})
