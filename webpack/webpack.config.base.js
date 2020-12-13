const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')

const rootPath = path.resolve(__dirname, '..')
const isDevelopment = process.env.NODE_ENV !== 'production';

const baseConfig = {
  mode: isDevelopment ? 'development' : 'production',
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      use: ['react-hot-loader/webpack', {
        loader: 'ts-loader',
        options: { transpileOnly: true }
      }]
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json'})]
  }
}

module.exports = { baseConfig, rootPath, isDevelopment }
