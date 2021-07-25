const { merge } = require('webpack-merge')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const { baseConfig, isDevelopment, rootPath } = require('./webpack.config.base')
const isServer = process.env.DEV_SERVER === 'enable';
const ElectronReloadPlugin = require('webpack-electron-reload')({ path: path.resolve(rootPath, 'build/main.js') })

module.exports = merge(baseConfig, {
  target: 'electron-main',
  entry: {
    main: 'src/electron/main.prod.ts',
    preload: 'src/electron/preload.ts'
  },
  watch: isServer,
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: true
    }),
    isServer ?  ElectronReloadPlugin() : () => console.log("Production Build")
  ]
})
