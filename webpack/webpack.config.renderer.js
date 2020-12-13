const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')

const { baseConfig, isDevelopment, rootPath } = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  target: 'web',
  entry: {
    bundle: './src/index.tsx'
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ async: false }),
    new HtmlWebpackPlugin({
      template: path.resolve(rootPath, 'public/index.html')
    })
  ]
})
