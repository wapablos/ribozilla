const { merge } = require('webpack-merge')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')

const { baseConfig, isDevelopment, rootPath } = require('./webpack.config.base')
const isServer = process.env.DEV_SERVER === 'enable';

const ElectronReloadPlugin = require('webpack-electron-reload')({ path: path.resolve(rootPath, 'dist/main.js') })

module.exports = merge(baseConfig, {
  target: 'electron-main',
  entry: {
    main: 'src/electron/main.ts',
    preload: 'src/electron/preload.ts'
  },
  watch: isServer ? true : false ,
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: isDevelopment ? true : false
    }),
    isServer ?  ElectronReloadPlugin() : (isDevelopment ? () => console.log("Development Build") : () => console.log("Production Build"))
  ]
})
