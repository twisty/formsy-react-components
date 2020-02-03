/* eslint-env node */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {TsConfigPathsPlugin} = require('awesome-typescript-loader');

module.exports = {
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    contentBase: __dirname,
    port: 3000,
  },

  entry: {
    playground: path.resolve(__dirname, './playground/src/index.tsx'),
    refs: path.resolve(__dirname, './refs/src/index.tsx'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsConfigPathsPlugin()],
  },
};
