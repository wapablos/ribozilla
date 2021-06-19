const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')

const rootPath = path.resolve(__dirname, '..')
const isDevelopment = process.env.NODE_ENV !== 'production';

const baseConfig = {
  mode: isDevelopment ? 'development' : 'production',
  output: {
    path: path.resolve(rootPath, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: ['react-hot-loader/webpack', {
          loader: 'ts-loader',
          options: { transpileOnly: true }
        }]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(woff2|woff|eot|ttf|otf)$/,
        use: ["file-loader"],
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json'})]
  }
}

module.exports = { baseConfig, rootPath, isDevelopment }
